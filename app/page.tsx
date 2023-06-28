import { DUMMY_POSTS } from "@/DUMMY_DATA";
import CtaCard from "@/components/atoms/elements/cta-card";
import PaddingContainer from "@/components/atoms/layout/padding-container";
import PostCard from "@/components/moleculars/post/post-card";
import PostList from "@/components/moleculars/post/post-list";

export default function Home() {
  return (
    <PaddingContainer>
      <main className="h-auto space-y-10">
        <PostCard post={DUMMY_POSTS[0]} />
        <PostList
          posts={DUMMY_POSTS.filter((_post, index) => index > 0 && index < 3)}
          layout="vertical"
        />
        <CtaCard />
        <PostCard reverse post={DUMMY_POSTS[3]} />
        <PostList
          posts={DUMMY_POSTS.filter((_post, index) => index > 3 && index < 6)}
          layout="vertical"
        />
      </main>
    </PaddingContainer>
  );
}
