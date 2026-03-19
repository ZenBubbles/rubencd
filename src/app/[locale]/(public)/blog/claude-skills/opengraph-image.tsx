import { ImageResponse } from "next/og";

export const alt = "Claude Without Skills Is Like a Smartphone Without Apps";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        background: "#0a0a0a",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "80px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "32px",
        }}
      >
        <div
          style={{
            width: "32px",
            height: "2px",
            backgroundColor: "#1D9E75",
          }}
        />
        <span
          style={{
            color: "#1D9E75",
            fontSize: "14px",
            fontWeight: 700,
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
          }}
        >
          AI Skills
        </span>
      </div>

      <h1
        style={{
          color: "#ffffff",
          fontSize: "64px",
          fontWeight: 500,
          lineHeight: 1.1,
          margin: 0,
          maxWidth: "900px",
        }}
      >
        Claude Without Skills Is Like a Smartphone Without Apps
      </h1>

      <p
        style={{
          color: "rgba(255,255,255,0.45)",
          fontSize: "22px",
          fontWeight: 300,
          lineHeight: 1.5,
          marginTop: "28px",
          maxWidth: "700px",
        }}
      >
        Skills are the unlock that turns Claude from a generic chatbot into a personalized thinking
        partner.
      </p>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginTop: "auto",
        }}
      >
        <span
          style={{
            color: "rgba(255,255,255,0.35)",
            fontSize: "16px",
            fontWeight: 400,
          }}
        >
          rubencd.com
        </span>
      </div>
    </div>,
    { ...size },
  );
}
