// Define the structure of HistoryParams, which will be used to add user history
interface HistoryParams {
  title: string;
  pages: number;
  current_page: number;
  user_id: string;
  readed_at: Date;
  chapter_id?: string;
  cover: string;
  chapter: number | null;
  volume: number | null;
  author: string;
}
