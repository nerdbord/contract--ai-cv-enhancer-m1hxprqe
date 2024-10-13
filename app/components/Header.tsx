import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/remix";
import { useEffect } from "react";

export default function Header() {
  const { isLoaded, isSignedIn, user } = useUser();
  console.log("USER: ", isLoaded, isSignedIn, user);

  useEffect(() => {
    console.log("USER: ", isLoaded, isSignedIn, user);
    if (isLoaded && isSignedIn && user) {
      console.log("User email: ", user.emailAddresses[0].emailAddress);
    }
  }, [isLoaded, isSignedIn, user]);
  return (
    <header className="flex h-[100px] w-full items-center justify-end px-8">
      <nav className="flex items-center justify-end gap-4">
        <SignedIn>
          {isSignedIn && <p>Welcome, {user?.emailAddresses[0]?.emailAddress}!</p>}
          <div>
            <UserButton />
          </div>
          <div>
            <SignOutButton />
          </div>
        </SignedIn>
        <SignedOut>
          <div className="flex items-center justify-between gap-[10px] rounded-md border-2 border-slate-800 px-4 py-2">
            <div>
              <SignInButton>{"Login"}</SignInButton>
            </div>
            <span>/</span>
            <div>
              <SignUpButton>{"Rejestracja"}</SignUpButton>
            </div>
          </div>
        </SignedOut>
      </nav>
    </header>
  );
}
