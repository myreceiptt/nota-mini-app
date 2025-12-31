export function buildShareText(body: string): string {
  return `MyReceipt of Today:\n\n“${body}”\n\n— pulled from MyReceipt Mini App on Base as $MyReceipt for $ENDHONESA, $OiOi.`;
}

export function buildOpenShareText(body: string, _displayName: string): string {
  return `I just opened one of MyReceipt's images:\n\n“${body}”\n\n— shared from MyReceipt Mini App on Base as $MyReceipt for $ENDHONESA, $OiOi.`;
}

export function buildTipCastText(): string {
  return `If today's receipt landed for you, consider tipping or collecting around $MyReceipt / $ENDHONESA / $OiOi to support Prof. NOTA.\n\n— $MyReceipt for $ENDHONESA, $OiOi.`;
}

export function buildSuccessShareText(miniappName: string): string {
  return `I just pulled today's receipt from ${miniappName} Mini App on Base.\n\nA small onchain receipt for how I see today, OiOi.\n\n— $MyReceipt for $ENDHONESA $OiOi.`;
}
