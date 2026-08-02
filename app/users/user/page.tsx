"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import OrderHistory from "./components/orderHistory/orderHistory";
import FavoriteList from "./components/userFavorites/userFavorites";
import styles from "./userPage.module.css";

export default function UserPage() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users/user", {
          credentials: "include",
        });

        if (!res.ok) {
          router.replace("/");
          return;
        }

        const data = await res.json();

        setUser(data.user);
        setLoading(false);
      } catch (error) {
        console.error(error);
        router.replace("/");
      }
    };

    fetchUser();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return (
    <main style={{ padding: "2rem" }}>
      <h1 className={styles.userPageTitle}>Min side</h1>

      <p className={styles.userWelcome}>Velkommen {user.email}</p>

      <div className={styles.userPageContent}>
        <FavoriteList />
        <OrderHistory />
      </div>
    </main>
  );
}
