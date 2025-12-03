"use client";

import { useAddFrame, useComposeCast } from "@coinbase/onchainkit/minikit";
import { useRouter } from "next/navigation";

type UseSuccessActionsResult = {
  handleClose: () => void;
  handleGet: () => void;
  handleTips: () => Promise<void>;
  handlePin: () => Promise<void>;
  handleShare: () => Promise<void>;
};

export function useSuccessActions(): UseSuccessActionsResult {
  const { composeCastAsync } = useComposeCast();
  const addFrame = useAddFrame();
  const router = useRouter();

  const baseUrl = process.env.NEXT_PUBLIC_URL || "https://mini.endhonesa.com";

  const handleClose = () => {
    router.push("/");
  };

  const handleGet = () => {
    router.push("/");
  };

  const handleTips = async () => {
    try {
      const text = `If today's receipt landed for you, consider tipping or collecting around $MyReceipt / $ENDHONESA / $OiOi to support Prof. NOTA.\n\n— $MyReceipt for $ENDHONESA, $OiOi.`;

      const result = await composeCastAsync({
        text,
        embeds: [baseUrl],
      });

      if (result?.cast) {
        console.log("Tip cast created successfully:", result.cast.hash);
      } else {
        console.log("User cancelled the tip cast");
      }
    } catch (error) {
      console.error("Error sharing tip cast:", error);
    }
  };

  const handlePin = async () => {
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
      const text = `I just pulled today's receipt from MyReceipt Mini App on Base.\n\nA small onchain receipt for how I see today, OiOi.\n\n— $MyReceipt for $ENDHONESA $OiOi.`;

      const result = await composeCastAsync({
        text,
        embeds: [baseUrl],
      });

      if (result?.cast) {
        console.log("Cast created successfully:", result.cast.hash);
      } else {
        console.log("User cancelled the cast");
      }
    } catch (error) {
      console.error("Error sharing cast:", error);
    }
  };

  return { handleClose, handleGet, handleTips, handlePin, handleShare };
}
