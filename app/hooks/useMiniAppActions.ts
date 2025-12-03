"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useAddFrame,
  useComposeCast,
  useOpenUrl,
} from "@coinbase/onchainkit/minikit";

type UseMiniAppActionsParams = {
  renderText: string;
  currentNota: string;
  displayName: string;
};

type UseMiniAppActionsResult = {
  isSharing: boolean;
  handleSaveMiniApp: () => Promise<void>;
  handleShare: () => Promise<void>;
  handleOpenStandalone: () => void;
  handleTips: () => void;
};

const TIP_URL =
  process.env.NEXT_PUBLIC_TIP_URL || "https://warpcast.com/myreceipt";

export function useMiniAppActions({
  renderText,
  currentNota,
  displayName,
}: UseMiniAppActionsParams): UseMiniAppActionsResult {
  const { composeCastAsync } = useComposeCast();
  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();
  const router = useRouter();

  const [isSharing, setIsSharing] = useState(false);

  const handleSaveMiniApp = async () => {
    try {
      const result = await addFrame();
      if (result) {
        console.log("Mini App saved in host:", result);
      } else {
        console.log("Save Mini App cancelled or unavailable");
      }
    } catch (error) {
      console.error("Error saving Mini App:", error);
    }
  };

  const handleShare = async () => {
    try {
      setIsSharing(true);
      const textBody = renderText || currentNota;
      const text = `MyReceipt of Today:\n\n“${textBody}”\n\n— pulled from MyReceipt Mini App on Base as $MyReceipt for $ENDHONESA, $OiOi.`;

      const baseUrl =
        process.env.NEXT_PUBLIC_URL || "https://mini.endhonesa.com";

      const result = await composeCastAsync({
        text,
        embeds: [baseUrl],
      });

      if (result?.cast) {
        console.log("Cast created successfully:", result.cast.hash);
        router.push("/success");
      } else {
        console.log("User cancelled the cast");
      }
    } catch (error) {
      console.error("Error sharing cast:", error);
    } finally {
      setIsSharing(false);
    }
  };

  const handleOpenStandalone = () => {
    if (!renderText && !currentNota) return;

    const displayText = renderText || currentNota;
    const origin = typeof window !== "undefined" ? window.location.origin : "";

    const url = `${origin}/open?text=${encodeURIComponent(
      displayText
    )}&name=${encodeURIComponent(displayName || "OiOi")}`;

    openUrl(url);
  };

  const handleTips = () => {
    try {
      openUrl(TIP_URL);
    } catch (error) {
      console.error("Error opening tips URL:", error);
    }
  };

  return {
    isSharing,
    handleSaveMiniApp,
    handleShare,
    handleOpenStandalone,
    handleTips,
  };
}
