export interface PostCardData {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt?: string;
  estimatedReadingTime: number;
  categories: string[];
}
export interface PostData extends PostCardData {
  body: unknown[];
  mainImage?: unknown;
}
