import Image from "next/image";
import { notFound } from "next/navigation";

type CatImage = {
  id: string;
  url: string;
  width: number;
  height: number;
};

export default async function ImagePage({
  params,
}: {
  params: { imageid: string };
}) {
  const { imageid } = params;

  const res = await fetch(`https://api.thecatapi.com/v1/images/${imageid}`, {
    // avoid caching random ids forever in production
    cache: "no-store",
  });

  if (!res.ok) notFound();

  const image = (await res.json()) as CatImage;

  return (
    <div>
      <Image
        src={image.url}
        alt={image.id}
        width={image.width}
        height={image.height}
        priority
      />
    </div>
  );
}