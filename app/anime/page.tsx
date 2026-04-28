import Link from "next/link";

export default async function Anime() {
  const res = await fetch("https://api.jikan.moe/v4/anime");
  const animeList = await res.json();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6">
      <h1 className="mb-4 text-2xl font-semibold tracking-tight">Anime</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {animeList.data.map((anime: any) => (
          <Link
            key={anime.mal_id}
            href={`/anime/${anime.mal_id}`}
            className="group block rounded-xl border border-black/10 bg-white p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-black/40"
          >
            <div className="aspect-[3/4] overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900">
              <img
                src={anime.images?.jpg?.image_url}
                alt={anime.title}
                className="h-full w-full object-cover transition group-hover:scale-[1.02]"
                loading="lazy"
              />
            </div>
            <h2 className="mt-3 line-clamp-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
              {anime.title}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}