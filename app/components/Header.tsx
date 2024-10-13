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
