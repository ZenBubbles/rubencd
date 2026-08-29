import { ImageResponse } from "next/og";

export const alt = "The Difference Between 891 Users and 3.2 Million Is a Decimal Point";
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
        position: "relative",
      }}
    >
      <svg
        width="520"
        height="420"
        viewBox="0 0 400 300"
        style={{ position: "absolute", right: "-40px", bottom: "-30px", opacity: 0.55 }}
      >
        <path
          d="M36 260 C 160 258, 280 254, 364 248"
          fill="none"
          stroke="#5f5f5a"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M36 260 C 190 258, 310 234, 364 186"
          fill="none"
          stroke="#4f9c74"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M36 260 C 200 258, 320 214, 364 110"
          fill="none"
          stroke="#6fc296"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M36 260 C 210 258, 330 196, 364 30"
          fill="none"
          stroke="#9be0ba"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>

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
          Builder Notes
        </span>
      </div>

      <h1
        style={{
          color: "#ffffff",
          fontSize: "58px",
          fontWeight: 500,
          lineHeight: 1.12,
          margin: 0,
          maxWidth: "880px",
        }}
      >
        The Difference Between 891 Users and 3.2 Million Is a Decimal Point
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
        The viral coefficient (K-factor), and why virality is decided in the decimals.
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
