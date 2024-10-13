import {
  SignedIn,
  SignedOut,
  SignIn,
  SignInButton,
  SignUpButton,
  useSignIn,
  useUser,
} from "@clerk/remix";
import { useEffect } from "react";
import { Button } from "~/components/ui/button";
import { ActionData } from "~/routes/_index";

type SummaryStepProps = {
  summary: ActionData | undefined;
};

export const SummaryStep = ({ summary }: SummaryStepProps) => {
  const { isLoaded, isSignedIn, user } = useUser();
  const { signIn } = useSignIn();

  // Save CV to localStorage when enhancedCV is available
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      console.log("USER: ", isLoaded, isSignedIn, user);
      console.log("User email: ", user.emailAddresses[0].emailAddress);
    }
    if (summary?.enhancedCV) {
      localStorage.setItem("enhancedCV", summary.enhancedCV);
    }
  }, [summary, isLoaded, isSignedIn, user]);

  const handleDownload = async () => {
    const cv = localStorage.getItem("enhancedCV");
    if (!isSignedIn) {
      // Trigger Clerk sign-in and redirect back after login

      return <SignIn />;
    }

    if (cv) {
      console.log("Downloading CV: ", cv);
    } else {
      console.error("No CV found in localStorage.");
    }
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <h1 className="text-center text-3xl font-semibold text-slate-900">
        Sprawdź, jak dopasowaliśmy Twoje CV, i, jeśli chcesz, edytuj je dalej
      </h1>

      <SignedIn>
        {/* Only enable the button when the client has mounted and user is signed in */}
        <Button
          disabled={!isLoaded || !summary || !isSignedIn}
          type="button"
          onClick={handleDownload}
        >
          Pobierz
        </Button>
      </SignedIn>

      <SignedOut>
        <p>Musisz się zalogować, aby pobrać CV</p>
        <Button onClick={() => signIn?.authenticateWithRedirect}>
          <SignedOut>
            <div>
              <SignIn />
            </div>
          </SignedOut>
        </Button>
      </SignedOut>

      {!summary ? "skeleton" : <div>wygenerowane cv</div>}
    </div>
  );
};
