// import { DUMMY_POSTS } from "@/DUMMY_DATA";
import CtaCard from "@/components/atoms/elements/cta-card";
import SocialLink from "@/components/atoms/elements/social-link";
import PaddingContainer from "@/components/atoms/layout/padding-container";
import PostBody from "@/components/moleculars/post/post-body";
import PostHero from "@/components/moleculars/post/post-hero";
import directus from "@/lib/directus";
import { notFound } from "next/navigation";

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
      };
    });

    return params || [];
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
  };
}) => {
  // const post = DUMMY_POSTS.find((post) => post.slug === params.slug);

  const getPostData = async () => {
    try {
      const post = await directus.items("post").readByQuery({
        filter: {
          slug: {
            _eq: params.slug,
          },
        },
        fields: [
          "*",
          "category.id",
          "category.title",
          "author.id",
          "author.first_name",
          "author.last_name",
        ],
      });

      return post?.data?.[0];
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching posts");
    }
  };

  const post = await getPostData();

  if (!post) {
    notFound();
  }

  return (
    <PaddingContainer>
      <div className="space-y-10">
        <PostHero post={post} />
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
      <CtaCard />
    </PaddingContainer>
  );
};

export default Post;
