"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import OrderHistory from "./components/orderHistory";
export default function UserPage() {
  const router = useRouter();
  const params = useParams();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/");
      return;
    }

    const fetchUser = async () => {
      const res = await fetch("http://localhost:5000/api/users/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        router.replace("/");
        return;
      }

      setUser(data.user);
      setLoading(false);
    };

    fetchUser();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Min side</h1>

      <p>Velkommen {user.email}</p>

      {/* ADMIN VIEW */}
      {/* {user.role === "admin" ? (
        <div>
          <h2>Admin panel</h2>

          <Link href="/admin/create">➕ Opret spil</Link>
          <br />
          <Link href="/admin">🎮 Gå til admin games</Link>
        </div>
      ) : ( */}
      <div>
        <h2>Bruger side</h2>
        <OrderHistory />
      </div>
      {/* )} */}
    </main>
  );
}
