"use client";

import { useCallback, useEffect, useState } from "react";

import type { Order, OrderItem } from "../../types";

export function useOrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/orders/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Kunne ikke hente ordrer");
      }

      const data = await res.json();

      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return {
    orders,
    loading,
    refetch: fetchOrders,
  };
}
