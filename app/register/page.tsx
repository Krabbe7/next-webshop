"use client";

import styles from "./register.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

import ErrorMessage from "../components/errorMessage/errorMessage";

import {
  isValidEmail,
  isValidPassword,
} from "../betaling/components/inputValidation/inputValidation";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validate = () => {
    const newErrors = {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    // Username
    if (!username.trim()) {
      newErrors.username = "Brugernavn skal udfyldes.";
    }

    // Email
    if (!email.trim()) {
      newErrors.email = "Email skal udfyldes.";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Indtast en gyldig email.";
    }

    // Password
    if (!password) {
      newErrors.password = "Password skal udfyldes.";
    } else if (!isValidPassword(password)) {
      newErrors.password = "Password skal være mindst 8 tegn.";
    }

    // Confirm password
    if (!confirmPassword) {
      newErrors.confirmPassword = "Gentag dit password.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords er ikke ens.";
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Stop hvis valideringen fejler
    if (!validate()) {
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors((prev) => ({
          ...prev,
          email: data.error || "Kunne ikke oprette bruger.",
        }));

        return;
      }

      router.push("/login");
    } catch (error) {
      console.error(error);

      setErrors((prev) => ({
        ...prev,
        email: "Der opstod en fejl. Prøv igen.",
      }));
    }
  };

  return (
    <div className="pageContainer">
      <div className={styles.card}>
        <h1 className="pageTitle">Opret bruger</h1>

        <form onSubmit={handleRegister} className={styles.formContainer}>
          {/* Username */}
          <div>
            <input
              type="text"
              placeholder="Brugernavn"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);

                setErrors((prev) => ({
                  ...prev,
                  username: "",
                }));
              }}
              className="input"
            />

            <ErrorMessage message={errors.username} />
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);

                setErrors((prev) => ({
                  ...prev,
                  email: "",
                }));
              }}
              className="input"
            />

            <ErrorMessage message={errors.email} />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);

                setErrors((prev) => ({
                  ...prev,
                  password: "",
                  confirmPassword: "",
                }));
              }}
              className="input"
            />

            <ErrorMessage message={errors.password} />
          </div>

          {/* Confirm password */}
          <div>
            <input
              type="password"
              placeholder="Gentag password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);

                setErrors((prev) => ({
                  ...prev,
                  confirmPassword: "",
                }));
              }}
              className="input"
            />

            <ErrorMessage message={errors.confirmPassword} />
          </div>

          <button type="submit" className={styles.registerButton}>
            Opret bruger
          </button>
        </form>
      </div>
    </div>
  );
}
