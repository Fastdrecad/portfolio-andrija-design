import { portfolio } from "@/data";

export const jsonLd = {
  "@context": "http://schema.org",
  "@type": "WebSite",
  "name": "Portfolio of Andrija Mićunović",
  "description":
    "A detailed look into Andrija Mićunović's professional furniture and product design projects, showcasing creativity and precision in every design.",
  "url": "https://www.portfolio.andrijadesign.com/portfolio",
  "mainEntity": portfolio.map((item) => ({
    "@type": "CreativeWork",
    "name": item.projectName,
    "description": item.title,
    "image": item.url,
    "url": item.url,
    "author": {
      "@type": "Person",
      "name": "Andrija Mićunović"
    },
    "keywords": item.tags?.join(", ") || ""
  }))
};
