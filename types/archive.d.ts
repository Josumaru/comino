// Define the structure of ArchiveParams, which will be used to add user history
interface ArchiveParams {
    title: string;
    created_at: Date;
    manga_id?: string;
    user_id: string;
    cover: string;
    author: string;
    rating: number;
    synopsis: string;
  }
  