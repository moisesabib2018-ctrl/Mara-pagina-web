import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="bg-navy text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Logo className="text-lg font-semibold tracking-wide" />
      </div>
    </header>
  );
}
