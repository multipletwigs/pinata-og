import OGPlayground from "./(og-playground)/components/og-editor";
import OGImageRenderer from "./(og-playground)/components/og-renderer";

export default function Home() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
      <OGPlayground />
      <OGImageRenderer />
    </div>
  );
}
