export const buttonStyles = {
  primary:
    "rounded-full border border-black px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] hover:bg-black hover:text-white disabled:opacity-50",
  action:
    "rounded-full border border-black px-3 py-1 text-[11px] uppercase tracking-[0.18em] hover:bg-black hover:text-white disabled:opacity-50",
} as const;

export const toggleButtonClass = (active: boolean, base: string) =>
  `${base} ${
    active
      ? "border-black bg-black text-white hover:bg-white hover:text-black"
      : "border-black bg-white hover:bg-black hover:text-white"
  }`;
