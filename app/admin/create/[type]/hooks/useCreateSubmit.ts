import { useRouter } from "next/navigation";
import type { CreateConfig, FormData } from "../types";

type Props = {
  config: CreateConfig;
  formData: FormData;
  type: string;
};

export function useCreateSubmit({ config, formData, type }: Props) {
  const router = useRouter();

  const submit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

    try {
      await fetch(`http://localhost:5000/api/${config.api}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && {
            Authorization: `Bearer ${token}`,
          }),
        },
        body: JSON.stringify(formData),
      });

      router.push(`/admin/${type}`);
    } catch (error) {
      console.error("Create submit error:", error);
    }
  };

  return {
    submit,
  };
}
