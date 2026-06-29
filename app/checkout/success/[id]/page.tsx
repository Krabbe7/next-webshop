export default function SuccessPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return (
    <main>
      <h1>Tak for din ordre 🎉</h1>
      <p>Ordrenummer: #{params.id}</p>
    </main>
  );
}
