export interface SiteConfig {
  siteName: string;
  description: string;
  currentlyAt: string;
  socialLink: {
    github: string;
    website: string;
    facebook: string;
    linkedin: string;
  };
}

const siteConfig: SiteConfig = {
  siteName: "Explorer",
  description:
    "A minimal and lovely travel blog which shares experiences and cities around the world!",
  currentlyAt: "Jakarta",
  socialLink: {
    github: "https://github.com/evairo176",
    website: "https://evairo-portofolio.vercel.app/",
    facebook:
      "https://www.facebook.com/profile.php?id=100008224712736&mibextid=ZbWKwL",
    linkedin: "https://www.linkedin.com/in/dicki-prasetya-3a7587195",
  },
};

export default siteConfig;
