// "use client";
import Link from "next/link";
import PaddingContainer from "../layout/padding-container";
import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { getDictionary } from "@/lib/getDictionary";
import LangSwithcer from "./lang-switcher";

const Navigation = async ({ locale }: { locale: string }) => {
  //   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  //   const toggleMobileMenu = () => {
  //     setIsMobileMenuOpen(!isMobileMenuOpen);
  //   };

  const dictionary = await getDictionary(locale);

  return (
    <>
      {/* <div className="flex">
  
        <button
          id="mobileMenuButton"
          className="text-gray-300 hover:text-white focus:text-white focus:outline-none sm:hidden"
          onClick={toggleMobileMenu}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

       
        <aside
          className={`fixed inset-0 z-50 w-64 transform bg-gray-800 text-white transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          } sm:hidden`}
        >
          <div className="flex h-16 items-center justify-between px-4">
            <span className="text-xl font-bold">Menu</span>
            <button
              className="text-gray-300 hover:text-white focus:outline-none"
              onClick={toggleMobileMenu}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <nav className="px-4 py-2">
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="block rounded-md px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block rounded-md px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block rounded-md px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block rounded-md px-3 py-2 text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  Login
                </a>
              </li>
            </ul>
          </nav>
        </aside>

      
        <div className="flex-1">eef</div>
      </div> */}

      <div className="sticky left-0 right-0 top-0 z-[999] border-b bg-white bg-opacity-70 backdrop-blur-md dark:border-none dark:bg-black">
        <PaddingContainer>
          <div className="flex items-center justify-between py-5">
            {/* <button
              id="mobileMenuButton"
              className="flex text-neutral-800 hover:text-neutral-400 focus:text-neutral-400 focus:outline-none md:hidden"
              onClick={toggleMobileMenu}
            >
              <MenuIcon />
            </button> */}
            <Link
              className="text-lg font-bold dark:text-neutral-600"
              href={`/${locale}`}
            >
              Explorer
            </Link>
            <nav className="">
              {/* <nav className="hidden md:flex"> */}
              <ul className="flex items-center gap-4 text-neutral-500">
                {/* <ul className="items-center gap-4 text-neutral-500 md:flex"> */}
                <li>
                  <LangSwithcer locale={locale} />
                </li>
                <li>
                  <Link href={`/${locale}/cities`}>
                    {dictionary.navigation.links.cities}
                  </Link>
                </li>
                <li>
                  <Link href={`/${locale}/experiences`}>
                    {dictionary.navigation.links.experiences}
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </PaddingContainer>
      </div>
      {/* <aside
        className={`fixed inset-0 z-[1000] w-64 transform border-b bg-white bg-opacity-70 backdrop-blur-md transition-transform duration-300 ease-in-out dark:border-none dark:bg-black ${
          isMobileMenuOpen ? "translate-y-0" : "-translate-y-full"
        } md:hidden`}
      >
        <div className=" h-16  px-4 py-4 text-right">
          <button
            className="text-gray-300 hover:text-neutral-400 focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <nav className="px-4 py-2" onClick={toggleMobileMenu}>
          <PaddingContainer>
            <ul className="space-y-3">
              <li>
                <Link href="/cities" className="text-neutral-800">
                  Cities
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="text-neutral-800">
                  Experiences
                </Link>
              </li>
            </ul>
          </PaddingContainer>
        </nav>
      </aside> */}
    </>
  );
};

export default Navigation;
