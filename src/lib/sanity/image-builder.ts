import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { sanityClient } from "./client";
const builder = createImageUrlBuilder(sanityClient);
export const urlFor = (source: SanityImageSource) => builder.image(source);
// <Image src={urlFor(post.mainImage).width(800).height(450).url()} ... />
