import { ImageResponse } from "next/og";

// Wajib untuk ImageResponse di route handler
export const runtime = "edge";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const rawText = searchParams.get("text") ?? "Your receipt of today.";
    const nameParam = searchParams.get("name") ?? "OiOi";

    // Batasin panjang teks biar nggak bikin masalah di renderer
    const safeText = rawText.slice(0, 280);
    const safeName = nameParam.trim().length > 0 ? nameParam.trim() : "OiOi";

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#ffffff",
            color: "#111111",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily:
              "ui-monospace, Menlo, Monaco, SFMono-Regular, 'SF Mono', 'Roboto Mono', monospace",
          }}
        >
          <div
            style={{
              width: "85%",
              height: "85%",
              border: "2px solid #111111",
              borderRadius: 16,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-between",
              padding: 64,
              boxSizing: "border-box",
            }}
          >
            {/* Header */}
            <div
              style={{
                fontSize: 56,
                fontWeight: 700,
                letterSpacing: 8,
                textAlign: "center",
              }}
            >
              Prof. NOTA
              <span
                style={{
                  fontSize: 28,
                  verticalAlign: "super",
                  marginLeft: 4,
                }}
              >
                Inc.
              </span>
            </div>

            <div
              style={{
                marginTop: 24,
                fontSize: 32,
                letterSpacing: 18,
              }}
            >
              ...
            </div>

            {/* Body */}
            <div
              style={{
                marginTop: 32,
                marginBottom: 32,
                fontSize: 40,
                lineHeight: 1.6,
                textAlign: "center",
                whiteSpace: "pre-wrap",
                maxWidth: 820,
              }}
            >
              {safeText}
            </div>

            <div
              style={{
                fontSize: 28,
                marginTop: 24,
                color: "#474747",
                textAlign: "center",
              }}
            >
              — MyReceipt of Today for {safeName}
            </div>

            <div
              style={{
                marginTop: 24,
                fontSize: 28,
                letterSpacing: 12,
              }}
            >
              #oioi · #endhonesa
            </div>

            {/* “Avatar” dummy circle (tanpa load file dulu, supaya aman) */}
            <div
              style={{
                marginTop: 32,
                width: 220,
                height: 220,
                borderRadius: 9999,
                border: "4px solid #111111",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 72,
                fontWeight: 700,
              }}
            >
              PN
            </div>
          </div>
        </div>
      ),
      {
        width: 1074,
        height: 1474,
      }
    );
  } catch (error) {
    console.error("Error generating receipt image", error);
    return new Response("Failed to generate image", { status: 500 });
  }
}
