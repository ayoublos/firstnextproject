import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }> | { id: string };
};

export default async function AnimeDetailsPage({ params }: PageProps) {
  // Next may pass `params` as a Promise (Next 15+) or a plain object; normalize both.
  const { id } = await Promise.resolve(params);

  if (!id || id === "undefined") {
    notFound();
  }

  const res = await fetch(`https://api.jikan.moe/v4/anime`);


  if (!res.ok) {
    return (
      <div className="mx-auto w-full max-w-3xl px-4 py-6">
        <a href="/anime" className="text-sm underline">
          Back
        </a>
        <h1 className="mt-4 text-2xl font-semibold">Anime not found</h1>
      </div>
    );
  }

  const json = await res.json();
  console.log(json,"this is the json");
  const numberId = parseInt(id);
  const anime = json.data.find((anime: any) => anime.mal_id === numberId);
  console.log(anime,"this is the anime");

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-6">
      <a href="/anime" className="text-sm underline">
        Back to list
      </a>

      <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-[240px_1fr]">
        <div className="overflow-hidden rounded-xl border border-black/10 bg-white p-3 dark:border-white/10 dark:bg-black/40">
          <img
            src={anime.images?.jpg?.large_image_url ?? anime.images?.jpg?.image_url}
            alt={anime.title}
            className="h-auto w-full rounded-lg object-cover"
          />
        </div>

        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {anime.title}
          </h1>
          {anime.title_english ? (
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
              {anime.title_english}
            </p>
          ) : null}

          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            {anime.score ? (
              <span className="rounded-full border border-black/10 bg-white px-3 py-1 dark:border-white/10 dark:bg-black/40">
                Score: {anime.score}
              </span>
            ) : null}
            {anime.episodes ? (
              <span className="rounded-full border border-black/10 bg-white px-3 py-1 dark:border-white/10 dark:bg-black/40">
                Episodes: {anime.episodes}
              </span>
            ) : null}
            {anime.status ? (
              <span className="rounded-full border border-black/10 bg-white px-3 py-1 dark:border-white/10 dark:bg-black/40">
                {anime.status}
              </span>
            ) : null}
            {anime.year ? (
              <span className="rounded-full border border-black/10 bg-white px-3 py-1 dark:border-white/10 dark:bg-black/40">
                Year: {anime.year}
              </span>
            ) : null}
          </div>

          {anime.synopsis ? (
            <p className="mt-4 whitespace-pre-line leading-relaxed text-zinc-800 dark:text-zinc-100">
              {anime.synopsis}
            </p>
          ) : null}

          {Array.isArray(anime.genres) && anime.genres.length ? (
            <div className="mt-6">
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Genres
              </h2>
              <div className="mt-2 flex flex-wrap gap-2 text-sm">
                {anime.genres.map((g: any) => (
                  <span
                    key={g.mal_id}
                    className="rounded-full bg-zinc-100 px-3 py-1 text-zinc-800 dark:bg-white/10 dark:text-zinc-100"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

