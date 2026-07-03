import React from "react";

type Props = {
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
};

export function FormField({ name, value, onChange }: Props) {
  const isTextArea = name === "description";

  return (
    <div>
      {isTextArea ? (
        <textarea
          name={name}
          placeholder={name}
          value={value || ""}
          onChange={onChange}
          rows={5}
        />
      ) : (
        <input
          name={name}
          placeholder={name}
          value={value || ""}
          onChange={onChange}
        />
      )}
    </div>
  );
}
