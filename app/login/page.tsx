"use client";

import styles from "./login.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { mergeGuestCart } from "@/app/services/mergeCarts";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      console.log("LOGIN RESPONSE:", data);

      if (!response.ok) {
        alert(data.error || "Login failed");
        return;
      }

      if (data.user?.id) {
        mergeGuestCart(data.user.id);
      }

      window.dispatchEvent(new Event("authChanged"));

      alert("Logged in!");

      router.push("/");
    } catch (err) {
      console.error("LOGIN ERROR:", err);
      alert("Login failed");
    }
  };

  return (
    <div className="pageContainer">
      <div className={styles.card}>
        <h1 className="pageTitle">Login</h1>

        <form onSubmit={handleLogin} className={styles.formContainer}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />

          <button type="submit" className={styles.loginButton}>
            Login
          </button>
        </form>

        <div className={styles.registerSection}>
          <p>Har du ingen bruger?</p>

          <Link href="/register" className={styles.registerLink}>
            Opret bruger
          </Link>
        </div>
      </div>
    </div>
  );
}
