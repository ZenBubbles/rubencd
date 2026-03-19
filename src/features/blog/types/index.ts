export interface CategoryData {
  title: string;
  slug: string;
}

export interface PostCardData {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string;
  excerpt?: string;
  estimatedReadingTime: number;
  categories: CategoryData[];
  mainImage?: {
    asset?: { _ref: string };
    hotspot?: { x: number; y: number };
  };
}
export interface PostData extends PostCardData {
  body: unknown[];
}
