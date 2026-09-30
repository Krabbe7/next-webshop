"use client";

import { use, useEffect, useState } from "react";

import editConfig from "./editConfig";

import { useEditItem } from "./hooks/useEditItem";
import { useEditSubmit } from "./hooks/useEditSubmit/useEditSubmit";

import { EditForm } from "./components/EditForm";

import type { EditParams } from "./types";
import type { SelectOption } from "./components/types";

export default function EditPage({ params }: { params: Promise<EditParams> }) {
  const { type, id } = use(params);

  const config = editConfig[type as keyof typeof editConfig];

  const [platforms, setPlatforms] = useState<SelectOption[]>([]);
  const [genres, setGenres] = useState<SelectOption[]>([]);

  const { item, setItem, loading } = useEditItem(config, id);

  const { submit } = useEditSubmit({
    config,
    item: item!,
    id,
    type,
  });

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

        setPlatforms(
          platformsData.map((platform: SelectOption) => ({
            ...platform,
            id: Number(platform.id),
          })),
        );

        setGenres(
          genresData.map((genre: SelectOption) => ({
            ...genre,
            id: Number(genre.id),
          })),
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchOptions();
  }, [type]);

  if (!config) {
    return <h1 className="title">Ukendt type</h1>;
  }

  if (loading || !item) {
    return <p>Loading...</p>;
  }

  return (
    <div className="pageContainer">
      <h1 className="pageTitle">Rediger {config.title}</h1>

      <EditForm
        config={config}
        item={item}
        platforms={platforms}
        genres={genres}
        onChange={setItem}
        onSubmit={async (e) => {
          await submit(e);
        }}
      />
    </div>
  );
}
