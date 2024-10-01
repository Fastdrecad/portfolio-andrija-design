// Links for website navigation
import {
  FaLinkedinIn,
  FaBehance,
  FaInstagram,
  FaYoutube
} from "react-icons/fa6";
import { SiUpwork } from "react-icons/si";

export const links = [
  { id: 1, text: "home", url: "/" },
  { id: 2, text: "portfolio", url: "/portfolio" },
  { id: 3, text: "design process", url: "/design-process" },
  { id: 4, text: "about", url: "/about" },
  { id: 5, text: "contact", url: "/contact" }
];

// Social media links with icons
export const socialLinks = [
  {
    id: 1,
    href: "https://www.linkedin.com/in/andrija-micunovic/",
    rel: "noreferrer",
    target: "_blank",
    icon: FaLinkedinIn
  },
  {
    id: 2,
    href: "https://www.upwork.com/freelancers/~01c4eea783cc73bf41",
    rel: "noreferrer",
    target: "_blank",
    icon: SiUpwork
  },
  {
    id: 3,
    href: "https://www.behance.net/Andrijas",
    rel: "noreferrer",
    target: "_blank",
    icon: FaBehance
  },
  {
    id: 4,
    href: "https://www.instagram.com/fastdrecad/",
    rel: "noreferrer",
    target: "_blank",
    icon: FaInstagram
  },
  {
    id: 5,
    href: "https://www.youtube.com/channel/UCAz40UjYzoUVc_MZurNI0yg?view_as=subscriber",
    rel: "noreferrer",
    target: "_blank",
    icon: FaYoutube
  }
];
