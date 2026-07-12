"use client";

export function useSaveRating() {
  const saveRating = async (gameId: number, rating: number) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`http://localhost:5000/api/rating/${gameId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        rating,
      }),
    });

    const data = await res.json();

    console.log("Status:", res.status);
    console.log("Response:", data);

    if (!res.ok) {
      throw new Error(data.message || "Kunne ikke gemme rating");
    }

    return data;

    return res.json();
  };

  return {
    saveRating,
  };
}
