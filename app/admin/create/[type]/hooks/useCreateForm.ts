import { useState } from "react";
import type { FormData, FormFieldValue } from "@/app/admin/types";

export function useCreateForm() {
  const [formData, setFormData] = useState<FormData>({});

  const handleChange = (name: string, value: FormFieldValue) => {
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
