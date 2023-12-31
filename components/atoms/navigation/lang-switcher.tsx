"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const LangSwithcer = ({ locale }: { locale: string }) => {
  const targetLanguage = locale === "en" ? "id" : "en";
  const pathname = usePathname();
  const redirectTarget = () => {
    if (!pathname) return "/";

    const segments = pathname.split("/");
    segments[1] = targetLanguage;
    return segments.join("/");
  };
  // come
  return (
    <Link
      className="flex items-center gap-1 font-semibold"
      locale={targetLanguage}
      href={redirectTarget()}
    >
      {targetLanguage.toUpperCase()}
      <span>{targetLanguage === "en" ? "🇬🇧" : "🇮🇩"}</span>
    </Link>
  );
};

export default LangSwithcer;
