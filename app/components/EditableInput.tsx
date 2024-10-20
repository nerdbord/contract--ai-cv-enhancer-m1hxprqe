import { Input as ShadcnInput } from "~/components/ui/input";

export const EditableInput = ({ ...props }) => (
  <ShadcnInput
    {...props}
    className="m-0 appearance-none border-none bg-transparent p-0 shadow-none outline-none"
  />
);
