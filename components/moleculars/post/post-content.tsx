import { getDictionary } from "@/lib/getDictionary";
import { getReadingTime, getRelativeDate } from "@/lib/helper";
import { Post } from "@/types/collection";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface PostContentProps {
  post: Post;
  isPostPage?: boolean;
  locale: string;
}

const PostContent = async ({
  post,
  isPostPage = false,
  locale,
}: PostContentProps) => {
  const dictionary = await getDictionary(locale);

  return (
    <div className="space-y-2">
      {/* tags  */}
      <div
        className={`flex flex-wrap items-center gap-2 text-neutral-400  ${
          isPostPage ? "text-sm" : "text-xs @md:text-sm"
        } `}
      >
        <div
          className={`font-medium  ${
            post.category.title === "Cities" ||
            post.category.title === "Kota-kota"
              ? "text-emerald-600"
              : "text-indigo-600"
          }`}
        >
          {post.category.title}
        </div>
        <div className="h-2 w-2  rounded-full bg-neutral-200" />
        <div className="">{`${post.author.first_name} ${post.author.last_name}`}</div>
        <div className="h-2 w-2 rounded-full bg-neutral-200" />
        <div className="">{getReadingTime(post.body, locale)}</div>
        <div className="h-2 w-2 rounded-full bg-neutral-200" />
        <div className="">{getRelativeDate(post.date_created, locale)}</div>
      </div>

      <h2
        className={`${
          isPostPage
            ? "text-2xl font-bold md:text-3xl lg:text-4xl"
            : "text-xl @md:text-2xl @lg:text-3xl"
        }  font-medium dark:text-neutral-300`}
      >
        {post.title}
      </h2>

      <p className="line-clamp-2 overflow-hidden text-base leading-snug text-neutral-600 @lg:text-lg">
        {`${post.description}`}
      </p>
      {!isPostPage && (
        <Link href={`/${locale}/post/${post.slug}`}>
          <div className="flex items-center gap-2 pt-3 transition-all duration-300 ease-in-out hover:gap-5">
            {dictionary.button.readMore} <ArrowRight size={14} />
          </div>
        </Link>
      )}
    </div>
  );
};

export default PostContent;
