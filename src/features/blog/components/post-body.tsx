import { PortableText } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

interface PostBodyProps {
  content: PortableTextBlock[];
}

export function PostBody({ content }: PostBodyProps) {
  return (
    <div className="prose prose-lg prose-headings:font-serif prose-headings:font-medium prose-headings:text-[#1a1a1a] prose-p:font-light prose-p:leading-[1.8] prose-p:text-[#525252] prose-a:text-[#12271d] prose-a:underline-offset-4 prose-blockquote:border-l-[#12271d] prose-blockquote:font-serif prose-blockquote:text-xl prose-blockquote:font-light prose-blockquote:italic prose-blockquote:text-[#525252] max-w-none">
      <PortableText value={content} />
    </div>
  );
}
