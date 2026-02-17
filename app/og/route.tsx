import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const title = searchParams.get("title") || "AI Growth Stack";
  const tags = searchParams.get("tags")?.split(",").filter(Boolean) || [];

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#fafafa",
          padding: "60px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "24px",
              fontWeight: 700,
            }}
          >
            <span style={{ color: "#059669" }}>AI</span>
            <span style={{ color: "#6b7280" }}>/</span>
            <span style={{ color: "#1f2937" }}>Stack</span>
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: title.length > 60 ? "48px" : "56px",
              fontWeight: 800,
              color: "#111827",
              lineHeight: 1.15,
              letterSpacing: "-0.03em",
              maxWidth: "1000px",
            }}
          >
            {title}
          </div>

          {/* Tags */}
          {tags.length > 0 && (
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {tags.slice(0, 4).map((tag) => (
                <div
                  key={tag}
                  style={{
                    backgroundColor: "rgba(5, 150, 105, 0.1)",
                    color: "#059669",
                    padding: "6px 16px",
                    borderRadius: "8px",
                    fontSize: "18px",
                    fontWeight: 600,
                  }}
                >
                  {tag.trim()}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ color: "#6b7280", fontSize: "20px", fontWeight: 500 }}>
            Product Growth in the Age of AI
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #059669, #84cc16)",
              }}
            />
            <span style={{ color: "#374151", fontSize: "18px", fontWeight: 600 }}>
              aigrowthstack.com
            </span>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
