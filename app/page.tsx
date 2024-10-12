import Image from "next/image";
import OGPlayground from "./(og-playground)/components/og-editor";
import OGImageRenderer from "./(og-playground)/components/og-renderer";

export default function Home() {
  return (
    <>
      <OGPlayground />
      <OGImageRenderer previewWidth={600} />
    </>
  );
}
