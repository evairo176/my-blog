import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const SocialLink = ({
  platform,
  link,
  isShareURL = false,
}: {
  platform: string;
  link: string;
  isShareURL?: boolean;
}) => {
  const getIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return <Facebook size={12} />;
      case "github":
        return <Github size={12} />;
      case "linkedin":
        return <Linkedin size={12} />;
      case "twitter":
        return <Twitter size={12} />;
      case "instagram":
        return <Instagram size={12} />;
      default:
        return;
    }
  };

  return (
    <Link href={link}>
      <div
        className={
          isShareURL
            ? "rounded-md bg-neutral-200 px-3 py-2 text-neutral-600 transition-colors duration-100 hover:bg-neutral-600 hover:text-neutral-100"
            : ""
        }
      >
        {getIcon(platform)}
      </div>
    </Link>
  );
};

export default SocialLink;
