import { Post } from "@/types/collection";
import Image from "next/image";
import Link from "next/link";
import PostContent from "./post-content";

interface PostProps {
  post: Post;
}

const PostCard = ({ post }: PostProps) => {
  return (
    <Link
      className="grid grid-cols-2 items-center gap-10"
      href={`/post/${post.slug}`}
    >
      <Image
        className="max-h-[300px] w-full rounded-md object-cover object-center"
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
