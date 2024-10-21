import { FC, useState } from "react";

interface EditableInputFieldProps {
  elementType: keyof JSX.IntrinsicElements;
  fieldType?: string; // Made optional, it can be undefined for certain elements
  name: string;
  value: string;
  className?: string;
  onChange: (newValue: string) => void; // Change to string for simplicity
}

export const EditableInputField: FC<EditableInputFieldProps> = ({
  elementType,
  fieldType,
  name,
  value,
  className = "",
  onChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const handleSave = () => {
    onChange(tempValue);
    setIsEditing(false);
  };

  const handleBlur = () => {
    console.log("Field lost focus. Saving value:", tempValue);
    handleSave();
  };

  const Element = elementType as keyof JSX.IntrinsicElements;

  return isEditing ? (
    <input
      type={fieldType}
      name={name}
      value={tempValue}
      onChange={(e) => setTempValue(e.target.value)}
      onBlur={handleBlur}
      className={`m-0 h-7 rounded-md border border-violet-800 bg-transparent px-1 py-0 shadow-none outline-none ${className}`}
    />
  ) : (
    <Element onClick={() => setIsEditing(true)} className={`cursor-pointer ${className}`}>
      {value}
    </Element>
  );
};
