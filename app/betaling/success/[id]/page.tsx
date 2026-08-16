type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SuccessPage({ params }: Props) {
  const { id } = await params;

  return (
    <main>
      <h1 className="title">Tak for din ordre 🎉</h1>
      <p>Ordrenummer: #{id}</p>
    </main>
  );
}
