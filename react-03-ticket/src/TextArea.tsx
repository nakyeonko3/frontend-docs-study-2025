import { useRef } from "react";

function TextArea({
  label,
  name,
  placeholder,
}: {
  label: string;
  name: string;
  placeholder: string;
}) {
  const idRef = useRef(`input-${Math.random().toString(16).slice(2)}`);

  return (
    <div>
      <label htmlFor={idRef.current}>{label}</label>
      <textarea name={name} placeholder={placeholder} id={idRef.current} />
    </div>
  );
}

export default TextArea;
