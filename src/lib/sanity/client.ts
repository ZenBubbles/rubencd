import { createClient, type QueryParams } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
if (!projectId) throw new Error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID");
export const sanityClient = createClient({
  projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: "2025-01-01",
  useCdn: process.env.NODE_ENV === "production",
  stega: { studioUrl: "/studio" },
});
export async function fetchSanity<T>(query: string, params?: QueryParams): Promise<T> {
  return sanityClient.fetch<T>(query, params ?? {});
}
