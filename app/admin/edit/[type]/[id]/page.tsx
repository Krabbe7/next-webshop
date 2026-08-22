"use client";

import { use } from "react";

import editConfig from "./editConfig";

import { useEditItem } from "./hooks/useEditItem";
import { useEditSubmit } from "./hooks/useEditSubmit/useEditSubmit";

import { EditForm } from "./components/EditForm";

import type { EditParams } from "./types";

import styles from "./edit.module.css";

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

  if (!config) return <h1 className="title">Ukendt type</h1>;
  if (loading || !item) return <p>Loading...</p>;

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Rediger {config.title}</h1>

      <EditForm
        config={config}
        item={item}
        onChange={setItem}
        onSubmit={submit}
      />
    </main>
  );
}
