import { OGMetadata } from "@/app/(og-playground)/store/og-metadata";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT!,
  pinataGateway: process.env.PINATA_GATEWAY!,
});

export async function POST(request: Request) {
  const supabase = createClient();
  const auth_user = await supabase.auth.getUser();

  if (!auth_user.data.user) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 403 },
    );
  }

  try {
    const auth_user_id = auth_user.data.user.id;
    const formData = await request.formData();

    // Parse JSON metadata
    const metadataJson = formData.get("metadata") as string;
    if (!metadataJson) {
      throw new Error("Metadata is missing");
    }
    let metadata: OGMetadata;
    try {
      metadata = JSON.parse(metadataJson);
    } catch (error) {
      throw new Error("Invalid metadata JSON");
    }

    // Get the image file
    const imageFile = formData.get("image") as File | null;

    // Remove the id from the metadata
    const { id, ...metadataWithoutId } = metadata;

    let cid = metadata.cid; // Use existing cid if no new image is uploaded
    if (imageFile) {
      try {
        const fileBuffer = await imageFile.arrayBuffer();
        const file = new File([fileBuffer], imageFile.name, {
          type: imageFile.type,
        });

        const upload = await pinata.upload.file(file);
        if (!upload || !upload.cid) {
          throw new Error("Failed to upload file to Pinata");
        }
        cid = upload.cid; // Update cid with the new value from Pinata
      } catch (error) {
        console.error("Error uploading file to Pinata:", error);
        return NextResponse.json(
          { success: false, error: `Failed to upload to Pinata!, ${error}` },
          { status: 500 },
        );
      }
    }

    if (!cid) {
      return NextResponse.json(
        { success: false, error: "CID is missing" },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from("og_content")
      .upsert(
        {
          ...metadataWithoutId,
          user_id: auth_user_id,
          cid: cid,
        },
        {
          onConflict: "cid",
          ignoreDuplicates: true,
        },
      )
      .select();

    if (error) {
      throw error;
    }

    if (!data) {
      throw new Error("No data returned from Supabase");
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error saving metadata:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save metadata and image" },
      { status: 500 },
    );
  }
}
