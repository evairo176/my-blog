import directus from "@/lib/directus";
import { getDictionary } from "@/lib/getDictionary";
import { revalidateTag } from "next/cache";
import Image from "next/image";

const CtaCard = async ({ locale }: { locale: string }) => {
  const dictionary = await getDictionary(locale);

  const formAction = async (formData: FormData) => {
    "use server";

    try {
      const email = formData.get("email");

      //   console.log(email);
      await directus.items("subscribers").createOne({
        email,
      });

      revalidateTag("subscribers-count");

      //   console.log(cek);
    } catch (error) {
      console.log(error);
    }
  };

  const subscribersCount = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}items/subscribers?meta=total_count&access_token=${process.env.ADMIN_TOKEN}`,
    {
      next: {
        tags: ["subscribers-count"],
      },
    }
  )
    .then((res) => res.json())
    .then((res) => res.meta.total_count)
    .catch((error) => {
      console.log(error);
    });

  return (
    <div className="relative overflow-hidden rounded-md bg-slate-100 px-6 py-10">
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-white/95 via-white/70 to-white/30" />
      <Image
        fill
        className="object-cover object-center"
        src="https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixid=MnwzODU2NTF8MHwxfHNlYXJjaHw2fHxOZXclMjBZb3J8ZW58MHx8fHwxNjcwMjUzMzMw&ixlib=rb-4.0.3"
        alt="CTA card image"
      />
      <div className="relative z-20">
        <div className="text-lg font-medium">#ExplorerTheWorld</div>
        <h3 className="mt-3 text-4xl font-semibold">
          {dictionary.ctaCard.title}
        </h3>
        <p className="mt-3 max-w-lg text-lg">
          {dictionary.ctaCard.description}
        </p>
        <form
          key={subscribersCount + "subscribers-form"}
          action={formAction}
          className="mt-6 flex items-center gap-2"
        >
          <input
            type="email"
            name="email"
            placeholder={dictionary.ctaCard.placeholder}
            className="w-full rounded-md bg-white/80 px-3 py-2 text-base outline-none ring-neutral-600 placeholder:text-sm focus:ring-2 md:w-auto"
          />
          <button className="whitespace-nowrap rounded-md bg-neutral-900 px-3 py-2 text-neutral-200 hover:bg-neutral-700 ">
            {dictionary.ctaCard.button}
          </button>
        </form>

        <div className="mt-5 text-neutral-700">
          {dictionary.ctaCard.subscribersText1}{" "}
          <span className="rounded-md bg-neutral-700 px-2 py-1 text-sm text-neutral-100">{`${subscribersCount}`}</span>{" "}
          {dictionary.ctaCard.subscribersText2}
        </div>
      </div>
    </div>
  );
};

export default CtaCard;
