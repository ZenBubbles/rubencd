import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
interface PostBodyProps {
  content: PortableTextBlock[];
}
export function PostBody({ content }: PostBodyProps) {
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <PortableText value={content} />
    </div>
  );
}
