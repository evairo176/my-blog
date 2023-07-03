import { Post } from "@/types/collection";
import PostContent from "./post-content";
import Image from "next/image";

interface postHeroProps {
  post: Post;
  locale: string;
}

const PostHero = ({ post, locale }: postHeroProps) => {
  return (
    <div>
      <PostContent locale={locale} isPostPage post={post} />
      <Image
        className="mt-6 h-[300px] rounded-md object-cover object-center md:h-[500px]"
        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.image}`}
        width={1200}
        height={500}
        priority={true}
        alt={post.title}
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
};

export default PostHero;
