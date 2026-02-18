import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const quote =
    searchParams.get("quote") || "AI-powered growth is the future";
  const author = searchParams.get("author") || "AI Growth Stack";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#111827",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Top gradient accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #059669, #84cc16)",
          }}
        />

        {/* Quote mark */}
        <div
          style={{
            fontSize: "120px",
            color: "#059669",
            lineHeight: 1,
            marginBottom: "-20px",
            opacity: 0.6,
          }}
        >
          {"\u201C"}
        </div>

        {/* Quote text */}
        <div
          style={{
            fontSize:
              quote.length > 120 ? "36px" : quote.length > 80 ? "42px" : "48px",
            fontWeight: 700,
            color: "#f9fafb",
            textAlign: "center",
            lineHeight: 1.3,
            maxWidth: "900px",
            marginBottom: "40px",
          }}
        >
          {quote}
        </div>

        {/* Author */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "2px",
              backgroundColor: "#059669",
            }}
          />
          <div
            style={{
              fontSize: "20px",
              color: "#9ca3af",
              fontWeight: 500,
            }}
          >
            {author}
          </div>
        </div>

        {/* Bottom branding */}
        <div
          style={{
            position: "absolute",
            bottom: "30px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              fontSize: "16px",
              fontWeight: 600,
              display: "flex",
              gap: "6px",
            }}
          >
            <span style={{ color: "#059669" }}>AI</span>
            <span style={{ color: "#6b7280" }}>/</span>
            <span style={{ color: "#d1d5db" }}>Stack</span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 675,
    }
  );
}
