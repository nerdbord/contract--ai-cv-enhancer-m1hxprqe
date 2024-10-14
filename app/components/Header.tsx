import { SignInButton, SignOutButton, SignedIn, SignedOut } from "@clerk/remix";

export default function Header() {
  return (
    <header className="mb-10 px-8">
      <nav className="flex items-center justify-between gap-4">
        <img src="/logo.png" alt="Logo" />
        <SignedIn>
          <SignOutButton>
            <button className="flex items-center justify-between gap-[10px] rounded-md border-2 border-slate-800 px-11 py-2">
              Wyloguj
            </button>
          </SignOutButton>
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="flex items-center justify-between gap-[10px] rounded-md border-2 border-slate-800 px-4 py-2">
              Login / Rejestracja
            </button>
          </SignInButton>
        </SignedOut>
      </nav>
    </header>
  );
}
