"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { sdk } from "@farcaster/miniapp-sdk";
import {
  useAddFrame,
  useComposeCast,
  useOpenUrl,
} from "@coinbase/onchainkit/minikit";
import { getBaseUrl, getTipUrl, getEndhonesaTokenId } from "../lib/env";
import { buildShareText } from "../lib/shareText";

type ShareTextBuilder = (body: string, displayName: string) => string;

type UseMiniAppActionsParams = {
  body: string;
  displayName: string;
  buildShareText?: ShareTextBuilder;
  embedUrl?: string;
};

type UseMiniAppActionsResult = {
  isSharing: boolean;
  handleSaveMiniApp: () => Promise<void>;
  handleShare: () => Promise<void>;
  handleOpenStandalone: () => void;
  handleTips: () => void;
};

export function useMiniAppActions({
  body,
  displayName,
  buildShareText: buildShareTextOverride,
  embedUrl,
}: UseMiniAppActionsParams): UseMiniAppActionsResult {
  const { composeCastAsync } = useComposeCast();
  const addFrame = useAddFrame();
  const openUrl = useOpenUrl();
  const router = useRouter();

  const [isSharing, setIsSharing] = useState(false);

  // Default builder: caption "MyReceipt of Today"
  const defaultBuilder: ShareTextBuilder = (b) => buildShareText(b);

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

      if (!body.trim()) {
        console.log("No receipt body to share");
        setIsSharing(false);
        return;
      }

      const builder = buildShareTextOverride ?? defaultBuilder;
      const text = builder(body, displayName);

      const urlToEmbed = embedUrl ?? getBaseUrl();

      const result = await composeCastAsync({
        text,
        embeds: [urlToEmbed],
      });

      if (result?.cast) {
        console.log("Cast created successfully:", result.cast.hash);
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
    if (!body.trim()) return;

    const url = `/open?text=${encodeURIComponent(
      body
    )}&name=${encodeURIComponent(displayName || "OiOi")}`;

    router.push(url);
  };

  // NEW: Tips → coba buka swapToken $ENDHONESA; kalau gagal, fallback ke URL tips lama
  const handleTips = () => {
    const buyToken = getEndhonesaTokenId();

    // Kalau env belum diisi token ID, fallback ke URL tips lama
    if (!buyToken) {
      try {
        openUrl(getTipUrl());
      } catch (error) {
        console.error("Error opening tips URL:", error);
      }
      return;
    }

    sdk.actions
      .swapToken({ buyToken })
      .then((result) => {
        if (result.success) {
          console.log("Swap flow opened, txs:", result.swap.transactions);
        } else {
          console.warn(
            "Swap token action failed or cancelled:",
            result.reason,
            result.error
          );
        }
      })
      .catch((error) => {
        console.error("Error calling swapToken:", error);
        // Fallback terakhir: buka URL tips lama
        try {
          openUrl(getTipUrl());
        } catch (e) {
          console.error("Error opening fallback tips URL:", e);
        }
      });
  };

  return {
    isSharing,
    handleSaveMiniApp,
    handleShare,
    handleOpenStandalone,
    handleTips,
  };
}
