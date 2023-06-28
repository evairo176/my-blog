import { Post } from "@/types/collection";
import Image from "next/image";
import Link from "next/link";
import PostContent from "./post-content";

interface PostProps {
  post: Post;
  layout?: "vertical" | "horizontal";
  reverse?: boolean;
}

const PostCard = ({
  post,
  layout = "horizontal",
  reverse = false,
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
        className={`max-h-[250px] rounded-md object-cover object-center   ${
          reverse ? "md:order-last" : ""
        }`}
        src={post.image}
        alt={post.title}
        width={600}
        height={0}
      />
      <PostContent post={post} />
    </div>
  );
};

export default PostCard;
