import Image from "next/image";

interface ArticleAuthorProps {
  date?: string;
  dark?: boolean;
}

export function ArticleAuthor({ date, dark = false }: ArticleAuthorProps) {
  return (
    <div className="flex items-center gap-4">
      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full">
        <Image
          src="/images/hero.png"
          alt="Ruben Christoffer Damsgaard"
          width={200}
          height={200}
          sizes="44px"
          className="absolute top-0 left-1/2 h-auto w-[180%] max-w-none -translate-x-1/2"
        />
      </div>
      <div>
        <p className={`text-sm font-medium ${dark ? "text-white" : "text-[#1a1a1a]"}`}>
          Ruben Christoffer Damsgaard
        </p>
        {date && <p className={`text-xs ${dark ? "text-white/40" : "text-[#999]"}`}>{date}</p>}
      </div>
    </div>
  );
}
