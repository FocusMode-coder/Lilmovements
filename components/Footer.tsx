import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-4 py-5 text-[11px] sm:text-xs text-neutral-500 flex flex-wrap items-center gap-x-3 gap-y-2">
        <span>© {new Date().getFullYear()} Lil Movements</span>
        <span className="hidden sm:inline">•</span>
        <Link href="/terms" className="hover:text-neutral-700 underline underline-offset-2">Terms</Link>
        <span className="hidden sm:inline">•</span>
        <Link href="/privacy" className="hover:text-neutral-700 underline underline-offset-2">Privacy</Link>
        <span className="hidden sm:inline">•</span>
        <Link href="/cookies" className="hover:text-neutral-700 underline underline-offset-2">Cookies</Link>
        <span className="hidden sm:inline">•</span>
        <Link href="/legal/health" className="hover:text-neutral-700 underline underline-offset-2">Health</Link>
        <span className="hidden sm:inline">•</span>
        <Link href="/legal/membership" className="hover:text-neutral-700 underline underline-offset-2">Membership</Link>
        <span className="hidden sm:inline">•</span>
        <Link href="/legal/dmca" className="hover:text-neutral-700 underline underline-offset-2">DMCA</Link>
      </div>
    </footer>
  );
}