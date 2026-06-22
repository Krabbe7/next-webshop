"use client";

import Link from "next/link";
import { use } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import adminConfig from "./adminConfig";
import styles from "./adminOverviewPage.module.css";

export default function AdminPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const { type } = use(params);

  const router = useRouter();

  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const config = adminConfig[type as keyof typeof adminConfig];

  // Flyttet op før useEffect bruger config
  if (!config) {
    return <h1>Ukendt admin-side</h1>;
  }

  useEffect(() => {
    const loadData = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.replace("/");
        return;
      }

      const userRes = await fetch("http://localhost:5000/api/users/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = await userRes.json();

      if (!userRes.ok || userData.user.role !== "admin") {
        router.replace("/");
        return;
      }

      const res = await fetch(`http://localhost:5000/api/${config.api}`);
      const data = await res.json();

      setItems(data);
      setLoading(false);
    };

    loadData();
  }, [config, router]);

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/${config.api}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <main className={styles.adminContainer}>
      <h1 className={styles.title}>{config.title}</h1>

      <Link href={`/admin/create/${type}`} className={styles.createButton}>
        ➕ Opret ny
      </Link>

      <div className={styles.itemsGrid}>
        {items.map((item) => (
          <div key={item.id} className={styles.card}>
            <div className={styles.content}>
              {type === "games" && (
                <div className={styles.imageWrapper}>
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className={styles.image}
                    />
                  ) : (
                    <div className={styles.noImage}>Intet billede</div>
                  )}
                </div>
              )}
              <h3 className={styles.itemTitle}>{item[config.displayField]}</h3>

              {"price" in item && (
                <p className={styles.price}>{item.price} kr.</p>
              )}

              <div className={styles.actions}>
                <Link
                  href={`/admin/edit/${type}/${item.id}`}
                  className={styles.editButton}
                >
                  Rediger
                </Link>

                <button
                  onClick={() => handleDelete(item.id)}
                  className={styles.deleteButton}
                >
                  Slet
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
