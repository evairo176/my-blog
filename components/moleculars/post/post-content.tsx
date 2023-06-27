import { Post } from "@/types/collection";
import { ArrowRight } from "lucide-react";

interface PostContentProps {
  post: Post;
}

const PostContent = ({ post }: PostContentProps) => {
  return (
    <div className="space-y-2">
      {/* tags  */}
      <div className="flex items-center gap-2 text-sm text-neutral-400">
        <div
          className={`font-medium ${
            post.category.title === "Cities"
              ? "text-emerald-600"
              : "text-indigo-600"
          }`}
        >
          {post.category.title}
        </div>
        <div className="h-2 w-2 rounded-full bg-neutral-200" />
        <div>{`${post.author.first_name} ${post.author.last_name}`}</div>
        <div className="h-2 w-2 rounded-full bg-neutral-200" />
        <div>1 min read</div>
        <div className="h-2 w-2 rounded-full bg-neutral-200" />
        <div>1 month ago</div>
      </div>
      <h2 className="text-3xl font-medium">{post.title}</h2>
      <p className=" leading-snug text-neutral-600">{post.description}</p>
      <div className="flex items-center gap-2 pt-3">
        Read More <ArrowRight size={14} />
      </div>
    </div>
  );
};

export default PostContent;
