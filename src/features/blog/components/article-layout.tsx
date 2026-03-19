interface ArticleLayoutProps {
  children: React.ReactNode;
}

export function ArticleLayout({ children }: ArticleLayoutProps) {
  return (
    <article className="mx-auto max-w-3xl px-6 pt-28 pb-16 md:pt-36 md:pb-24">{children}</article>
  );
}
