import { SignIn } from "@clerk/remix";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8">
      <h1>Sign In route</h1>
      <SignIn />
    </div>
  );
}
