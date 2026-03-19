import { PostCard } from "./post-card";
import type { PostCardData } from "../types";

export function PostList({ posts }: { posts: PostCardData[] }) {
  if (!posts.length) {
    return <p className="py-12 text-center font-serif text-lg text-[#999] italic">No posts yet.</p>;
  }
  return (
    <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((p) => (
        <PostCard key={p._id} post={p} />
      ))}
    </div>
  );
}
