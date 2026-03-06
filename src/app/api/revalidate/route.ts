import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (secret !== process.env.REVALIDATE_SECRET)
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const tag = body?.tag ?? "all";
  revalidateTag(tag, "all");
  revalidatePath("/", "layout");
  return NextResponse.json({ revalidated: true, tag, now: Date.now() });
}
