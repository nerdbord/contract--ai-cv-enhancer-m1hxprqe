import { FC, useState } from "react";
import { Textarea } from "~/components/ui/textarea";

interface EditableTextareaFieldProps {
  value: string;
  onChange: (newValue: string) => void;
  elementType?: keyof JSX.IntrinsicElements;
  className?: string;
  name?: string;
}

export const EditableTextareaField: FC<EditableTextareaFieldProps> = ({
  value,
  onChange,
  elementType = "div",
  className = "",
  name = "",
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleSave = () => {
    onChange(tempValue);
    setIsEditing(false);
  };

  const handleBlur = () => {
    handleSave();
  };

  const Element = elementType as keyof JSX.IntrinsicElements;

  return isEditing ? (
    <Textarea
      name={name}
      value={tempValue}
      onChange={(e) => setTempValue(e.target.value)}
      onBlur={handleBlur}
      className={`m-0 appearance-none border-none bg-transparent p-0 shadow-none outline-none ${className}`}
    />
  ) : (
    <Element onClick={() => setIsEditing(true)} className={`cursor-pointer ${className}`}>
      {value}
    </Element>
  );
};
