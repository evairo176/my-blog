// import { DUMMY_POSTS } from "@/DUMMY_DATA";
import CtaCard from "@/components/atoms/elements/cta-card";
import SocialLink from "@/components/atoms/elements/social-link";
import PaddingContainer from "@/components/atoms/layout/padding-container";
import PostBody from "@/components/moleculars/post/post-body";
import PostHero from "@/components/moleculars/post/post-hero";
import siteConfig from "@/config/site";
import directus from "@/lib/directus";
import { getDictionary } from "@/lib/getDictionary";
import { notFound } from "next/navigation";
import { cache } from "react";

export const generateMetadata = async ({
  params: { slug, lang },
}: {
  params: {
    slug: string;
    lang: string;
  };
}) => {
  const post = await getPostData(slug, lang);

  return {
    title: post?.title,
    description: post?.description,
    openGraph: {
      title: post?.title,
      description: post?.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/post/${slug}`,
      siteName: siteConfig.siteName,
      // images: [
      //   {
      //     url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/post/${slug}/opengraph-image.png`,
      //     width: 1200,
      //     height: 628,
      //   },
      // ],
      locale: lang,
      type: "website",
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/post/${slug}`,
      languages: {
        "en-US": `${process.env.NEXT_PUBLIC_SITE_URL}/en/post/${slug}`,
        "id-ID": `${process.env.NEXT_PUBLIC_SITE_URL}/id/post/${slug}`,
      },
    },
  };
};

export const getPostData = cache(async (postSlug: string, locale: string) => {
  try {
    const post = await directus.items("post").readByQuery({
      filter: {
        slug: {
          _eq: postSlug,
        },
      },
      fields: [
        "*",
        "category.id",
        "category.title",
        "author.id",
        "author.first_name",
        "author.last_name",
        "translations.*",
        "category.translations.*",
      ],
    });

    const dataPost = post?.data?.[0];

    // console.log({ locale });

    if (locale === "en") {
      // console.log(dataPost);
      return dataPost;
    } else {
      return {
        ...dataPost,
        title: dataPost?.translations[0]?.title,
        description: dataPost?.translations[0]?.description,
        body: dataPost?.translations[0]?.body,
        category: {
          ...dataPost?.category,
          title: dataPost?.category?.translations[0]?.title,
          description: dataPost?.category?.translations[0]?.description,
        },
      };
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching posts");
  }
});

export const generateStaticParams = async () => {
  // return DUMMY_POSTS.map((post) => {
  //   return {
  //     slug: post.slug,
  //   };
  // });

  try {
    const posts = await directus.items("post").readByQuery({
      filter: {
        status: {
          _eq: "published",
        },
      },
      fields: ["slug"],
    });

    const params = posts?.data?.map((post) => {
      return {
        slug: post.slug as string,
        lang: "en",
      };
    });

    const localisedParams = posts?.data?.map((post) => {
      return {
        slug: post.slug as string,
        lang: "id",
      };
    });

    const allParams = params?.concat(localisedParams ?? []);

    return allParams || [];
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching posts");
  }
};

const Post = async ({
  params,
}: {
  params: {
    slug: string;
    lang: string;
  };
}) => {
  // const post = DUMMY_POSTS.find((post) => post.slug === params.slug);

  const locale = params.lang;
  const postSlug = params.slug;

  const post = await getPostData(postSlug, locale);

  // for google
  const jsonld = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post?.title,
    image: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/post/${postSlug}/opengraph-image.png`,
    author: post.author.first_name + post.author.last_name,
    genre: post.category.title,
    // keywords: "seo sales b2b",
    // wordcount: "1120",
    publisher: siteConfig.siteName,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/post/${postSlug}`,
    // mainEntityOfPage: {
    //   "@type": "WebPage",
    //   "@id": "https://google.com/article",
    // },
    datePublished: new Date(post.date_created).toISOString(),
    dateCreated: new Date(post.date_created).toISOString(),
    dateModified: new Date(post.date_updated).toISOString(),
    description: post.description,
    articleBody: post.body,
  };

  if (!post) {
    notFound();
  }

  const dictionary = await getDictionary(locale);

  return (
    <PaddingContainer>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonld) }}
      />
      <div className="space-y-10">
        <PostHero locale={params.lang} post={post} />
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="relative">
            <div className="sticky top-20  flex items-center gap-5   md:flex-col">
              <div className="font-medium md:hidden">Share this content</div>
              <SocialLink
                isShareURL
                platform="facebook"
                link={`https://www.facebook.com/sharer/sharer.php?u=${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}
              />
              <SocialLink
                isShareURL
                platform="twitter"
                link={`https://www.twitter.com/intent/tweet?url=${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}
              />
              <SocialLink
                isShareURL
                platform="linkedin"
                link={`https://www.linkedin.com/shareArticle?mini=true&url=${process.env.NEXT_PUBLIC_SITE_URL}/post/${post.slug}`}
              />
            </div>
          </div>
          <PostBody body={post.body} />
        </div>
      </div>
      <div className="p-2" />
      <CtaCard dictionary={dictionary} />
    </PaddingContainer>
  );
};

export default Post;
