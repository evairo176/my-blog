import Navigation from "@/components/atoms/navigation/navigation";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/atoms/navigation/footer";
import { Metadata } from "next";
import { getDictionary } from "@/lib/getDictionary";
import siteConfig from "@/config/site";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "My Blog and Portofolios",
//   description:
//     "Welcome to my personal blog and portfolio showcase! This platform serves as a creative outlet for me to share my thoughts, experiences, and projects with the world. Whether you're looking for insightful articles, captivating stories, or a glimpse into my professional work, you'll find it all here. Join me on this journey as I explore various topics, showcase my skills, and engage with a diverse community of reader",
//   verification: {
//     google: "8xnhMuMJZnHzVBeWXO6w0Tt9AuOvkc8XpKP3DYOjNGk",
//   },
// };

export const generateMetadata = async ({
  params: { lang },
}: {
  params: {
    lang: string;
  };
}) => {
  const dictionary = await getDictionary(lang);

  return {
    title: {
      template: "%s | " + siteConfig.siteName,
      default: siteConfig.siteName,
    },
    description: dictionary.footer.description,
    openGraph: {
      title: siteConfig.siteName,
      description: dictionary.footer.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}`,
      siteName: siteConfig.siteName,
      images: [
        {
          url: "https://localhost:3001/opengraph-image.png",
          width: 1200,
          height: 628,
        },
      ],
      locale: lang,
      type: "website",
    },
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}`,
      languages: {
        "en-US": `${process.env.NEXT_PUBLIC_SITE_URL}/en`,
        "id-ID": `${process.env.NEXT_PUBLIC_SITE_URL}/id`,
      },
    },
    /* Verification for Google Search Console */
    verification: {
      google: "8xnhMuMJZnHzVBeWXO6w0Tt9AuOvkc8XpKP3DYOjNGk",
    },
  };
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
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-0MH6Y144Y6"
      ></Script>
      <Script id="google-analytics">
        {`  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-0MH6Y144Y6');`}
      </Script>
      <body className={`${inter.className} dark:bg-black`}>
        <Navigation locale={lang} />
        <div className="min-h-[calc(100vh - 300px)] pt-10">{children}</div>
        <Footer locale={lang} />
      </body>
    </html>
  );
}
