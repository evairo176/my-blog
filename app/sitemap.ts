import directus from "@/lib/directus";
import { MetadataRoute } from "next";
import { format } from "date-fns";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseURL = process.env.NEXT_PUBLIC_SITE_URL as string;

  // Get Posts
  const posts = await directus.items("post").readByQuery({
    fields: ["slug", "date_updated"],
  });

  const postLinks = posts?.data?.map((post) => {
    return [
      {
        url: `${baseURL}/en/post/${post.slug}`,
        lastModified: format(new Date(post.date_updated), "yyyy-MM-dd"),
      },
      {
        url: `${baseURL}/id/post/${post.slug}`,
        lastModified: format(new Date(post.date_updated), "yyyy-MM-dd"),
      },
      {
        url: `${baseURL}/post/${post.slug}`,
        lastModified: format(new Date(post.date_updated), "yyyy-MM-dd"),
      },
    ];
  });

  // Get Categories
  const categories = await directus.items("category").readByQuery({
    fields: ["slug", "date_updated"],
  });

  const categoryLinks = categories?.data?.map((category) => {
    return [
      {
        url: `${baseURL}/en/${category.slug}`,
        lastModified: format(new Date(), "yyyy-MM-dd"),
      },
      {
        url: `${baseURL}/id/${category.slug}`,
        lastModified: format(new Date(), "yyyy-MM-dd"),
      },
      {
        url: `${baseURL}/${category.slug}`,
        lastModified: format(new Date(), "yyyy-MM-dd"),
      },
    ];
  });

  const dynamicLinks = postLinks?.concat(categoryLinks ?? []).flat() ?? [];

  return [
    {
      url: baseURL,
      lastModified: format(new Date(), "yyyy-MM-dd"),
    },
    {
      url: `${baseURL}/en`,
      lastModified: format(new Date(), "yyyy-MM-dd"),
    },
    {
      url: `${baseURL}/id`,
      lastModified: format(new Date(), "yyyy-MM-dd"),
    },
    ...dynamicLinks,
  ];
}
