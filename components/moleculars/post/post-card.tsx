import { Post } from "@/types/collection";
import Image from "next/image";
import PostContent from "./post-content";

interface PostProps {
  post: Post;
  layout?: "vertical" | "horizontal";
  reverse?: boolean;
  locale: string;
}

const PostCard = async ({
  post,
  layout = "horizontal",
  reverse = false,
  locale,
}: PostProps) => {
  return (
    <div
      className={`@container ${
        layout === "horizontal"
          ? "grid grid-cols-1 items-center gap-10 md:grid-cols-2"
          : "space-y-10"
      } `}
    >
      <Image
        className={`max-h-[250px] rounded-md object-cover object-center ${
          reverse ? "md:order-last" : ""
        }`}
        src={`${process.env.NEXT_PUBLIC_ASSETS_URL}${post.image}`}
        alt={post.title}
        width={600}
        height={300}
        priority
      />
      <PostContent locale={locale} post={post} />
    </div>
  );
};

export default PostCard;
