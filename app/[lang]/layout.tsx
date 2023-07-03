import Navigation from "@/components/atoms/navigation/navigation";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/atoms/navigation/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My Blog and Portofolios",
  description:
    "Welcome to my personal blog and portfolio showcase! This platform serves as a creative outlet for me to share my thoughts, experiences, and projects with the world. Whether you're looking for insightful articles, captivating stories, or a glimpse into my professional work, you'll find it all here. Join me on this journey as I explore various topics, showcase my skills, and engage with a diverse community of reader",
};

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: {
    lang: string;
  };
}) {
  return (
    <html lang={lang}>
      <body className={`${inter.className} dark:bg-black`}>
        <Navigation locale={lang} />
        <div className="min-h-[calc(100vh - 300px)] pt-10">{children}</div>
        <Footer locale={lang} />
      </body>
    </html>
  );
}