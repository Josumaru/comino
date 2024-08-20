import axios from "axios";
import { Manga } from "mangadex-full-api";

const baseUrl = "https://api.mangadex.org";

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
    const response = await axios.get(
      "https://api.mangadex.org/chapter?includes[]=scanlation_group&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&order[readableAt]=desc&limit=64"
    );
    const ids: string[] = response.data.data.map((chapter: any) => {
      return chapter.relationships
        .filter((relationship: any) => relationship.type === "manga")
        .map((relationship: any) => relationship.id);
    }).flat();

    return await Manga.search({
      ids: ids,
      contentRating: ["safe", "suggestive", "erotica", "pornographic"],
      includes: ["cover_art"],
      limit: 5,
    });
  } catch (error) {
    throw new Error(error as any as string);
  }
};

const getRecentlyAdded = async () => {
  return await Manga.search({
    includes: ["cover_art"],
    contentRating: ["safe", "suggestive", "erotica"],
    order: { createdAt: "desc" },
    limit: 15,
    hasAvailableChapters: true,
  });
};

const getCover = async (id: string) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${baseUrl}/cover/${id}/`,
    });
    return response.data.data;
  } catch (error) {
    throw new Error(error as any as string);
  }
};

export { getPopular, getCover, getLatestUpdate, getRecentlyAdded };
