"use client";

import { use } from "react";

import { useRouter } from "next/navigation";

import createConfig from "./createConfig";

import { useCreateForm } from "./hooks/useCreateForm";
import { useCreateSubmit } from "./hooks/useCreateSubmit/useCreateSubmit";

import { CreateForm } from "./components/CreateForm";

import type { CreateParams } from "./types";

import styles from "./create.module.css";

export default function CreatePage({
  params,
}: {
  params: Promise<CreateParams>;
}) {
  const { type } = use(params);

  const router = useRouter();

  const config = createConfig[type as keyof typeof createConfig];

  const { formData, handleChange } = useCreateForm();

  const { submit } = useCreateSubmit({
    config,
    formData,
    type,
  });

  if (!config) {
    return <h1 className="title">Ukendt type</h1>;
  }

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>{config.createTitle}</h1>

      <CreateForm
        config={config}
        formData={formData}
        onChange={handleChange}
        onSubmit={submit}
      />
    </main>
  );
}
