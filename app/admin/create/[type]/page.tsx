"use client";

import { use, useEffect, useState } from "react";

import createConfig from "./createConfig";

import { useCreateForm } from "./hooks/useCreateForm";

import { useCreateSubmit } from "./hooks/useCreateSubmit/useCreateSubmit";

import { CreateForm } from "./components/CreateForm";

import type { CreateParams, SelectOption } from "./types";

export default function CreatePage({
  params,
}: {
  params: Promise<CreateParams>;
}) {
  const { type } = use(params);

  const config = createConfig[type as keyof typeof createConfig];

  const [platforms, setPlatforms] = useState<SelectOption[]>([]);
  const [genres, setGenres] = useState<SelectOption[]>([]);

  const { formData, handleChange } = useCreateForm();

  useEffect(() => {
    if (type !== "games") return;

    const fetchOptions = async () => {
      try {
        const [platformsResponse, genresResponse] = await Promise.all([
          fetch("http://localhost:5000/api/platforms"),
          fetch("http://localhost:5000/api/genres"),
        ]);

        if (!platformsResponse.ok || !genresResponse.ok) {
          throw new Error("Kunne ikke hente platforme eller genrer");
        }

        const platformsData = await platformsResponse.json();

        const genresData = await genresResponse.json();

        setPlatforms(platformsData);
        setGenres(genresData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOptions();
  }, [type]);

  const { submit } = useCreateSubmit({
    config,
    formData,
    type,
  });

  if (!config) {
    return <h1 className="pageTitle">Ukendt type</h1>;
  }

  return (
    <div className="pageContainer">
      <h1 className="pageTitle">{config.createTitle}</h1>

      <CreateForm
        config={config}
        formData={formData}
        platforms={platforms}
        genres={genres}
        onChange={handleChange}
        onSubmit={submit}
      />
    </div>
  );
}
