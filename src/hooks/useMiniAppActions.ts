"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useAddFrame,
  useComposeCast,
  useOpenUrl,
} from "@coinbase/onchainkit/minikit";

import { getBaseUrl, getTipUrl } from "../lib/env";
import { buildShareText } from "../lib/shareText";

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
      const text = buildShareText(textBody);
      const baseUrl = getBaseUrl();

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
      openUrl(getTipUrl());
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
