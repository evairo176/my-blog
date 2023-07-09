import siteConfig from "@/config/site";
import { getDictionary } from "@/lib/getDictionary";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navigation from "@/components/atoms/navigation/navigation";
import Footer from "@/components/atoms/navigation/footer";

const inter = Inter({ subsets: ["latin"] });

/* STATIC METADATA */
/* export const metadata: Metadata = {
  title: "Explorer",
  description:
    "A minimal and lovely travel blog which shares experiences and citiest around the world!",
}; */

export const generateMetadata = async ({
  params: { lang },
}: {
  params: { lang: string };
}) => {
  // Get the Dicitionary based on Lang
  const dicitionary = await getDictionary(lang);

  return {
    title: {
      template: "%s | " + siteConfig.siteName,
      default: siteConfig.siteName,
    },
    description: dicitionary.footer.description,
    openGraph: {
      title: siteConfig.siteName,
      description: dicitionary.footer.description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}`,
      siteName: siteConfig.siteName,
      images: [
        {
          url: "https://localhost:3000/opengraph-image.png",
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
