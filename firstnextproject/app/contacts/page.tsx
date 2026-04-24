import Link from "next/link";

export default async function ContactsPage() {
  const res = await fetch("https://api.thecatapi.com/v1/images/search?limit=10");
  const images = await res.json();
  return (
    <div>
      {images.map((item: any) => (
        <div key={item.id}>
          <Link href={`/contacts/${item.id}`}>
            <img
              src={item.url}
              alt={item.id}
              width={item.width}
              height={item.height}
              style={{ cursor: "pointer" }}
            />
          </Link>
        </div>
      ))}
    </div>
  );
}