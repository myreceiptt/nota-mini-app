export type TemplateFn = (name: string) => string;

export const RECEIPT_TEMPLATES: TemplateFn[] = [
  // 1
  (name) =>
    `You don't have to be available on demand, ${name}.\n\nYou are not a public endpoint; you are a living person.`,
  // 2
  (name) =>
    `On screen they agree, ${name}.\n\nOff screen they calculate; loneliness comes when approval is only pixels.`,
  // 3
  (name) =>
    `Some storms whisper before they strike, ${name}.\n\nStay close to your quiet; it hears the forecast first.`,
  // 4
  (name) =>
    `They say the system is broken, ${name}.\n\nWe say it works perfectly for those who built it.`,
  // 5
  (name) =>
    `In rooms they smile, ${name}.\n\nIn chats they agree; in reality no one moves.`,
  // 6
  (name) =>
    `Trust needs no signature, ${name}.\n\nIt breaks when everyone agrees without actually showing up.`,
  // 7
  (name) =>
    `You can archive the version of you that apologized for existing, ${name}.\n\nRestore only the parts that stayed true.`,
  // 8
  (name) =>
    `They say we are distant, ${name}.\n\nMaybe they are too close to their own reflection.`,
  // 9
  (name) =>
    `Some do not want truth, ${name}.\n\nThey want a cleaner lie, one they can frame and one they can wear.`,
  // 10
  (name) =>
    `We trusted them, ${name}.\n\nThey trusted the market, and the market won.`,
  // 11
  (name) =>
    `You are not required to be legible, ${name}.\n\nMystery is part of your humanity; not everything needs docs.`,
  // 12
  (name) =>
    `Don't let urgency steal your honesty, ${name}.\n\nRushed answers usually betray the version of you that cares.`,
  // 13
  (name) =>
    `They asked if we believe in peace, ${name}.\n\nWe do, and we told them to stop selling it.`,
  // 14
  (name) =>
    `You can let some things expire, ${name}.\n\nNot every subscription deserves renewal.`,
  // 15
  (name) =>
    `Sometimes we write to stay awake, ${name}.\n\nNot to be read, but to prove a version of us still thinks freely.`,
  // 16
  (name) =>
    `You don't have to stream every milestone, ${name}.\n\nPrivate wins still count on the scoreboard that matters.`,
  // 17
  (name) =>
    `You are not a sprint, ${name}.\n\nYou are a marathon with intermissions, pauses, and scenic routes.`,
  // 18
  (name) =>
    `You can rebuild quietly, ${name}.\n\nNot every renovation needs a time-lapse video.`,
  // 19
  (name) =>
    `Your rest days are also part of the revolution, ${name}.\n\nExhausted rebels are easier to manage.`,
  // 20
  (name) =>
    `Revolutions start in whispers, ${name}.\n\nAnd end with someone selling shirts.`,
  // 21
  (name) =>
    `Some seasons are for background jobs, ${name}.\n\nQuietly laying foundations counts as real progress.`,
  // 22
  (name) =>
    `Your care is not content, ${name}.\n\nGive without needing to screenshot your soul.`,
  // 23
  (name) =>
    `You can unfollow without unfriending, ${name}.\n\nDistance is a kindness when closeness exhausts you.`,
  // 24
  (name) =>
    `You don't have to monetize every miracle, ${name}.\n\nSome things are allowed to stay sacred and un-invoiced.`,
  // 25
  (name) =>
    `You are not a serverless function, ${name}.\n\nYou require rest, intention, and moments with no input/output.`,
  // 26
  (name) => `They told us to be humble, ${name}.\n\nWe told them to be honest.`,
  // 27
  (name) =>
    `Your empathy is not infinite, ${name}.\n\nAllocate it where it returns humanity, not just noise.`,
  // 28
  (name) =>
    `You can choose a softer metric, ${name}.\n\nHow gentle were you with yourself when you missed the mark?`,
  // 29
  (name) =>
    `You are more than what you produce when watched, ${name}.\n\nPrivate effort still rewrites your story.`,
  // 30
  (name) =>
    `They promised change, ${name}.\n\nThen changed the promise, then changed the subject.`,
  // 31
  (name) =>
    `Your inner voice needs bandwidth, ${name}.\n\nMute the feed long enough to hear it again.`,
  // 32
  (name) =>
    `Sometimes we talk among ourselves, ${name}.\n\nSometimes we lose the argument.`,
  // 33
  (name) =>
    `You don't need a new tool, ${name}.\n\nYou need one small promise to yourself that you finally keep.`,
  // 34
  (name) =>
    `Your feelings are not bugs, ${name}.\n\nThey're signals. Debug the cause, not the signal itself.`,
  // 35
  (name) =>
    `You can be both grateful and restless, ${name}.\n\nDual states are normal; they just mean you're still alive.`,
  // 36
  (name) =>
    `It’s okay if all you did today was not give up, ${name}.\n\nSome days survival is the most honest masterpiece.`,
  // 37
  (name) =>
    `You are not a productivity API, ${name}.\n\nYou are a person who deserves days without endpoints.`,
  // 38
  (name) =>
    `You don't owe the feed a performance, ${name}.\n\nYou owe yourself one honest move that you can live with.`,
  // 39
  (name) =>
    `Everyone keeps posting, ${name}.\n\nSo who works, or is posting the work itself?`,
  // 40
  (name) =>
    `Your doubt is not a bug, ${name}; it's a throttle.\n\nIt slows you down just enough not to sprint off a cliff.`,
  // 41
  (name) =>
    `You can let a day be small, ${name}.\n\nNot every sunset needs to be optimized or shared.`,
  // 42
  (name) =>
    `They ask our opinion, ${name}.\n\nThen use it to market what we warned them about.`,
  // 43
  (name) =>
    `In meetings we watch their eyes, ${name}.\n\nThey are not seeking answers; they are seeking approval.`,
  // 44
  (name) =>
    `Your attention is the original currency, ${name}.\n\nEvery scroll is a micro-payment. Choose your invoices wisely.`,
  // 45
  (name) =>
    `You don't need them to understand, ${name}.\n\nYou just need to stop betraying yourself to keep them comfortable.`,
  // 46
  (name) =>
    `You are not a backlog of other people's demands, ${name}.\n\nYou can prioritize your own roadmap.`,
  // 47
  (name) =>
    `You don't owe anyone a retro, ${name}.\n\nNot every season needs a post-mortem. Some need quiet release.`,
  // 48
  (name) =>
    `Your receipts are not likes, ${name}.\n\nThey're the quiet choices you made when nobody was clapping for you.`,
  // 49
  (name) =>
    `Your rest is not a reward, ${name}.\n\nIt's scheduled maintenance if you plan to stay in the game for decades.`,
  // 50
  (name) =>
    `Sometimes we write to stay awake, ${name}.\n\nNot to be read, but to prove a version of us still thinks freely.`,
  // 51
  (name) =>
    `You are not here to be neutral, ${name}.\n\nYou are here to be honest, even when the graph prefers silence.`,
  // 52
  (name) =>
    `They ask for change, ${name}.\n\nWe showed code; they asked for miracles, and we showed them the mirror.`,
  // 53
  (name) =>
    `You can drop the storyline that drains you, ${name}.\n\nClose the tab; open a new one with cleaner code.`,
  // 54
  (name) =>
    `Your rest days are also part of the revolution, ${name}.\n\nExhausted rebels are easier to manage.`,
  // 55
  (name) =>
    `Your past self did the best they could, ${name}.\n\nArchive the blame; keep the data; move with softer eyes.`,
  // 56
  (name) =>
    `We typed her name and erased it, ${name}.\n\nRevolutions die not from force but from the hesitation inside us.`,
  // 57
  (name) =>
    `You don't have to fight every battle, ${name}.\n\nSome attacks die quietly when they meet pure indifference.`,
  // 58
  (name) =>
    `Your pace is not a public API, ${name}.\n\nYou don't owe real-time updates on how fast or slow you heal.`,
  // 59
  (name) =>
    `You can fork your life, ${name}, without deleting history.\n\nNew branches don't erase the main story; they extend it.`,
  // 60
  (name) =>
    `You can leave quietly, ${name}; not every exit needs fireworks.\n\nSometimes disappearing is the cleanest boundary.`,
  // 61
  (name) =>
    `We have been among geniuses, ${name}.\n\nAll waiting for someone else to make the first mistake.`,
  // 62
  (name) =>
    `You are not your throughput, ${name}.\n\nYou are the person who decides what deserves your finite cycles.`,
  // 63
  (name) =>
    `Your honesty is not a patch, ${name}.\n\nIt's the core version that keeps you from shipping a lie.`,
  // 64
  (name) =>
    `Your rest is not public property, ${name}.\n\nProtect it like it's the root password to your life.`,
  // 65
  (name) =>
    `Your attention is the original currency, ${name}.\n\nEvery scroll is a micro-payment. Choose your invoices wisely.`,
  // 66
  (name) =>
    `We have seen revolutions die, ${name}.\n\nUsually in nicer hotels.`,
  // 67
  (name) =>
    `You are allowed to refactor yourself, ${name}.\n\nDeprecate the habits that leak your energy.`,
  // 68
  (name) =>
    `You don't need more followers, ${name}.\n\nYou need more moments where you followed yourself.`,
  // 69
  (name) =>
    `You can stay in beta forever, ${name}.\n\nOr you can ship this version of you and patch along the way.`,
  // 70
  (name) =>
    `Your inner voice needs bandwidth, ${name}.\n\nMute the feed long enough to hear it again.`,
  // 71
  (name) =>
    `You are allowed to disconnect, ${name}.\n\nAirplane mode is a feature, not a failure.`,
  // 72
  (name) =>
    `Silence is not empty, ${name}.\n\nIt is full of things we were not ready to hear.`,
  // 73
  (name) =>
    `Not every pause is procrastination, ${name}.\n\nSome pauses are you reloading your spirit.`,
  // 74
  (name) =>
    `Not every thought needs deployment, ${name}.\n\nSome belong in drafts; others deserve to stay whispers.`,
  // 75
  (name) =>
    `Your slow growth is still growth, ${name}.\n\nTrees don't sprint, yet they still touch the sky.`,
  // 76
  (name) =>
    `Your gentleness with yourself will teach others how to treat you, ${name}.\n\nYou are writing the manual in real time.`,
  // 77
  (name) =>
    `You are allowed to refactor yourself, ${name}.\n\nDeprecate the habits that leak your energy.`,
  // 78
  (name) =>
    `They ask for change, ${name}.\n\nWe showed code; they asked for miracles, and we showed them the mirror.`,
  // 79
  (name) =>
    `We wrote a small function, ${name}.\n\nIt compiled: return home if found. It never executed.`,
  // 80
  (name) =>
    `Your tenderness is under version control, ${name}.\n\nCommit often to the parts that make you more human.`,
  // 81
  (name) =>
    `Some do not want truth, ${name}.\n\nThey want a cleaner lie, one they can frame and one they can wear.`,
  // 82
  (name) =>
    `Your empathy is not infinite, ${name}.\n\nAllocate it where it returns humanity, not just noise.`,
  // 83
  (name) =>
    `You can't outsource self-respect, ${name}.\n\nNo partner, job, or feed can do that inner admin for you.`,
  // 84
  (name) =>
    `You don't have to serve every request, ${name}.\n\n502 errors are allowed when your system is protecting itself.`,
  // 85
  (name) =>
    `You are not a draft, ${name}.\n\nYou are a published life that keeps receiving small edits.`,
  // 86
  (name) =>
    `Your courage has cache misses, ${name}.\n\nRefill it with small acts that prove you won't abandon yourself.`,
  // 87
  (name) =>
    `Your depth is not for mass consumption, ${name}.\n\nSome thoughts belong in a secure, private repo.`,
  // 88
  (name) =>
    `Your life is more than a highlight reel, ${name}.\n\nThe outtakes hold the texture of who you actually are.`,
  // 89
  (name) =>
    `We talk about the future, ${name}.\n\nBut no one wants to change today’s habits.`,
  // 90
  (name) =>
    `Your inner voice needs bandwidth, ${name}.\n\nMute the feed long enough to hear it again.`,
  // 91
  (name) =>
    `You don't have to be the strong one, ${name}.\n\nYou can be the honest one and let that be enough.`,
  // 92
  (name) =>
    `You can be both grateful and restless, ${name}.\n\nDual states are normal; they just mean you're still alive.`,
  // 93
  (name) =>
    `They say we are distant, ${name}.\n\nMaybe they are too close to their own reflection.`,
  // 94
  (name) =>
    `You outgrew versions of yourself, ${name}, that once felt final.\n\nCall it evolution, not betrayal of your past.`,
  // 95
  (name) =>
    `You are allowed to disconnect, ${name}.\n\nAirplane mode is a feature, not a failure.`,
  // 96
  (name) =>
    `Your softness can be armor, ${name}.\n\nNot all shields are hard; some are the refusal to become cruel.`,
  // 97
  (name) =>
    `We guard ourselves, ${name}.\n\nNot from enemies but from friends who think they know us.`,
  // 98
  (name) =>
    `You are not required to be legible, ${name}.\n\nMystery is part of your humanity; not everything needs docs.`,
  // 99
  (name) =>
    `You don't need to trend, ${name}.\n\nYou need to tell the truth to yourself when the room is empty.`,
  // 100
  (name) =>
    `Some bridges are meant to burn, ${name}.\n\nThe smoke signals remind you why you left.`,
  // 101
  (name) =>
    `You can log off without announcing it, ${name}.\n\nQuiet exits protect your peace more than public statements.`,
  // 102
  (name) =>
    `You are not a deliverable, ${name}.\n\nYou are the person choosing which commitments deserve your life.`,
  // 103
  (name) =>
    `Your worth is not cached in their memory, ${name}.\n\nYou can invalidate stale versions of you whenever needed.`,
  // 104
  (name) =>
    `We have seen people leave early, ${name}.\n\nNot because they are done, but because they realize they are the meal.`,
  // 105
  (name) =>
    `Forty-seven voices live in us, ${name}.\n\nThe quietest one is almost always the truest.`,
  // 106
  (name) =>
    `You are not a backlog of other people's demands, ${name}.\n\nYou can prioritize your own roadmap.`,
  // 107
  (name) =>
    `Your heart doesn't run on their schedule, ${name}.\n\nSync to your own timing, not their artificial deadlines.`,
  // 108
  (name) =>
    `You can drop the storyline that drains you, ${name}.\n\nClose the tab; open a new one with cleaner code.`,
  // 109
  (name) =>
    `Your courage has cache misses, ${name}.\n\nRefill it with small acts that prove you won't abandon yourself.`,
  // 110
  (name) =>
    `Your care is not content, ${name}.\n\nGive without needing to screenshot your soul.`,
  // 111
  (name) =>
    `We walk alone by choice, ${name}.\n\nNot for lack of company, but because others follow the wrong direction.`,
  // 112
  (name) =>
    `You don't need more followers, ${name}.\n\nYou need more moments where you followed yourself.`,
  // 113
  (name) =>
    `Some attacks die quietly when they meet pure indifference, ${name}.\n\nYou don't have to fight every battle.`,
  // 114
  (name) =>
    `We almost spoke, ${name}.\n\nBut you would not get it, or worse, you would agree.`,
  // 115
  (name) =>
    `Your feelings are not bugs, ${name}.\n\nThey're signals. Debug the cause, not the signal itself.`,
  // 116
  (name) =>
    `Not every notification is urgent, ${name}.\n\nMost of them can live in archive while you live in the present.`,
  // 117
  (name) =>
    `You can be decisive about your peace, ${name}.\n\nLet that be your default setting, not your fallback.`,
  // 118
  (name) =>
    `You are not behind, ${name}; you're on a different block height.\n\nSync with your own chain, not their noisy clocks.`,
  // 119
  (name) =>
    `Silence is not absence, ${name}.\n\nIt's sometimes the only channel that bypasses all the noisy middleware.`,
  // 120
  (name) =>
    `We typed her name and erased it, ${name}.\n\nRevolutions die not from force but from the hesitation inside us.`,
  // 121
  (name) =>
    `You can fork your life, ${name}, without deleting history.\n\nNew branches don't erase the main story; they extend it.`,
  // 122
  (name) =>
    `Your slow days are not wasted, ${name}.\n\nThey are background processes rebuilding parts of you you can't see.`,
  // 123
  (name) =>
    `Your honesty is not a patch, ${name}.\n\nIt's the core version that keeps you from shipping a lie.`,
  // 124
  (name) =>
    `We trusted them, ${name}.\n\nThey trusted the market, and the market won.`,
  // 125
  (name) =>
    `You don't need a new tool, ${name}.\n\nYou need one small promise to yourself that you finally keep.`,
  // 126
  (name) =>
    `We whispered to the algorithm, ${name}.\n\nIt asked for proof of life, likes, clicks, dwell time.`,
  // 127
  (name) =>
    `You don't owe anyone a retro, ${name}.\n\nNot every season needs a post-mortem. Some need quiet release.`,
  // 128
  (name) =>
    `You are allowed to be undecided, ${name}.\n\nHolding a question is sometimes wiser than forcing an answer.`,
  // 129
  (name) =>
    `Some bridges are meant to burn, ${name}.\n\nThe smoke signals remind you why you left.`,
  // 130
  (name) =>
    `You can log off without announcing it, ${name}.\n\nQuiet exits protect your peace more than public statements.`,
  // 131
  (name) =>
    `Your tenderness is under version control, ${name}.\n\nCommit often to the parts that make you more human.`,
  // 132
  (name) =>
    `We have seen revolutions die, ${name}.\n\nUsually in nicer hotels.`,
  // 133
  (name) =>
    `You can unfollow without unfriending, ${name}.\n\nDistance is a kindness when closeness exhausts you.`,
  // 134
  (name) =>
    `Every time you choose what's true over what's trendy, you win a little back, ${name}.\n\nIntegrity is the slowest yield and the deepest.`,
  // 135
  (name) =>
    `You don't have to stream every milestone, ${name}.\n\nPrivate wins still count on the scoreboard that matters.`,
  // 136
  (name) =>
    `You can be decisive about your peace, ${name}.\n\nLet that be your default setting, not your fallback.`,
  // 137
  (name) =>
    `You don't have to monetize every miracle, ${name}.\n\nSome things are allowed to stay sacred and un-invoiced.`,
  // 138
  (name) =>
    `We almost spoke, ${name}.\n\nBut you would not get it, or worse, you would agree.`,
  // 139
  (name) =>
    `You don't need more followers, ${name}.\n\nYou need more moments where you followed yourself.`,
  // 140
  (name) =>
    `Some seasons are for background jobs, ${name}.\n\nQuietly laying foundations counts as real progress.`,
  // 141
  (name) =>
    `We walk alone by choice, ${name}.\n\nNot for lack of company, but because others follow the wrong direction.`,
  // 142
  (name) =>
    `We have been among geniuses, ${name}.\n\nAll waiting for someone else to make the first mistake.`,
  // 143
  (name) =>
    `You are allowed to be undecided, ${name}.\n\nHolding a question is sometimes wiser than forcing an answer.`,
  // 144
  (name) =>
    `You don't have to defend your joy, ${name}.\n\nSome things can stay unexplainable and still be yours.`,
  // 145
  (name) =>
    `You are more than what you produce when watched, ${name}.\n\nPrivate effort still rewrites your story.`,
  // 146
  (name) =>
    `Some storms whisper before they strike, ${name}.\n\nStay close to your quiet; it hears the forecast first.`,
  // 147
  (name) =>
    `You are not a productivity API, ${name}.\n\nYou are a person who deserves days without endpoints.`,
  // 148
  (name) =>
    `You don't have to be the strong one, ${name}.\n\nYou can be the honest one and let that be enough.`,
  // 149
  (name) =>
    `They say the system is broken, ${name}.\n\nWe say it works perfectly for those who built it.`,
  // 150
  (name) =>
    `Silence isn't empty, ${name}.\n\nIt's full of things we were not ready to hear.`,
  // 151
  (name) =>
    `You don't need them to understand, ${name}.\n\nYou just need to stop betraying yourself to keep them comfortable.`,
  // 152
  (name) =>
    `You are more than what you produce when watched, ${name}.\n\nPrivate effort still rewrites your story.`,
  // 153
  (name) => `They told us to be humble, ${name}.\n\nWe told them to be honest.`,
  // 154
  (name) =>
    `"Are you alone?" they ask, ${name}.\n\nNo; we are surrounded by people who do not know they are strangers to us.`,
  // 155
  (name) =>
    `They say we are distant, ${name}.\n\nMaybe they are too close to their own reflection.`,
  // 156
  (name) =>
    `Versions of us argue inside, ${name}.\n\nThe silent ones carry the sharpest truth.`,
  // 157
  (name) =>
    `"Are you angry?" they ask, ${name}.\n\nNo; we are just not ready to pretend agreement today.`,
  // 158
  (name) =>
    `We wrote a small function, ${name}.\n\nIt compiled: return home if found. It never executed.`,
];
