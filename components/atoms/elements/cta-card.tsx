import Image from "next/image";

const CtaCard = () => {
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
          Explore the world with me
        </h3>
        <p className="mt-3 max-w-lg text-lg">
          Explore the world with me, I'm travelling around the 🌎. I've visited
          most of the great cities of 🇮🇩 and currently I'm travelling in 🇬🇸 Join
          me
        </p>
        <form action="" className="mt-6 flex items-center gap-2">
          <input
            type="text"
            placeholder="write your email"
            className="w-full rounded-md bg-white/80 px-3 py-2 text-base outline-none ring-neutral-600 placeholder:text-sm focus:ring-2 md:w-auto"
          />
          <button className="whitespace-nowrap rounded-md bg-neutral-900 px-3 py-2 text-neutral-200 hover:bg-neutral-700 ">
            Sign up
          </button>
        </form>
      </div>
    </div>
  );
};

export default CtaCard;
