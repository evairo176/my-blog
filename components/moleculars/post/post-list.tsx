import { Post } from "@/types/collection";
import PostCard from "./post-card";

interface PostListProps {
  posts: Post[];
  layout?: "vertical" | "horizontal";
}

const PostList = ({ posts, layout = "vertical" }: PostListProps) => {
  return (
    <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:auto-cols-fr lg:grid-flow-col">
      {posts?.map((row) => {
        return <PostCard layout={layout} key={row.id} post={row} />;
      })}
    </div>
  );
};

export default PostList;
