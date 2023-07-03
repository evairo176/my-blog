import { DUMMY_CATEGORIES, DUMMY_POSTS } from "@/DUMMY_DATA";
import PaddingContainer from "@/components/atoms/layout/padding-container";
import PostList from "@/components/moleculars/post/post-list";
import directus from "@/lib/directus";
import { Post } from "@/types/collection";
import { notFound } from "next/navigation";

export const generateStaticParams = async () => {
  //   return DUMMY_CATEGORIES.map((category) => {
  //     return {
  //       category: category.slug,
  //     };
  //   });

  try {
    const categories = await directus.items("category").readByQuery({
      filter: {
        status: {
          _eq: "published",
        },
      },
      fields: ["slug"],
    });

    const params = categories?.data?.map((category) => {
      return {
        category: category.slug as string,
      };
    });

    return params || [];
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching categories");
  }
};

const Category = async ({
  params,
}: {
  params: {
    category: string;
  };
}) => {
  //   const category = DUMMY_CATEGORIES.find(
  //     (category) => category.slug === params.category
  //   );

  //   const posts = DUMMY_POSTS.filter(
  //     (post) => post.category.title.toLowerCase() === params.category
  //   );

  const getAllCategories = async () => {
    try {
      const category = await directus.items("category").readByQuery({
        filter: {
          slug: {
            _eq: params.category,
          },
        },
        fields: [
          "*",
          "post.*",
          "post.author.id",
          "post.author.first_name",
          "post.author.last_name",
          "post.category.id",
          "post.category.title",
        ],
      });
      return category?.data?.[0];
    } catch (error) {
      console.log(error);
      throw new Error("Error fetching categories");
    }
  };

  const category = await getAllCategories();

  if (!category) {
    notFound();
  }

  const typeCorrectedCategory = category as unknown as {
    id: string;
    title: string;
    slug: string;
    description: string;
    post: Post[];
  };

  return (
    <PaddingContainer>
      <div className="mb-10">
        <h1 className="text-4xl font-semibold dark:text-neutral-300">
          {typeCorrectedCategory?.title}
        </h1>
        <p className="text-lg text-neutral-600">
          {typeCorrectedCategory?.description}
        </p>
      </div>
      <PostList posts={typeCorrectedCategory.post} />
    </PaddingContainer>
  );
};

export default Category;
