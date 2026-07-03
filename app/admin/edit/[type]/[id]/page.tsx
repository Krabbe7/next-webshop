"use client";

import { use } from "react";

import editConfig from "./editConfig";

import { useEditItem } from "./hooks/useEditItem";
import { useEditSubmit } from "./hooks/useEditSubmit";

import { EditForm } from "./components/EditForm";

import type { EditParams } from "./types";

export default function EditPage({ params }: { params: Promise<EditParams> }) {
  const { type, id } = use(params);

  const config = editConfig[type as keyof typeof editConfig];

  const { item, setItem, loading } = useEditItem(config, id);

  const { submit } = useEditSubmit({
    config,
    item: item!,
    id,
    type,
  });

  if (!config) return <h1>Ukendt type</h1>;
  if (loading || !item) return <p>Loading...</p>;

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Rediger {config.title}</h1>

      <EditForm
        config={config}
        item={item}
        onChange={setItem}
        onSubmit={submit}
      />
    </main>
  );
}
