import React from "react";

type Props = {
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
};

export function FormField({ name, value, onChange }: Props) {
  const placeholders: Record<string, string> = {
    title: "Spiltitel",
    description: "Beskrivelse",
    price: "Pris",
    genre: "Genre",
    platform: "Platform",
    image_url: "Filnavn (fx GTA6)",
    release_year: "Udgivelsesår",
    stock: "Antal på lager",
  };

  const placeholder = placeholders[name] ?? name;
  return (
    <div>
      {name == "description" ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={value || ""}
          onChange={onChange}
          rows={5}
        />
      ) : (
        <input
          name={name}
          placeholder={placeholder}
          value={value || ""}
          onChange={onChange}
        />
      )}
    </div>
  );
}
