import { DUMMY_POSTS } from "@/DUMMY_DATA";
import CtaCard from "@/components/atoms/elements/cta-card";
import SocialLink from "@/components/atoms/elements/social-link";
import PaddingContainer from "@/components/atoms/layout/padding-container";
import PostBody from "@/components/moleculars/post/post-body";
import PostHero from "@/components/moleculars/post/post-hero";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
  return DUMMY_POSTS.map((post) => {
    return {
      slug: post.slug,
    };
  });
};

const Post = ({
  params,
}: {
  params: {
    slug: string;
  };
}) => {
  const post = DUMMY_POSTS.find((post) => post.slug === params.slug);

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
