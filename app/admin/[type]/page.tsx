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

  if (!config) {
    return <h1 className="title">Ukendt admin-side</h1>;
  }

  useEffect(() => {
    const loadData = async () => {
      try {
        // Tjekker om brugeren er logget ind og er admin
        const userRes = await fetch("http://localhost:5000/api/users/user", {
          credentials: "include",
        });

        const userData = await userRes.json();

        // Hvis brugeren ikke er logget ind eller ikke er admin
        if (!userRes.ok || userData.user?.role !== "admin") {
          router.replace("/");
          return;
        }

        // Hent admin-data
        const res = await fetch(`http://localhost:5000/api/${config.api}`, {
          credentials: "include",
        });

        if (!res.ok) {
          console.error("Kunne ikke hente admin-data");
          setLoading(false);
          return;
        }

        const data = await res.json();

        setItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Kunne ikke hente admin-data:", error);

        router.replace("/");
      }
    };

    loadData();
  }, [config, router]);

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:5000/api/${config.api}/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) {
        console.error("Kunne ikke slette element");
        return;
      }

      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Fejl ved sletning:", error);
    }
  };

  if (loading) {
    return <p className={styles.loading}>Loading...</p>;
  }

  return (
    <main className={styles.adminContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>{config.title}</h1>

        <Link href={`/admin/create/${type}`} className={styles.createButton}>
          ➕ Opret ny
        </Link>
      </div>

      <div className={styles.itemsGrid}>
        {items.map((item) => (
          <div key={item.id} className={styles.card}>
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

            <div className={styles.content}>
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
