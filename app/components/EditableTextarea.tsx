import { Textarea as ShadcnTextarea } from "~/components/ui/textarea";

export const EditableTextarea = ({ ...props }) => (
  <ShadcnTextarea
    {...props}
    className="m-0 resize-none appearance-none overflow-y-hidden border-none bg-transparent p-0 shadow-none outline-none"
  />
);
