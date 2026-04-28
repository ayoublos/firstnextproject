export default async function Anime() {
    const anime=await fetch('https://api.jikan.moe/v4/anime');
    const animeList = await anime.json();
    console.log(animeList);
    return (
        <div>
            {animeList.data.map((anime: any) => (
                <div key={anime.mal_id}>
                    <h1>{anime.title}</h1>
                    <img src={anime.images.jpg.image_url} alt={anime.title} />
                </div>
            ))}
        </div>
    )
}