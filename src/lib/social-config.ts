import { IconType } from 'react-icons';
import { FaTwitter, FaGithub, FaLinkedin, FaYoutube, FaInstagram, FaFacebook } from 'react-icons/fa';
import { MdContactPage, MdEmail } from "react-icons/md";

interface SocialNetworkEntry {
  link: string;
  icon: IconType;
}

type SocialNetwork = {
  [key: string]: SocialNetworkEntry;
}

export const socialConfig: SocialNetwork = {
  twitter: {
    link: "https://twitter.com/",
    icon: FaTwitter,
  },
  github: {
    link: "https://github.com/",
    icon: FaGithub,
  },
  linkedin: {
    link: "https://linkedin.com/in/",
    icon: FaLinkedin,
  },
  youtube: {
    link: "https://youtube.com/",
    icon: FaYoutube,
  },
  instagram: {
    link: "https://instagram.com/",
    icon: FaInstagram,
  },
  facebook: {
    link: "https://facebook.com/",
    icon: FaFacebook,
  },
  resume: {
    link: "/",
    icon: MdContactPage,
  },
  email: {
    link: "mailto:",
    icon: MdEmail,
  },
};
