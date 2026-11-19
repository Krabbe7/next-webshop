import { OrderSummary } from "../../components/orderSummary/OrderSummary";
import { PropsSucess } from "./types";
import { cookies } from "next/headers";
import styles from "../../checkout.module.css";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000";

export default async function SuccessPage({ params }: PropsSucess) {
  const { id } = await params;

  const cookieStore = await cookies();

  const res = await fetch(`${API_URL}/api/orders/${id}`, {
    cache: "no-store",
    headers: { cookie: cookieStore.toString() },
  });
  if (!res.ok) {
    return (
      <div className="pageContainer">
        <h1 className="pageTitle">Ordren blev ikke fundet</h1>
      </div>
    );
  }

  const order = await res.json();

  const cart = order.items.map((item: any) => ({
    id: item.id,
    title: item.quantity > 1 ? `${item.title} x ${item.quantity}` : item.title,
    image_url: item.image_url,
    price: Number(item.price) * item.quantity,
  }));

  return (
    <div className="pageContainer">
      <h1 className="pageTitle">Tak for din ordre</h1>

      <div className={styles.checkoutGrid}>
        <div className={styles.formSection}>
          <section className={styles.card}>
            <h2>Ordrebekræftelse</h2>

            <div className={styles.confirmationInfo}>
              <p>
                <span className={styles.confirmationLabel}>Ordrenummer:</span> #
                {order.id}
              </p>

              <p>
                <span className={styles.confirmationLabel}>Leveres til:</span>{" "}
                {order.street_address}, {order.postal_code} {order.city}
              </p>
              <p>
                <span className={styles.confirmationLabel}>
                  Leveringsmetode:
                </span>{" "}
                {order.delivery_method}
              </p>

              {order.pickup_point_name && (
                <p>
                  <span className={styles.confirmationLabel}>Afhentes i:</span>{" "}
                  {order.pickup_point_name}, {order.pickup_point_address}
                </p>
              )}
            </div>
          </section>
        </div>

        <aside className={styles.summarySection}>
          <OrderSummary
            cart={cart}
            subtotal={Number(order.subtotal)}
            shipping={Number(order.shipping_price)}
            total={Number(order.total_price)}
            pickup={
              order.pickup_point_name ? { name: order.pickup_point_name } : null
            }
          />
        </aside>
      </div>
    </div>
  );
}
