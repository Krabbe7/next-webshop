// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import styles from "./editGamesPage.module.css";

// export default function AdminPage() {
//   const router = useRouter();

//   const [games, setGames] = useState([]);

//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user") || "null");

//     if (!user || user.role !== "admin") {
//       router.replace("/");
//       return;
//     }

//     setLoading(false);
//   }, []);

//   async function fetchGames() {
//     const res = await fetch("http://localhost:5000/api/games");

//     const data = await res.json();

//     setGames(data);
//   }

//   return (
//     <main className={styles.editGamesPageContainer}>
//       <h1>Admin Panel</h1>

//       <Link href="/admin/create">➕ Opret nyt spil</Link>

//       <br />
//       <br />

//       {games.map((game: any) => (
//         <div key={game.id} className={styles.editGameContainer}>
//           <h3>{game.title}</h3>

//           <Link href={`/admin/edit/${game.id}`}>✏️ Edit</Link>
//         </div>
//       ))}
//     </main>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

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
      const res = await fetch("http://localhost:5000/api/users/me", {
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
      {user.role === "admin" ? (
        <div>
          <h2>Admin panel</h2>

          <Link href="/admin/create">➕ Opret spil</Link>
          <br />
          <Link href="/admin">🎮 Gå til admin games</Link>
        </div>
      ) : (
        <div>
          <h2>Bruger side</h2>
          <p>Du er normal bruger</p>
        </div>
      )}
    </main>
  );
}
