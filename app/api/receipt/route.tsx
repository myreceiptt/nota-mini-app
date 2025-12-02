import { ImageResponse } from "next/og";

export const runtime = "edge";

// optional, tapi bagus untuk eksplisit
export const contentType = "image/png";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const searchParams = url.searchParams;

  const rawText = searchParams.get("text") || "Your receipt of today.";
  const rawName = searchParams.get("name") || "OiOi";

  // jaga nama tetap singkat
  const safeName =
    rawName && rawName.trim().length > 0 ? rawName.trim() : "OiOi";

  // batasi panjang text biar tetap rapi di kartu
  const text =
    rawText.length > 260 ? `${rawText.slice(0, 257).trimEnd()}…` : rawText;

  const origin = url.origin;
  const avatarUrl = `${origin}/nota-pfp.png`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#f3f3f3", // ⬅️ bukan full putih lagi
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Menlo, ui-monospace, SFMono-Regular, monospace",
        }}
      >
        {/* Kartu di tengah */}
        <div
          style={{
            width: 900,
            height: 1250,
            backgroundColor: "#ffffff",
            borderRadius: 32,
            border: "2px solid #111111",
            boxShadow: "0 18px 60px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 80,
          }}
        >
          {/* Header */}
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              letterSpacing: 6,
            }}
          >
            Prof. NOTA
            <span
              style={{
                fontSize: 26,
                verticalAlign: "super",
                marginLeft: 4,
              }}
            >
              Inc.
            </span>
          </div>

          <div
            style={{
              marginTop: 36,
              fontSize: 32,
              letterSpacing: 18,
              color: "#666666",
            }}
          >
            ...
          </div>

          {/* Body text */}
          <div
            style={{
              marginTop: 72,
              flex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontSize: 36,
              lineHeight: 1.7,
              color: "#111111",
              whiteSpace: "pre-wrap",
            }}
          >
            {text}
          </div>

          {/* Hashtag + nama user */}
          <div
            style={{
              marginTop: 24,
              fontSize: 24,
              letterSpacing: 6,
              color: "#666666",
            }}
          >
            {`#MyReceipt #OiOi #endhonesa • for ${safeName}`}
          </div>

          <div
            style={{
              marginTop: 24,
              fontSize: 32,
              letterSpacing: 18,
              color: "#666666",
            }}
          >
            ...
          </div>

          {/* Avatar */}
          <div
            style={{
              marginTop: 36,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatarUrl}
              alt="Prof. NOTA"
              width={200}
              height={200}
              style={{
                borderRadius: 9999,
                border: "3px solid #111111",
                objectFit: "cover",
              }}
            />
          </div>
        </div>
      </div>
    ),
    {
      width: 1074,
      height: 1474,
    }
  );
}
