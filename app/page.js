import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", width: "100vw", position: "relative" }}>
      {/* Your image - full width + height */}
      <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
        <Image
          src="/page.png"
          alt="Paid On Results"
          fill
          priority
          style={{ objectFit: "cover" }}
        />

        {/* Clickable button - on top of the purple button in the image */}
        <Link
          href="/register"
          style={{
            position: "absolute",
            bottom: "18%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "85%",
            maxWidth: "380px",
            height: "62px",
            borderRadius: "999px",
            display: "block",
            background: "transparent",
            cursor: "pointer",
            zIndex: 10,
          }}
        />
      </div>
    </div>
  );
}