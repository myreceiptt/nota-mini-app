import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const textParam = searchParams.get("text") || "Your receipt of today.";
  const name = searchParams.get("name") || "OiOi";

  const origin = new URL(request.url).origin;
  const avatarUrl = `${origin}/nota-pfp.png`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Menlo, ui-monospace, SFMono-Regular, monospace",
        }}
      >
        {/* Kartu di tengah, dengan border jelas */}
        <div
          style={{
            width: 900,
            height: 1250,
            border: "2px solid #111111",
            borderRadius: 24,
            backgroundColor: "#ffffff",
            color: "#111111",
            padding: 64,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Header */}
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              letterSpacing: 8,
              textAlign: "center",
            }}
          >
            Prof. NOTA
            <span
              style={{
                fontSize: 24,
                verticalAlign: "super",
                marginLeft: 4,
              }}
            >
              Inc.
            </span>
          </div>

          {/* Dots atas */}
          <div
            style={{
              marginTop: 24,
              fontSize: 32,
              letterSpacing: 20,
            }}
          >
            ...
          </div>

          {/* Body text / receipt */}
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              fontSize: 40,
              lineHeight: 1.5,
              padding: "0 16px",
              whiteSpace: "pre-wrap",
            }}
          >
            {textParam}
          </div>

          {/* Hashtags + nama */}
          <div
            style={{
              marginTop: 24,
              fontSize: 28,
              letterSpacing: 6,
              textAlign: "center",
            }}
          >
            #{name} • #OiOi • #endhonesa
          </div>

          {/* Dots bawah */}
          <div
            style={{
              marginTop: 24,
              fontSize: 32,
              letterSpacing: 20,
            }}
          >
            ...
          </div>

          {/* Avatar */}
          <div
            style={{
              marginTop: 32,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={avatarUrl}
              alt="Prof. NOTA"
              width={220}
              height={220}
              style={{
                borderRadius: 9999,
                border: "4px solid #111111",
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
