"use client";

import { useEffect, useState } from "react";
import { useMiniKit, useComposeCast } from "@coinbase/onchainkit/minikit";
import { minikitConfig } from "../minikit.config";
import Image from "next/image";
import styles from "./page.module.css";

// const NOTA_LINES: string[] = [
//   "Her thoughts are galaxies. Her gaze, encrypted.",
//   "She folds futures in silence and speaks only when the room is ready.",
//   "You call her quiet. But the earth listens when she walks.",
//   "...some storms whisper before they strike...",

//   "We invested in silence, because it returns clarity.",
//   "We invested in doubt, because it returns humility.",

//   "You invested in traction. We invested in attention.",
//   "Let’s see who lasts longer after the noise dies down.",

//   "So let them fear her self-worth and flinch at her joy.",
//   "Let them drown in the echo of a woman who no longer waits.",
//   "She does not need your validation. She is not your redemption arc.",
//   "...she is her own proof...",
// ];

type TemplateFn = (name: string) => string;

const RECEIPT_TEMPLATES: TemplateFn[] = [
  // 1
  (name) =>
    `${name}, you are not late. You are right on time for your own timeline.`,
  // 2
  (name) =>
    `Today is already a receipt, ${name}. The question is: what did you spend yourself on?`,
  // 3
  (name) =>
    `Some storms whisper before they strike, ${name}. Stay close to your quiet.`,
  // 4
  (name) =>
    `${name}, you don't owe the feed a performance. You owe yourself an honest move.`,
  // 5
  (name) =>
    `Attention is your rarest asset, ${name}. Spend it like it's finite.`,
  // 6
  (name) =>
    `${name}, your doubt is not a bug. It's a throttle so you don't sprint off a cliff.`,
  // 7
  (name) =>
    `Not every silence is empty, ${name}. Some silences are your system rebooting.`,
  // 8
  (name) =>
    `${name}, if you can name the fear, you can invoice it and let it go.`,
  // 9
  (name) =>
    `The metrics won't remember you, ${name}. The people you held will.`,
  // 10
  (name) =>
    `${name}, you are allowed to be both tired of the system and still play to win.`,
  // 11
  (name) =>
    `Your pace is not a public API, ${name}. You don't owe everyone real-time updates.`,
  // 12
  (name) =>
    `${name}, success is not the graph. It's the days you didn't abandon yourself.`,
  // 13
  (name) =>
    `You don't need a new tool, ${name}. You need one honest promise to yourself.`,
  // 14
  (name) =>
    `${name}, your receipts are not likes. They're the quiet decisions no one sees.`,
  // 15
  (name) =>
    `You can be in beta forever, ${name}, or you can ship this version of you today.`,
  // 16
  (name) =>
    `${name}, some people want access, not connection. Price that accordingly.`,
  // 17
  (name) =>
    `You don't need them to understand, ${name}. You need you to not self-betray.`,
  // 18
  (name) =>
    `${name}, even a soft 'no' is still a firewall. You are allowed to protect your ports.`,
  // 19
  (name) => `The room is not a judge, ${name}. It's just a temporary audience.`,
  // 20
  (name) =>
    `${name}, your rest is not a reward. It's maintenance for a long game.`,
  // 21
  (name) =>
    `You outgrew versions of yourself, ${name}, that once looked like endgame.`,
  // 22
  (name) =>
    `${name}, if the story doesn't fit you anymore, you can stop renewing the subscription.`,
  // 23
  (name) =>
    `Your boundaries are not bugs, ${name}. They're the security layer.`,
  // 24
  (name) => `${name}, you can love people and still rate-limit their access.`,
  // 25
  (name) =>
    `Your past self did the best they could, ${name}. Release the audit.`,
  // 26
  (name) =>
    `${name}, you don't have to fight every battle. Some attacks die on ignored ports.`,
  // 27
  (name) =>
    `You are not behind, ${name}. You're just on a different block height.`,
  // 28
  (name) => `${name}, even onchain truth needs offchain courage.`,
  // 29
  (name) =>
    `You are not here to be neutral, ${name}. You're here to be honest.`,
  // 30
  (name) =>
    `${name}, your softness is not a liability. It's proof the world hasn't hardened you.`,
  // 31
  (name) =>
    `You can leave quietly, ${name}. Not every exit needs an announcement.`,
  // 32
  (name) =>
    `${name}, your attention is the original currency. Choose where you spend it.`,
  // 33
  (name) =>
    `The loudest voice isn't always the truest, ${name}. Tune your own signal.`,
  // 34
  (name) => `${name}, no one can measure the cost of what you didn't say.`,
  // 35
  (name) => `You don't have to monetize every miracle, ${name}.`,
  // 36
  (name) =>
    `${name}, tired does not mean broken. It just means you need a different pace.`,
  // 37
  (name) =>
    `You can't outsource self-respect, ${name}. That's always in-house.`,
  // 38
  (name) =>
    `${name}, not every invitation deserves a 'yes'. Some deserve an archive.`,
  // 39
  (name) =>
    `You don't have to be available on demand, ${name}. You are not a public endpoint.`,
  // 40
  (name) =>
    `${name}, your regret is just a receipt for a lesson already paid for.`,
  // 41
  (name) => `Even if no one claps, ${name}, the work still counts.`,
  // 42
  (name) =>
    `${name}, if you won't stand up for yourself, the system is happy to bill you twice.`,
  // 43
  (name) => `You can be small in numbers and huge in impact, ${name}.`,
  // 44
  (name) => `${name}, courage is rarely aesthetic on the day it happens.`,
  // 45
  (name) =>
    `Your standards will scare some people, ${name}. Let them be scared.`,
  // 46
  (name) => `${name}, there is no award for burning out the fastest.`,
  // 47
  (name) =>
    `The algorithm doesn't love you, ${name}. Let it be a tool, not a temple.`,
  // 48
  (name) =>
    `${name}, your timeline is not a courtroom. You don't owe evidence for every feeling.`,
  // 49
  (name) => `You are not an error for needing slowness, ${name}.`,
  // 50
  (name) => `${name}, it's okay to be proud of quiet progress.`,
  // 51
  (name) =>
    `Your future self is watching, ${name}. Make moves they'll thank you for.`,
  // 52
  (name) =>
    `${name}, some bridges are meant to burn. They were never safe to cross twice.`,
  // 53
  (name) =>
    `The fact that you're still questioning, ${name}, means you're still awake.`,
  // 54
  (name) => `${name}, don't confuse their comfort with your calling.`,
  // 55
  (name) =>
    `You are allowed to log off mid-crisis, ${name}, and return with a clearer head.`,
  // 56
  (name) => `${name}, the person you are becoming is worth the discomfort.`,
  // 57
  (name) =>
    `You can't please the crowd and protect your soul at the same time, ${name}.`,
  // 58
  (name) => `${name}, your worth is not versioned with your output.`,
  // 59
  (name) => `You don't have to explain why you're done, ${name}.`,
  // 60
  (name) => `${name}, some days your only job is not to abandon yourself.`,
  // 61
  (name) => `The right ones won't be threatened by your growth, ${name}.`,
  // 62
  (name) =>
    `${name}, your curiosity is a compass. Don't trade it for convenience.`,
  // 63
  (name) => `You are not difficult, ${name}. You are specific.`,
  // 64
  (name) => `${name}, even your confusion is data. Read it, don't shame it.`,
  // 65
  (name) => `Not everyone earns a front-row seat, ${name}. Curate access.`,
  // 66
  (name) => `${name}, you are allowed to want more than survival.`,
  // 67
  (name) => `You can pause without disappearing, ${name}.`,
  // 68
  (name) =>
    `${name}, your tenderness is not a weakness. It's unsanitized humanity.`,
  // 69
  (name) => `Rest is a radical receipt in a culture of overuse, ${name}.`,
  // 70
  (name) =>
    `${name}, saying 'no' can be the most honest love letter to yourself.`,
  // 71
  (name) =>
    `You are not your last failure, ${name}. That was just one experiment.`,
  // 72
  (name) => `${name}, sometimes the bravest thing you do is stay.`,
  // 73
  (name) => `You don't have to justify outgrowing your old rooms, ${name}.`,
  // 74
  (name) => `${name}, your feelings are not bugs in the system. They're logs.`,
  // 75
  (name) => `You can rewrite the script mid-scene, ${name}.`,
  // 76
  (name) => `${name}, the world benefits nothing from you shrinking.`,
  // 77
  (name) => `You are allowed to log joy as a serious metric, ${name}.`,
  // 78
  (name) => `${name}, you don't need everyone to agree before you move.`,
  // 79
  (name) => `Your energy is finite, ${name}. Not everyone gets a line item.`,
  // 80
  (name) => `${name}, sometimes 'I don't know yet' is the most honest status.`,
  // 81
  (name) => `You are allowed to be both soft and structured, ${name}.`,
  // 82
  (name) => `${name}, not every thought deserves to be posted.`,
  // 83
  (name) => `The quiet work is still on the ledger, ${name}.`,
  // 84
  (name) => `${name}, you owe your younger self a gentler voice.`,
  // 85
  (name) =>
    `You can change your mind without apologizing for the old one, ${name}.`,
  // 86
  (name) => `${name}, some seasons are for planting, not posting.`,
  // 87
  (name) => `You don't have to turn every gift into a job, ${name}.`,
  // 88
  (name) =>
    `${name}, when you protect your peace, you protect your future work.`,
  // 89
  (name) =>
    `The fact that you care still, ${name}, is proof you haven't gone numb.`,
  // 90
  (name) => `${name}, let your timelines breathe. Growth isn't always visible.`,
  // 91
  (name) => `You are not an endless resource, ${name}.`,
  // 92
  (name) =>
    `${name}, you can walk away from what keeps winning but keeps wounding you.`,
  // 93
  (name) => `Your silence today might be your survival, ${name}.`,
  // 94
  (name) =>
    `${name}, the system counts transactions. You get to count transformation.`,
  // 95
  (name) => `You don't have to respond in real time, ${name}.`,
  // 96
  (name) => `${name}, some answers arrive only after you stop refreshing.`,
  // 97
  (name) => `You can be both grateful and hungry for more, ${name}.`,
  // 98
  (name) => `${name}, don't let urgency steal the quality from your yes.`,
  // 99
  (name) => `Comparison is the quickest way to underprice yourself, ${name}.`,
  // 100
  (name) =>
    `${name}, your intuition noticed it before your mind could explain it.`,
  // 101
  (name) => `You are allowed to want softness even in hard times, ${name}.`,
  // 102
  (name) =>
    `${name}, your boundaries today are also receipts for tomorrow's sanity.`,
  // 103
  (name) => `You can't build a life only in reaction to others, ${name}.`,
  // 104
  (name) => `${name}, your 'too much' is exactly right for the right people.`,
  // 105
  (name) => `You don't have to be understood to be real, ${name}.`,
  // 106
  (name) => `${name}, your rest days are also part of the revolution.`,
  // 107
  (name) => `Your life is more than a highlight reel, ${name}.`,
  // 108
  (name) => `${name}, it's okay if all you did today was not give up.`,
  // 109
  (name) => `You are more than what you produce when watched, ${name}.`,
  // 110
  (name) =>
    `${name}, your gentleness with yourself will teach others how to treat you.`,
  // 111
  (name) =>
    `Every time you choose what's true over what's trendy, you win a little back, ${name}.`,
];

