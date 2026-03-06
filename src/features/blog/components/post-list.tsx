import { PostCard } from "./post-card";
import type { PostCardData } from "../types";
export function PostList({ posts }: { posts: PostCardData[] }) {
  if (!posts.length) return <p className="text-neutral-500">No posts yet.</p>;
  return (
    <ul className="flex flex-col gap-8">
      {posts.map((p) => (
        <li key={p._id}>
          <PostCard post={p} />
        </li>
      ))}
    </ul>
  );
}
