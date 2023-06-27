import { Post } from "@/types/collection";
import Image from "next/image";
import Link from "next/link";
import PostContent from "./post-content";

interface PostProps {
  post: Post;
  layout?: "vertical" | "horizontal";
  reserve?: boolean;
}

const PostCard = ({
  post,
  layout = "horizontal",
  reserve = false,
}: PostProps) => {
  return (
    <Link
      className={`@container ${
        layout === "horizontal"
          ? "grid grid-cols-1 items-center gap-10 md:grid-cols-2"
          : "space-y-10"
      }`}
      href={`/post/${post.slug}`}
    >
      <Image
        className={`max-h-[300px] w-full rounded-md object-cover object-center ${
          reserve ? "md:order-last" : ""
        }`}
        src={post.image}
        alt={post.title}
        width={600}
        height={300}
      />
      <PostContent post={post} />
    </Link>
  );
};

export default PostCard;
