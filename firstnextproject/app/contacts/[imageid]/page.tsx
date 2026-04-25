export default async function ImagePage({
  params,
}: {
  params: { imageid: string };
}) {
  const { imageid } = params;

  function getImage(imageid: string) {
    return fetch(`https://api.thecatapi.com/v1/images/${imageid}`);
  }
  const res = await fetch(`https://api.thecatapi.com/v1/images/${1}`);


  if (!res.ok) {
    return (
      <div>
        <h1>Image {imageid}</h1>
        <p>Not found.</p>
      </div>
    );
  }

  const image: { id: string; url?: string; width?: number; height?: number } =
    await res.json();
    console.log(image);

  return (
    <div>
      <h1>Image {imageid}</h1>
      {image.url ? (
        <img
          src={image.url}
          alt={image.id ?? imageid}
          width={image.width}
          height={image.height}
        />
      ) : (
        <p>No image URL returned.</p>
      )}
    </div>
  );
}