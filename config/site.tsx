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
  siteName: "My Blog and Portofolios",
  description:
    "Welcome to my personal blog and portfolio showcase! This platform serves as a creative outlet for me to share my thoughts, experiences, and projects with the world. Whether you're looking for insightful articles, captivating stories, or a glimpse into my professional work, you'll find it all here. Join me on this journey as I explore various topics, showcase my skills, and engage with a diverse community of reader!",
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
