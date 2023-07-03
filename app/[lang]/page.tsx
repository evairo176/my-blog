// import { DUMMY_POSTS } from "@/DUMMY_DATA";
import CtaCard from "@/components/atoms/elements/cta-card";
import PaddingContainer from "@/components/atoms/layout/padding-container";
import PostCard from "@/components/moleculars/post/post-card";
import PostList from "@/components/moleculars/post/post-list";
import directus from "@/lib/directus";
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
        ],
      });

      return post.data;
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching posts");
    }
  };

  const posts = await getAllData();
  // console.log(posts);

  if (!posts) {
    notFound();
  }

  return (
    <PaddingContainer>
      <main className="h-auto space-y-10">
        <PostCard locale={params.lang} post={posts[0]} />
        <PostList
          locale={params.lang}
          posts={posts.filter((_post, index) => index > 0 && index < 3)}
          layout="vertical"
        />
        <CtaCard locale={params.lang} />
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
