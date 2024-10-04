import type { MetaFunction } from "@remix-run/node";
import { Stepper } from "~/components/Stepper";

export const meta: MetaFunction = () => {
  return [
    { title: "AI cv enhancer app." },
    { name: "description", content: "Welcome to AI CV enhancer app!" },
  ];
};

export default function Index() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-between">
      <Stepper currentStep={1} />
    </div>
  );
}
