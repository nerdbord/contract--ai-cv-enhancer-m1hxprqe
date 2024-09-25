import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/remix";

export default function Header() {
  return (
    <header className="h-32 w-full border-b-2 bg-primary px-4 py-6 shadow-sm">
      <nav className="flex items-center justify-end gap-4">
        <SignedIn>
          <p>You are signed in!</p>
          <div>
            <p>View your profile here</p>
            <UserButton />
          </div>
          <div>
            <SignOutButton />
          </div>
        </SignedIn>
        <SignedOut>
          <p>You are signed out</p>
          <div>
            <SignInButton />
          </div>
          <div>
            <SignUpButton />
          </div>
        </SignedOut>
      </nav>
    </header>
  );
}
