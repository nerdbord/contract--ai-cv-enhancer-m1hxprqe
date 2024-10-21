import { FC, useState, useEffect, useRef } from "react";
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
  const textareaRef = useRef<HTMLTextAreaElement>(null); // Referencja do textarea

  const handleSave = () => {
    onChange(tempValue);
    setIsEditing(false);
  };

  const handleBlur = () => {
    handleSave();
  };

  // Funkcja do dostosowywania wysokości textarea
  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Resetowanie wysokości
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Ustawianie wysokości na wartość scrollHeight
    }
  };

  useEffect(() => {
    if (isEditing) {
      adjustHeight(); // Dostosuj wysokość za każdym razem, gdy komponent przechodzi w tryb edycji
    }
  }, [isEditing]);

  useEffect(() => {
    adjustHeight(); // Dostosuj wysokość za każdym razem, gdy wartość się zmienia
  }, [tempValue]);

  const Element = elementType as keyof JSX.IntrinsicElements;

  return isEditing ? (
    <Textarea
      ref={textareaRef}
      name={name}
      value={tempValue}
      onChange={(e) => setTempValue(e.target.value)}
      onBlur={handleBlur}
      className={`resizable-none m-0 appearance-none bg-transparent p-2 shadow-none outline-none ${className}`}
    />
  ) : (
    <Element onClick={() => setIsEditing(true)} className={`cursor-pointer ${className}`}>
      {value}
    </Element>
  );
};
