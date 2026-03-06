import { Link } from "@/i18n/routing";
import { formatDate } from "@/lib/utils/format";
import type { PostCardData } from "../types";
export function PostCard({ post }: { post: PostCardData }) {
  return (
    <article>
      <Link href={`/blog/${post.slug}`}>
        <h2>{post.title}</h2>
        {post.excerpt && <p>{post.excerpt}</p>}
        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
      </Link>
    </article>
  );
}
