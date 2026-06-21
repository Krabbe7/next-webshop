"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./editDeliveriesPage.module.css";

export default function DeliveriesAdminPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);
  const [deliveries, setDeliveries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserAndLoad = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.replace("/");
        return;
      }

      const res = await fetch("http://localhost:5000/api/users/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok || data.user.role !== "admin") {
        router.replace("/");
        return;
      }

      const deliveriesRes = await fetch(
        "http://localhost:5000/api/deliveryMethods",
      );

      const deliveriesData = await deliveriesRes.json();

      setDeliveries(deliveriesData);
      setLoading(false);
    };

    checkUserAndLoad();
  }, []);

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    await fetch(`http://localhost:5000/api/deliveryMethods/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    router.push("/admin");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <main className={styles.editDeliveriesPageContainer}>
      <h1>Leveringsmetoder</h1>

      <Link href="/admin/create-delivery">➕ Opret ny levering</Link>

      <br />
      <br />

      <div className={styles.deliveryGrid}>
        {deliveries.map((delivery) => (
          <div key={delivery.id} className={styles.editDeliveryContainer}>
            <h3>{delivery.name}</h3>

            <p>{delivery.price} kr.</p>

            <Link href={`/admin/edit-delivery-method/${delivery.id}`}>
              ✏️ Rediger
            </Link>
            <button type="button" onClick={handleDelete}>
              Slet leveringsmetode
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
