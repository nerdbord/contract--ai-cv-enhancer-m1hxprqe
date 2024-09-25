import { SignUp } from "@clerk/remix";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-8">
      <h1>Sign Up route</h1>
      <SignUp />
    </div>
  );
}