function generateReceipt(rawName?: string | null): string {
  const safeName =
    rawName && rawName.trim().length > 0 ? rawName.trim() : "OiOi";

  const idx = Math.floor(Math.random() * RECEIPT_TEMPLATES.length);
  return RECEIPT_TEMPLATES[idx](safeName);
}

export default function Home() {
  const { isFrameReady, setFrameReady, context } = useMiniKit();
  const { composeCastAsync } = useComposeCast();

  // --- helper kecil untuk ambil displayName / username ---
  let username: string | undefined;

  if (context && typeof context === "object" && "user" in context) {
    const user = (context as { user?: { username?: string } }).user;
    if (user?.username && user.username.trim().length > 0) {
      username = user.username.trim();
    }
  }

  const displayName =
    (context?.user?.displayName && context.user.displayName.trim().length > 0
      ? context.user.displayName.trim()
      : username) || "OiOi";

  const [currentNota, setCurrentNota] = useState<string>("");
  const [nameUsed, setNameUsed] = useState<string>(displayName);
  const [isSharing, setIsSharing] = useState(false);

  // Mark Mini App ready
  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [isFrameReady, setFrameReady]);

  // Generate receipt pertama kali & ketika nama user berubah
  useEffect(() => {
    if (!currentNota || nameUsed !== displayName) {
      const next = generateReceipt(displayName);
      setCurrentNota(next);
      setNameUsed(displayName);
    }
  }, [displayName, currentNota, nameUsed]);

  const handleAnother = () => {
    const next = generateReceipt(displayName);
    setCurrentNota(next);
    setNameUsed(displayName);
  };

  const handleShare = async () => {
    try {
      setIsSharing(true);
      const text = `MyReceipt of Today:\n\n“${currentNota}”\n\n— pulled from MyReceipt Mini App on Base.\n\n$OiOi $myreceipt $ENDHONESA #base #notaMiniApp`;

      const result = await composeCastAsync({
        text,
        embeds: [process.env.NEXT_PUBLIC_URL || ""],
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

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.shell}>
          <h1 className={styles.title}>{minikitConfig.miniapp.name}</h1>

          <p className={styles.subtitle}>
            Hi, {displayName}. Here&apos;s a small receipt for today — a short
            line to nudge how you see your day onchain and off.
          </p>

          <div className={styles.notaCard}>
            <div className={styles.notaHeader}>
              <span className={styles.logoText}>
                Prof. NOTA<span className={styles.incSup}>Inc.</span>
              </span>
            </div>

            <div className={styles.notaDots}>...</div>

            <p className={styles.notaText}>{currentNota}</p>

            <div className={styles.notaDots}>...</div>

            <div className={styles.notaFooter}>
              <Image
                src="/nota-pfp.png"
                alt="Prof. NOTA Inc."
                width={96}
                height={96}
                className={styles.notaAvatar}
              />
            </div>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={handleAnother}
            >
              Another Receipt
            </button>

            <button
              type="button"
              className={styles.joinButton}
              onClick={handleShare}
              disabled={isSharing}
            >
              {isSharing ? "Sharing..." : "Share MyReceipt"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
