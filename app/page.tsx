import Image from "next/image";
import OGPlayground from "./(og-playground)/components/og-editor";
import OGImageRenderer from "./(og-playground)/components/og-renderer";
import OGMedataExport from "./(og-playground)/components/og-metadata";

export default function Home() {
  return (
    <>
      <OGPlayground />
      <div className="flex flex-col gap-4">
        <OGImageRenderer previewWidth={600} />
        <OGMedataExport />
      </div>
    </>
  );
}
