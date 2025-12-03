export type TemplateFn = (name: string) => string;

export const RECEIPT_TEMPLATES: TemplateFn[] = [
  // 1
  (name) =>
    `${name}, you are not late.\n\nYou are right on time for the version of you that finally shows up.`,
  // 2
  (name) =>
    `Today is already a receipt, ${name}.\n\nThe only question is: what did you actually spend yourself on?`,
  // 3
  (name) =>
    `Some storms whisper before they strike, ${name}.\n\nStay close to your quiet; it hears the forecast first.`,
  // 4
  (name) =>
    `You don't owe the feed a performance, ${name}.\n\nYou owe yourself one honest move that you can live with.`,
  // 5
  (name) =>
    `Attention is your rarest currency, ${name}.\n\nSpend it like it's finite, not like the world will refund you.`,
  // 6
  (name) =>
    `Your doubt is not a bug, ${name}; it's a throttle.\n\nIt slows you down just enough not to sprint off a cliff.`,
  // 7
  (name) =>
    `Not every silence is empty, ${name}.\n\nSome silences are your system quietly rebooting in the background.`,
  // 8
  (name) =>
    `If you can name the fear, ${name}, you can invoice it.\n\nTag the cost, pay once, and stop renewing the panic.`,
  // 9
  (name) =>
    `The metrics won't remember you, ${name}.\n\nThe people you held gently will keep your name long after charts forget.`,
  // 10
  (name) =>
    `You are allowed to be tired of the system, ${name}.\n\nAnd still play to win without letting it rewrite your soul.`,
  // 11
  (name) =>
    `Your pace is not a public API, ${name}.\n\nYou don't owe real-time updates on how fast or slow you heal.`,
  // 12
  (name) =>
    `Success is not the graph, ${name}.\n\nIt's the quiet days you didn't abandon yourself when no one was watching.`,
  // 13
  (name) =>
    `You don't need a new tool, ${name}.\n\nYou need one small promise to yourself that you finally keep.`,
  // 14
  (name) =>
    `Your receipts are not likes, ${name}.\n\nThey're the quiet choices you made when nobody was clapping for you.`,
  // 15
  (name) =>
    `You can stay in beta forever, ${name}.\n\nOr you can ship this version of you and patch along the way.`,
  // 16
  (name) =>
    `Some people want access, not connection, ${name}.\n\nGuard the premium ports; not every ping deserves a reply.`,
  // 17
  (name) =>
    `You don't need them to understand, ${name}.\n\nYou just need to stop betraying yourself to keep them comfortable.`,
  // 18
  (name) =>
    `Even a soft no is still a firewall, ${name}.\n\nYou are allowed to protect your ports without writing an essay.`,
  // 19
  (name) =>
    `The room is not a judge, ${name}; it's just a moment.\n\nThey go home; you stay living with your own reflection.`,
  // 20
  (name) =>
    `Your rest is not a reward, ${name}.\n\nIt's scheduled maintenance if you plan to stay in the game for decades.`,
  // 21
  (name) =>
    `You outgrew versions of yourself, ${name}, that once felt final.\n\nCall it evolution, not betrayal of your past.`,
  // 22
  (name) =>
    `If the story doesn't fit you anymore, ${name}, you may log out.\n\nYou are not required to keep paying that script.`,
  // 23
  (name) =>
    `Your boundaries are not glitches, ${name}.\n\nThey're the security layer that keeps your core from being drained.`,
  // 24
  (name) =>
    `You can love people deeply, ${name}, and still rate-limit access.\n\nFront-row seats are earned, not assumed.`,
  // 25
  (name) =>
    `Your past self did the best they could, ${name}.\n\nArchive the blame; keep the data; move with softer eyes.`,
  // 26
  (name) =>
    `You don't have to fight every battle, ${name}.\n\nSome attacks die quietly when they meet pure indifference.`,
  // 27
  (name) =>
    `You are not behind, ${name}; you're on a different block height.\n\nSync with your own chain, not their noisy clocks.`,
  // 28
  (name) =>
    `Even onchain truth needs offchain courage, ${name}.\n\nLedger is nothing if the human behind it keeps hiding.`,
  // 29
  (name) =>
    `You are not here to be neutral, ${name}.\n\nYou are here to be honest, even when the graph prefers silence.`,
  // 30
  (name) =>
    `Your softness is not a liability, ${name}.\n\nIt's proof the world hasn't managed to harden you into stone.`,
  // 31
  (name) =>
    `You can leave quietly, ${name}; not every exit needs fireworks.\n\nSometimes disappearing is the cleanest boundary.`,
  // 32
  (name) =>
    `Your attention is the original currency, ${name}.\n\nEvery scroll is a micro-payment. Choose your invoices wisely.`,
  // 33
  (name) =>
    `The loudest voice isn't always the truest, ${name}.\n\nTune your inner signal before buying their headlines.`,
  // 34
  (name) =>
    `No one can measure the cost of what you never said, ${name}.\n\nOnly you know how heavy that unsent message feels.`,
  // 35
  (name) =>
    `You don't have to monetize every miracle, ${name}.\n\nSome things are allowed to stay sacred and un-invoiced.`,
  // 36
  (name) =>
    `Tired does not mean broken, ${name}.\n\nIt means your system is asking for a different kind of movement.`,
  // 37
  (name) =>
    `You can't outsource self-respect, ${name}.\n\nNo partner, job, or feed can do that inner admin for you.`,
  // 38
  (name) =>
    `Not every invitation deserves a yes, ${name}.\n\nSome belong in archive, not in your calendar or your chest.`,
  // 39
  (name) =>
    `You don't have to be available on demand, ${name}.\n\nYou are not a public endpoint; you are a living person.`,
  // 40
  (name) =>
    `Your regret is a receipt, ${name}, not a life sentence.\n\nYou've already paid; you don't need to keep rebilling.`,
  // 41
  (name) =>
    `Even if no one claps, ${name}, the work still counts.\n\nQuiet impact is still impact in the long audit.`,
  // 42
  (name) =>
    `If you won't stand up for yourself, ${name}, the system will bill you twice.\n\nPolicy rarely refunds misplaced silence.`,
  // 43
  (name) =>
    `You can be small in numbers and huge in impact, ${name}.\n\nScale is not the same as meaning or integrity.`,
  // 44
  (name) =>
    `Courage is rarely aesthetic on the day it happens, ${name}.\n\nIt often looks like shaking hands still pressing send.`,
  // 45
  (name) =>
    `Your standards will scare some people, ${name}.\n\nLet them be scared; it's cheaper than self-abandonment.`,
  // 46
  (name) =>
    `There is no award for burning out the fastest, ${name}.\n\nThe prize is still being here when the noise has faded.`,
  // 47
  (name) =>
    `The algorithm doesn't love you, ${name}.\n\nTreat it like a tool, not a temple that decides your worth.`,
  // 48
  (name) =>
    `Your timeline is not a courtroom, ${name}.\n\nYou don't owe evidence for every shift in how you feel.`,
  // 49
  (name) =>
    `You are not an error for needing slowness, ${name}.\n\nSome nervous systems were never built for constant pings.`,
  // 50
  (name) =>
    `It's okay to be proud of quiet progress, ${name}.\n\nSome upgrades never trend but still change everything.`,
  // 51
  (name) =>
    `Your future self is watching, ${name}.\n\nMake at least one move today they'll be relieved you chose.`,
  // 52
  (name) =>
    `Some bridges are meant to burn, ${name}.\n\nThey were never safe to cross twice with the same open heart.`,
  // 53
  (name) =>
    `The fact that you're still questioning means you're still awake, ${name}.\n\nNumbness is cheaper; you chose truth.`,
  // 54
  (name) =>
    `Don't confuse their comfort with your calling, ${name}.\n\nYou were not born to be everyone's ergonomic chair.`,
  // 55
  (name) =>
    `You are allowed to log off mid-crisis, ${name}.\n\nCome back when your breath, not your panic, leads the reply.`,
  // 56
  (name) =>
    `The person you are becoming is worth this discomfort, ${name}.\n\nGrowing rarely looks graceful in real time.`,
  // 57
  (name) =>
    `You can't please the crowd and protect your soul at once, ${name}.\n\nAt some point, one of them stops eating.`,
  // 58
  (name) =>
    `Your worth is not versioned with your output, ${name}.\n\nYou were somebody before the first deliverable shipped.`,
  // 59
  (name) =>
    `You don't have to explain why you're done, ${name}.\n\nClosed is a complete sentence when peace is the reason.`,
  // 60
  (name) =>
    `Some days your only job is not to abandon yourself, ${name}.\n\nEven if the to-do list stays almost untouched.`,
  // 61
  (name) =>
    `The right ones won't be threatened by your growth, ${name}.\n\nThey'll bring a chair when you rise, not scissors.`,
  // 62
  (name) =>
    `Your curiosity is a compass, ${name}.\n\nDon't trade it for convenience just because the path looks messy.`,
  // 63
  (name) =>
    `You are not difficult, ${name}; you are specific.\n\nSpecific needs sound loud in rooms built for generic people.`,
  // 64
  (name) =>
    `Even your confusion is data, ${name}.\n\nRead it gently before you judge it; it's trying to warn you.`,
  // 65
  (name) =>
    `Not everyone earns a front-row seat, ${name}.\n\nSome people watch your life better from the cheap seats.`,
  // 66
  (name) =>
    `You are allowed to want more than survival, ${name}.\n\nStability is the floor, not the ceiling of your story.`,
  // 67
  (name) =>
    `You can pause without disappearing, ${name}.\n\nTrue connections survive even when the feed forgets your face.`,
  // 68
  (name) =>
    `Your tenderness is not a weakness, ${name}.\n\nIt's unsanitized humanity in a world obsessed with armor.`,
  // 69
  (name) =>
    `Rest is a radical receipt in a culture of overuse, ${name}.\n\nYou are quietly proving that you are not a machine.`,
  // 70
  (name) =>
    `Saying no can be the most honest love letter to yourself, ${name}.\n\nSome yeses were slowly killing you.`,
  // 71
  (name) =>
    `You are not your last failure, ${name}; that was one experiment.\n\nKeep the lesson; delete the shame from the log.`,
  // 72
  (name) =>
    `Sometimes the bravest thing you do is stay, ${name}.\n\nNot in drama, but in the boring middle where growth hides.`,
  // 73
  (name) =>
    `You don't have to justify outgrowing old rooms, ${name}.\n\nWhen the ceiling hits your head, leaving is biology.`,
  // 74
  (name) =>
    `Your feelings are not bugs in the system, ${name}.\n\nThey're logs; read them before you patch the wrong thing.`,
  // 75
  (name) =>
    `You can rewrite the script mid-scene, ${name}.\n\nNo one owns the narrative rights to your next chapter.`,
  // 76
  (name) =>
    `The world gains nothing from you shrinking, ${name}.\n\nMake space gently, but stop apologizing for existing.`,
  // 77
  (name) =>
    `You are allowed to log joy as a serious metric, ${name}.\n\nA life that only optimizes profit runs at a loss.`,
  // 78
  (name) =>
    `You don't need everyone to agree before you move, ${name}.\n\nConsensus is slower than the call of your gut.`,
  // 79
  (name) =>
    `Your energy is finite, ${name}; not everyone gets a line item.\n\nSome subscriptions must quietly expire.`,
  // 80
  (name) =>
    `“I don't know yet” is an honest status, ${name}.\n\nIt's better than pretending your confusion is conviction.`,
  // 81
  (name) =>
    `You are allowed to be both soft and structured, ${name}.\n\nSpine and tenderness can live in the same body.`,
  // 82
  (name) =>
    `Not every thought deserves to be posted, ${name}.\n\nLet some insights mature off-chain before you mint them.`,
  // 83
  (name) =>
    `The quiet work is still on the ledger, ${name}.\n\nInvisible labor compounds in ways the crowd won't track.`,
  // 84
  (name) =>
    `You owe your younger self a gentler voice, ${name}.\n\nTalk to them today like you wish adults spoke back then.`,
  // 85
  (name) =>
    `You can change your mind without apologizing for the old one, ${name}.\n\nUpdates are proof you were paying attention.`,
  // 86
  (name) =>
    `Some seasons are for planting, not posting, ${name}.\n\nLet the roots tangle in peace before you show the leaves.`,
  // 87
  (name) =>
    `You don't have to turn every gift into a job, ${name}.\n\nSome talents are meant to stay as love letters.`,
  // 88
  (name) =>
    `When you protect your peace, ${name}, you protect your future work.\n\nBurnout erases drafts you haven't met yet.`,
  // 89
  (name) =>
    `The fact that you still care is proof you haven't gone numb, ${name}.\n\nGuard that soft spot; it's where art begins.`,
  // 90
  (name) =>
    `Let your timelines breathe, ${name}; growth isn't always visible.\n\nSome upgrades arrive only after you stop refreshing.`,
  // 91
  (name) =>
    `You are not an endless resource, ${name}.\n\nTreat your body like a country, not an infinite cloud server.`,
  // 92
  (name) =>
    `You can walk away from what keeps winning but keeps wounding you, ${name}.\n\nNot all success is sustainable.`,
  // 93
  (name) =>
    `Your silence today might be your survival, ${name}.\n\nYou can speak later, when your throat is not on fire.`,
  // 94
  (name) =>
    `The system counts transactions, ${name}; you get to count transformation.\n\nDon't let spreadsheets tell the whole story.`,
  // 95
  (name) =>
    `You don't have to respond in real time, ${name}.\n\nSacred things move slower than push notifications.`,
  // 96
  (name) =>
    `Some answers arrive only after you stop refreshing, ${name}.\n\nLet the browser of your mind rest for a while.`,
  // 97
  (name) =>
    `You can be both grateful and hungry for more, ${name}.\n\nGratitude is the ground, not the ceiling of desire.`,
  // 98
  (name) =>
    `Don't let urgency steal the quality from your yes, ${name}.\n\nRushed consent usually invoices you later.`,
  // 99
  (name) =>
    `Comparison is the fastest way to underprice yourself, ${name}.\n\nYour path was never meant to match theirs.`,
  // 100
  (name) =>
    `Your intuition noticed it before your mind could explain it, ${name}.\n\nTreat that glitch as an early warning.`,
  // 101
  (name) =>
    `You are allowed to want softness even in hard times, ${name}.\n\nComfort is not a crime scene.`,
  // 102
  (name) =>
    `Your boundaries today are receipts for tomorrow's sanity, ${name}.\n\nFuture you will quietly say thank you.`,
  // 103
  (name) =>
    `You can't build a life only in reaction to others, ${name}.\n\nDesign something that would exist even if no one watched.`,
  // 104
  (name) =>
    `Your “too much” is exactly right for the right people, ${name}.\n\nWrong rooms will always mislabel your scale.`,
  // 105
  (name) =>
    `You don't have to be understood to be real, ${name}.\n\nExistence is not a group project or a group vote.`,
  // 106
  (name) =>
    `Your rest days are also part of the revolution, ${name}.\n\nExhausted rebels are easier to manage.`,
  // 107
  (name) =>
    `Your life is more than a highlight reel, ${name}.\n\nThe outtakes hold the texture of who you actually are.`,
  // 108
  (name) =>
    `It's okay if all you did today was not give up, ${name}.\n\nSome days survival is the most honest masterpiece.`,
  // 109
  (name) =>
    `You are more than what you produce when watched, ${name}.\n\nPrivate effort still rewrites your story.`,
  // 110
  (name) =>
    `Your gentleness with yourself will teach others how to treat you, ${name}.\n\nYou are writing the manual in real time.`,
  // 111
  (name) =>
    `Every time you choose what's true over what's trendy, you win a little back, ${name}.\n\nIntegrity is the slowest yield and the deepest.`,
];

export function generateReceipt(rawName?: string | null): string {
  const safeName =
    rawName && rawName.trim().length > 0 ? rawName.trim() : "OiOi";

  const idx = Math.floor(Math.random() * RECEIPT_TEMPLATES.length);
  return RECEIPT_TEMPLATES[idx](safeName);
}

export function getMaxReceiptLength(_rawName?: string | null): number {
  const dummyName = "12345678901234567890123456789012"; // 32 karakter

  const max = RECEIPT_TEMPLATES.reduce((currentMax, template) => {
    // Hitung panjang receipt dengan nama sepanjang 32 karakter
    const len = template(dummyName).length;
    return len > currentMax ? len : currentMax;
  }, 0);

  return max;
}
