import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = {
  width: 1074,
  height: 1474,
};
export const contentType = "image/png";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const rawText = searchParams.get("text") ?? "Your receipt of today.";
  // const rawName = searchParams.get("name") ?? "OiOi";

  // Sedikit guard supaya gak kelewat panjang
  // const name = rawName.slice(0, 64);
  const text = rawText.slice(0, 400);

  const origin = new URL(request.url).origin;
  const avatarUrl = `${origin}/nota-pfp.png`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#ffffff",
          color: "#111111",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          fontFamily:
            "Menlo, ui-monospace, SFMono-Regular, Monaco, 'Courier New', monospace",
          paddingTop: 120,
          paddingBottom: 120,
        }}
      >
        {/* Header: Prof. NOTA Inc. */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: 6,
          }}
        >
          Prof. NOTA
          <span
            style={{
              fontSize: 32,
              verticalAlign: "super",
              marginLeft: 4,
            }}
          >
            Inc.
          </span>
        </div>

        {/* ... di bawah logo */}
        <div
          style={{
            marginTop: 40,
            fontSize: 40,
            letterSpacing: 30,
          }}
        >
          ...
        </div>

        {/* Body text / receipt */}
        <div
          style={{
            marginTop: 80,
            width: "70%",
            fontSize: 40,
            lineHeight: 1.6,
            textAlign: "center",
            whiteSpace: "pre-wrap",
          }}
        >
          {text}
        </div>

        {/* Hashtags */}
        <div
          style={{
            marginTop: 80,
            fontSize: 32,
            letterSpacing: 12,
          }}
        >
          $MyReceipt of $ENDHONESA, $OiOi!
        </div>

        {/* ... sebelum avatar */}
        <div
          style={{
            marginTop: 40,
            fontSize: 40,
            letterSpacing: 30,
          }}
        >
          ...
        </div>

        {/* Avatar */}
        <div
          style={{
            marginTop: 60,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={avatarUrl}
            alt="Prof. NOTA"
            width={260}
            height={260}
            style={{
              borderRadius: 9999,
              border: "4px solid #111111",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
