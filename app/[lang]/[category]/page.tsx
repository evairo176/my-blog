import { DUMMY_CATEGORIES, DUMMY_POSTS } from "@/DUMMY_DATA";
import PaddingContainer from "@/components/atoms/layout/padding-container";
import PostList from "@/components/moleculars/post/post-list";
import directus from "@/lib/directus";
import { Post } from "@/types/collection";
import { notFound } from "next/navigation";
import { cache } from "react";

export const generateMetadata = async ({
  params: { category, lang },
}: {
  params: {
    category: string;
    lang: string;
  };
}) => {
  const categoryData = await getAllCategories(category, lang);

  return {
    title: categoryData?.title,
    description: categoryData?.description,
  };
};

const getAllCategories = cache(async (categorySlug: string, locale: string) => {
  try {
    const category = await directus.items("category").readByQuery({
      filter: {
        slug: {
          _eq: categorySlug,
        },
      },
      fields: [
        "*",
        "translations.*",
        "post.*",
        "post.author.id",
        "post.author.first_name",
        "post.author.last_name",
        "post.category.id",
        "post.category.title",
        "post.translations.*",
      ],
    });

    if (locale === "en") {
      return category?.data?.[0];
    } else {
      const fetchCategory = category?.data?.[0];

      return {
        ...fetchCategory,
        title: fetchCategory?.translations[0].title,
        description: fetchCategory?.translations[0].description,
        post: fetchCategory?.post?.map((post: any) => {
          return {
            ...post,
            title: post.translations[0].title,
            description: post.translations[0].description,
            body: post.translations[0].body,
            category: {
              ...post.category,
              title: fetchCategory.translations[0].title,
              description: fetchCategory.translations[0].description,
            },
          };
        }),
      };
    }
  } catch (error) {
    console.log(error);
    throw new Error("Error fetching categories");
  }
});

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
        lang: "en",
      };
    });

    const localisedParams = categories?.data?.map((category) => {
      return {
        category: category.slug as string,
        lang: "id",
      };
    });

    const allParams = params?.concat(localisedParams ?? []);

    return allParams || [];
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
    lang: string;
  };
}) => {
  //   const category = DUMMY_CATEGORIES.find(
  //     (category) => category.slug === params.category
  //   );

  //   const posts = DUMMY_POSTS.filter(
  //     (post) => post.category.title.toLowerCase() === params.category
  //   );

  const locale = params.lang;
  const categorySlug = params.category;

  const category = await getAllCategories(categorySlug, locale);

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
      <PostList locale={params.lang} posts={typeCorrectedCategory.post} />
    </PaddingContainer>
  );
};

export default Category;
