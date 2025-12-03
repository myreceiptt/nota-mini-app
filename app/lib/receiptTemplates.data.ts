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
    `Your worth is not cached in their memory, ${name}.\n\nYou can invalidate stale versions of you whenever needed.`,
  // 41
  (name) =>
    `Don't let urgency steal your honesty, ${name}.\n\nRushed answers usually betray the version of you that cares.`,
  // 42
  (name) =>
    `You can be both grateful and restless, ${name}.\n\nDual states are normal; they just mean you're still alive.`,
  // 43
  (name) =>
    `Your slow days are not wasted, ${name}.\n\nThey are background processes rebuilding parts of you you can't see.`,
  // 44
  (name) =>
    `Not every invitation is for you, ${name}.\n\nForward some to silence; decline others without a footnote.`,
  // 45
  (name) =>
    `When you remember who you are, ${name}, the room adjusts.\n\nLead with that memory, not with their projections.`,
  // 46
  (name) =>
    `You don't owe anyone a retro, ${name}.\n\nNot every season needs a post-mortem. Some need quiet release.`,
  // 47
  (name) =>
    `You are not a serverless function, ${name}.\n\nYou require rest, intention, and moments with no input/output.`,
  // 48
  (name) =>
    `Your tenderness is under version control, ${name}.\n\nCommit often to the parts that make you more human.`,
  // 49
  (name) =>
    `You can fork your life, ${name}, without deleting history.\n\nNew branches don't erase the main story; they extend it.`,
  // 50
  (name) =>
    `Silence is not absence, ${name}.\n\nIt's sometimes the only channel that bypasses all the noisy middleware.`,
  // 51
  (name) =>
    `You don't have to stream every milestone, ${name}.\n\nPrivate wins still count on the scoreboard that matters.`,
  // 52
  (name) =>
    `You are allowed to refactor yourself, ${name}.\n\nDeprecate the habits that leak your energy.`,
  // 53
  (name) =>
    `Your depth is not for mass consumption, ${name}.\n\nSome thoughts belong in a secure, private repo.`,
  // 54
  (name) =>
    `You are not a productivity API, ${name}.\n\nYou are a person who deserves days without endpoints.`,
  // 55
  (name) =>
    `Don't let them rate-limit your joy, ${name}.\n\nIt's your bandwidth; spend it where wonder actually responds.`,
  // 56
  (name) =>
    `Even your doubts can be data, ${name}.\n\nLabel them, learn from them, but don't let them become your defaults.`,
  // 57
  (name) =>
    `You are not a draft, ${name}.\n\nYou are a published life that keeps receiving small edits.`,
  // 58
  (name) =>
    `No one can revoke your quiet, ${name}.\n\nIt's your offline mode; use it before you burn out online.`,
  // 59
  (name) =>
    `You don't need more followers, ${name}.\n\nYou need more moments where you followed yourself.`,
  // 60
  (name) =>
    `Your feelings are not bugs, ${name}.\n\nThey're signals. Debug the cause, not the signal itself.`,
  // 61
  (name) =>
    `You are not required to be legible, ${name}.\n\nMystery is part of your humanity; not everything needs docs.`,
  // 62
  (name) =>
    `You don't need to trend, ${name}.\n\nYou need to tell the truth to yourself when the room is empty.`,
  // 63
  (name) =>
    `Some bridges are meant to burn, ${name}.\n\nThe smoke signals remind you why you left.`,
  // 64
  (name) =>
    `Your courage has cache misses, ${name}.\n\nRefill it with small acts that prove you won't abandon yourself.`,
  // 65
  (name) =>
    `Not every pause is procrastination, ${name}.\n\nSome pauses are you reloading your spirit.`,
  // 66
  (name) =>
    `You don't owe anyone a changelog, ${name}.\n\nYou can evolve without releasing notes to an audience.`,
  // 67
  (name) =>
    `Your empathy is not infinite, ${name}.\n\nAllocate it where it returns humanity, not just noise.`,
  // 68
  (name) =>
    `You can log off without announcing it, ${name}.\n\nQuiet exits protect your peace more than public statements.`,
  // 69
  (name) =>
    `Your honesty is not a patch, ${name}.\n\nIt's the core version that keeps you from shipping a lie.`,
  // 70
  (name) =>
    `You don't have to serve every request, ${name}.\n\n502 errors are allowed when your system is protecting itself.`,
  // 71
  (name) =>
    `Your softness can be armor, ${name}.\n\nNot all shields are hard; some are the refusal to become cruel.`,
  // 72
  (name) =>
    `You are allowed to disconnect, ${name}.\n\nAirplane mode is a feature, not a failure.`,
  // 73
  (name) =>
    `Not every notification is urgent, ${name}.\n\nMost of them can live in archive while you live in the present.`,
  // 74
  (name) =>
    `You are not a sprint, ${name}.\n\nYou are a marathon with intermissions, pauses, and scenic routes.`,
  // 75
  (name) =>
    `Don't let them version your worth, ${name}.\n\nYou ship your value; they don't tag your releases.`,
  // 76
  (name) =>
    `You can unfollow without unfriending, ${name}.\n\nDistance is a kindness when closeness exhausts you.`,
  // 77
  (name) =>
    `You are allowed to be undecided, ${name}.\n\nHolding a question is sometimes wiser than forcing an answer.`,
  // 78
  (name) =>
    `Your care is not content, ${name}.\n\nGive without needing to screenshot your soul.`,
  // 79
  (name) =>
    `You can archive the version of you that apologized for existing, ${name}.\n\nRestore only the parts that stayed true.`,
  // 80
  (name) =>
    `Your inner voice needs bandwidth, ${name}.\n\nMute the feed long enough to hear it again.`,
  // 81
  (name) =>
    `Not every thought needs deployment, ${name}.\n\nSome belong in drafts; others deserve to stay whispers.`,
  // 82
  (name) =>
    `You are not your throughput, ${name}.\n\nYou are the person who decides what deserves your finite cycles.`,
  // 83
  (name) =>
    `You can let a day be small, ${name}.\n\nNot every sunset needs to be optimized or shared.`,
  // 84
  (name) =>
    `Your kindness is not an API key, ${name}.\n\nDon't hand it out to every caller without rate limits.`,
  // 85
  (name) =>
    `You don't need their green lights, ${name}.\n\nYou can start walking when your own signal turns on.`,
  // 86
  (name) =>
    `Some seasons are for background jobs, ${name}.\n\nQuietly laying foundations counts as real progress.`,
  // 87
  (name) =>
    `You are not obligated to be legible, ${name}.\n\nLet them wonder; you are writing a story, not a manual.`,
  // 88
  (name) =>
    `Your rest is not public property, ${name}.\n\nProtect it like it's the root password to your life.`,
  // 89
  (name) =>
    `You don't have to defend your joy, ${name}.\n\nSome things can stay unexplainable and still be yours.`,
  // 90
  (name) =>
    `You can choose a softer metric, ${name}.\n\nHow gentle were you with yourself when you missed the mark?`,
  // 91
  (name) =>
    `Your heart doesn't run on their schedule, ${name}.\n\nSync to your own timing, not their artificial deadlines.`,
  // 92
  (name) =>
    `Not every conflict deserves resolution, ${name}.\n\nSome deserve distance; others deserve to expire.`,
  // 93
  (name) =>
    `You can be decisive about your peace, ${name}.\n\nLet that be your default setting, not your fallback.`,
  // 94
  (name) =>
    `Your honesty is a feature, ${name}.\n\nIf it feels like a bug to them, that's a compatibility issue, not yours.`,
  // 95
  (name) =>
    `You don't have to be the strong one, ${name}.\n\nYou can be the honest one and let that be enough.`,
  // 96
  (name) =>
    `You are not a deliverable, ${name}.\n\nYou are the person choosing which commitments deserve your life.`,
  // 97
  (name) =>
    `Not every wound needs an audience, ${name}.\n\nSome healing happens best in private branches.`,
  // 98
  (name) =>
    `Your slow growth is still growth, ${name}.\n\nTrees don't sprint, yet they still touch the sky.`,
  // 99
  (name) =>
    `You can drop the storyline that drains you, ${name}.\n\nClose the tab; open a new one with cleaner code.`,
  // 100
  (name) =>
    `Your bravery is not measured by output, ${name}.\n\nIt's measured by how often you showed up when it was easier to hide.`,
  // 101
  (name) =>
    `You can let some things expire, ${name}.\n\nNot every subscription deserves renewal.`,
  // 102
  (name) =>
    `You are not a backlog of other people's demands, ${name}.\n\nYou can prioritize your own roadmap.`,
  // 103
  (name) =>
    `Your intuition is a system alert, ${name}.\n\nDon't mute it just because it fires at inconvenient times.`,
  // 104
  (name) =>
    `You can rebuild quietly, ${name}.\n\nNot every renovation needs a time-lapse video.`,
  // 105
  (name) =>
    `Your gentleness is not downtime, ${name}.\n\nIt's the operating mode that keeps you human.`,
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
