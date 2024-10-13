import { NextRequest, NextResponse } from "next/server";
import { PinataSDK, GetCIDResponse, OptimizeImageOptions } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT!,
  pinataGateway: process.env.PINATA_GATEWAY || "example-gateway.mypinata.cloud",
});

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const cid = searchParams.get("cid");

  if (!cid) {
    return new NextResponse("Missing CID parameter", { status: 400 });
  }

  try {
    const optimizeOptions: OptimizeImageOptions = {
      width: 1200,
      height: 630,
      format: "webp",
      fit: "cover",
      quality: 90,
    };

    const response: GetCIDResponse = await pinata.gateways
      .get(cid)
      .optimizeImage(optimizeOptions);

    if (response.data instanceof Blob) {
      const arrayBuffer = await response.data.arrayBuffer();
      return new NextResponse(arrayBuffer, {
        headers: {
          "Content-Type": "image/webp",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    } else if (typeof response.data === "string") {
      return new NextResponse(response.data, {
        headers: {
          "Content-Type": "image/webp",
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      });
    } else {
      throw new Error("Unexpected data type returned from get method");
    }
  } catch (error) {
    console.error("Error fetching or optimizing image:", error);
    return new NextResponse("Error processing image", { status: 500 });
  }
}
