import axios from "axios";
import { Manga } from "mangadex-full-api";

const getPopular = async (): Promise<Manga[]> => {
  try {
    const currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - 1);
    const createdAtSince = currentDate.toISOString().slice(0, 19);
    return await Manga.search({
      includes: [],
      order: { followedCount: "desc" },
      authors: [],
      contentRating: ["suggestive", "safe"],
      hasAvailableChapters: true,
      createdAtSince: createdAtSince,
      limit: 10,
    });
  } catch (error) {
    throw new Error(error as any as string);
  }
};

const getLatestUpdate = async (): Promise<Manga[]> => {
  try {
    const attributes: { id: string; chapter: string; volume: string, updatedAt: Date }[] = [];
    const response = await axios.get(
      "https://api.mangadex.org/chapter?includes[]=scanlation_group&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&order[readableAt]=desc&limit=64"
    );
    const ids: string[] = response.data.data
      .map((chapter: any) => {
        return chapter.relationships
          .filter((relationship: any) => relationship.type === "manga")
          .map((relationship: any) => {
            attributes.push({
              id: relationship.id,
              chapter: chapter.attributes.chapter,
              volume: chapter.attributes.volume,
              updatedAt: chapter.attributes.updatedAt,
            });
            return relationship.id;
          });
      })
      .flat();

    const mangas = await Manga.search({
      ids: ids,
      contentRating: ["safe", "suggestive", "erotica", "pornographic"],
      includes: ["cover_art"],
      limit: 5,
    });

    mangas.forEach((manga, index) => {
      attributes.forEach((attribute) => {
        if (manga.id === attribute.id) {
          let lastChapter = "";
          const chapter = attribute.chapter
          const volume = attribute.volume;
          if(chapter && volume) {
            lastChapter = `Ch. ${attribute.chapter} Vol. ${attribute.volume}`;
          } if(chapter && !volume) {
            lastChapter = `Ch. ${attribute.chapter}`;
          } if(!chapter && volume) {
            lastChapter = `Vol. ${attribute.volume}`;
          }
          mangas[index].lastChapter = lastChapter;
          mangas[index].updatedAt = attribute.updatedAt;
        }
      });
    });
    return mangas;
  } catch (error) {
    throw new Error(error as any as string);
  }
};

const getManga = async (id: string) => {
  try {
    return await Manga.getByQuery({
      ids: [id]
    })
  } catch (error) {
    throw new Error(error as any as string);
  }
}

const getRecentlyAdded = async () => {
  try {
    return await Manga.search({
      includes: ["cover_art"],
      contentRating: ["safe", "suggestive", "erotica"],
      order: { createdAt: "desc" },
      limit: 15,
      hasAvailableChapters: true,
    });
  } catch (error) {
    throw new Error(error as any as string);
  }
};

const getCustomList = async (id: string) => {
  const url = `https://api.mangadex.org/list/${id}?includes[]=user`
  try {
    const response = await axios.get(url);
    const ids = response.data.data.relationships.map((id:any) => id.id);
    const manga = await Manga.search({
      ids: ids,
      limit: 15,
      includes:["cover_art"],
      contentRating: ["safe", "erotica", "pornographic", "suggestive"],
      order: {
        createdAt: "desc"
      }
    })
    return manga;

  } catch (error) {
    throw new Error(error as any as string);
  }
}

export { getPopular, getLatestUpdate, getRecentlyAdded, getManga, getCustomList };
