import { Post } from "@/types/collection";
import PostContent from "./post-content";
import Image from "next/image";

interface postHeroProps {
  post: Post;
}

const PostHero = ({ post }: postHeroProps) => {
  return (
    <div>
      <PostContent isPostPage post={post} />
      <Image
        className="mt-6 h-[300px] rounded-md object-cover object-center md:h-[500px]"
        src={post.image}
        width={1200}
        height={500}
        alt={post.title}
      />
    </div>
  );
};

export default PostHero;
