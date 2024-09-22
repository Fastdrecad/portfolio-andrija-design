// required parameter to fetch images
export const urlEndpoint = "https://ik.imagekit.io/2o7xtkfrs";

import {
  FaLinkedinIn,
  FaBehance,
  FaInstagram,
  FaYoutube
} from "react-icons/fa6";
import { SiUpwork } from "react-icons/si";

export const links = [
  {
    id: 1,
    text: "home",
    url: "/"
  },
  {
    id: 2,
    text: "portfolio",
    url: "/portfolio"
  },
  {
    id: 3,
    text: "design process",
    url: "/design-process"
  },
  {
    id: 4,
    text: "about",
    url: "/about"
  },
  {
    id: 5,
    text: "contact",
    url: "/contact"
  }
];

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

export const inputs = [
  {
    id: 1,
    name: "firstName",
    type: "text",
    placeholder: "First Name",
    errorMessage:
      "First Name shold be minimum 3-15 characters and shouldn't include any special character ",
    label: "First Name",
    pattern: "^[A-Za-z0-9]{3,15}$",
    required: true
  },
  {
    id: 2,
    name: "lastName",
    type: "text",
    placeholder: "Last Name",
    errorMessage:
      "Last Name shold be minimum 3-15 characters and shouldn't include any special character ",
    label: "Last Name",
    pattern: "^[A-Za-z0-9]{3,15}$",
    required: true
  },
  {
    id: 3,
    name: "email",
    type: "email",
    placeholder: "Email",
    errorMessage: "Please input a valid email",
    label: "Email",
    pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
    required: true
  },
  {
    id: 4,
    name: "message",
    type: "textarea",
    placeholder: "Message",
    errorMessage: "Message must be between 10 and 300 characters.",
    label: "Message",
    minLength: 10,
    maxLength: 300,
    required: true
  }
];
