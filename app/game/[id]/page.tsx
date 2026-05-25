import Image from "next/image";

async function getGame(id: string) {
  const response = await fetch(`http://localhost:5000/api/games/${id}`, {
    next: {
      revalidate: 3600, // 1 time cache
    },
  });

  if (!response.ok) {
    throw new Error("Spil ikke fundet");
  }

  return response.json();
}

export default async function GamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const game = await getGame(id);
  console.log(game.image_url);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>{game.title}</h1>
      {game.image_url && (
        <Image src={game.image_url} alt={game.title} width={400} height={500} />
      )}
      <p>{game.description}</p>

      <p>
        <b>Genre:</b> {game.genre}
      </p>

      <p>
        <b>Platform:</b> {game.platform}
      </p>

      <p>
        <b>Pris:</b> {game.price} kr.
      </p>
    </main>
  );
}
