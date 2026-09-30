import { useRouter } from "next/navigation";
import { PropsUseCreateSubmit } from "./types";

export function useCreateSubmit({
  config,
  formData,
  type,
}: PropsUseCreateSubmit) {
  const router = useRouter();

  const submit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    const data = { ...formData };

    if (config.api === "games" && data.image_url) {
      data.image_url = `/images/games/${data.image_url}.jpg`;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/${config.api}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Kunne ikke oprette");
      }

      router.push(`/admin/${type}`);
    } catch (error) {
      console.error("Create submit error:", error);
    }
  };

  return {
    submit,
  };
}
