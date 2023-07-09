// import { DUMMY_POSTS } from "@/DUMMY_DATA";
import CtaCard from "@/components/atoms/elements/cta-card";
import PaddingContainer from "@/components/atoms/layout/padding-container";
import PostCard from "@/components/moleculars/post/post-card";
import PostList from "@/components/moleculars/post/post-list";
import directus from "@/lib/directus";
import { getDictionary } from "@/lib/getDictionary";
import { notFound } from "next/navigation";

export default async function Home({
  params,
}: {
  params: {
    lang: string;
  };
}) {
  console.log(params);
  const getAllData = async () => {
    try {
      const post = await directus.items("post").readByQuery({
        fields: [
          "*",
          "author.id",
          "author.first_name",
          "author.last_name",
          "category.id",
          "category.title",
          "category.translations.*",
          "translations.*",
        ],
      });

      if (params.lang === "en") {
        return post.data;
      } else {
        const localesPost = post?.data?.map((post) => {
          return {
            ...post,
            title: post.translations[0].title,
            description: post.translations[0].description,
            body: post.translations[0].body,
            category: {
              ...post.category,
              title: post.category.translations[0].title,
              description: post.category.translations[0].description,
            },
          };
        });

        // console.log(localesPost);

        return localesPost;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const posts = await getAllData();
  // console.log(posts);

  if (!posts) {
    notFound();
  }

  const dictionary = await getDictionary(params.lang);

  return (
    <PaddingContainer>
      <main className="h-auto space-y-10">
        <PostCard locale={params.lang} post={posts[0]} />
        <PostList
          locale={params.lang}
          posts={posts.filter((_post, index) => index > 0 && index < 3)}
          layout="vertical"
        />
        <CtaCard dictionary={dictionary} />
        <PostCard locale={params.lang} reverse post={posts[3]} />
        <PostList
          locale={params.lang}
          posts={posts.filter((_post, index) => index > 3 && index < 6)}
          layout="vertical"
        />
      </main>
    </PaddingContainer>
  );
}
