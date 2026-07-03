import { useState } from "react";
import type { FormData } from "../types";

export function useCreateForm() {
  const [formData, setFormData] = useState<FormData>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData({});
  };

  return {
    formData,
    setFormData,
    handleChange,
    resetForm,
  };
}
