import { Facebook, Github, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";

const SocialLink = ({ platform, link }: { platform: string; link: string }) => {
  const getIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return <Facebook size={12} />;
      case "github":
        return <Github size={12} />;
      case "linkedin":
        return <Linkedin size={12} />;
      case "instagram":
        return <Instagram size={12} />;
      default:
        return;
    }
  };

  return <Link href={link}>{getIcon(platform)}</Link>;
};

export default SocialLink;
