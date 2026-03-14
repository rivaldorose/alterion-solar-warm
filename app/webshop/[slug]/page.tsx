interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;

  return (
    <>
      {/* PLAK HIER JE STITCH HTML */}
      {/* slug: {slug} */}
    </>
  );
}
