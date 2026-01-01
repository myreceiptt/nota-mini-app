import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-black bg-white">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-4 py-3 text-xs text-neutral-700 sm:flex-row">
        <span>© {new Date().getFullYear()} Prof. NOTA Inc.</span>
        <span className="flex items-center gap-2">
          <Image
            src="/icon.png"
            alt="logo"
            width={24}
            height={24}
            className="h-6 w-6 rounded-full border border-black object-cover"
          />
          <span>$MyReceipt</span>
        </span>
      </div>
    </footer>
  );
}
