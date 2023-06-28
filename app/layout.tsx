import Navigation from "@/components/atoms/navigation/navigation";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/atoms/navigation/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} dark:bg-black`}>
        <Navigation />
        <div className="pt-10">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
