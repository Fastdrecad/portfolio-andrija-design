import { Helmet } from "react-helmet-async";

import { PortfolioItemType } from "@/types/portfolioTypes";
import { DesignProcessStep } from "@/types/designProcessTypes";
import { ContactData } from "@/types/contactTypes";

interface JsonLdProps {
  pageType:
    | "home"
    | "portfolio"
    | "project"
    | "about"
    | "contact"
    | "design-process";
  pageData?:
    | PortfolioItemType[]
    | PortfolioItemType
    | DesignProcessStep[]
    | ContactData
    | null;
}

const JsonLd: React.FC<JsonLdProps> = ({ pageType, pageData }) => {
  let jsonLd = {};

  switch (pageType) {
    case "home":
      // Schema for Home page
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Andrija Mićunović Portfolio",
        "url": "https://www.portfolio.andrijadesign.com",
        "description":
          "Showcase of Andrija Mićunović's professional work in furniture design and 3D art.",
        "author": {
          "@type": "Person",
          "name": "Andrija Mićunović",
          "url": "https://www.portfolio.andrijadesign.com",
          "sameAs": [
            "https://www.instagram.com/fastdrecad/",
            "https://www.linkedin.com/in/andrija-micunovic/",
            "https://www.behance.net/Andrijas"
          ]
        },
        "mainEntityOfPage": "https://www.portfolio.andrijadesign.com"
      };
      break;

    case "portfolio":
      if (
        Array.isArray(pageData) &&
        (pageData as PortfolioItemType[])[0]?.projectName
      ) {
        jsonLd = {
          "@context": "https://schema.org",
          "@type": "ItemList",
          "name": "Portfolio of Andrija Mićunović",
          "url": "https://www.portfolio.andrijadesign.com/portfolio",
          "itemListElement": (pageData as PortfolioItemType[]).map(
            (item: PortfolioItemType, index: number) => ({
              "@type": "ListItem",
              "position": index + 1,
              "url": item.url,
              "name": item.projectName,
              "description": item.description,
              "category": item.category
            })
          )
        };
      }
      break;

    case "project":
      // Check if pageData has project-specific properties
      if (pageData && "projectName" in pageData && !Array.isArray(pageData)) {
        const project = pageData as PortfolioItemType;
        jsonLd = {
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          "name": project.projectName,
          "description": project.description,
          "image": project.items[0]?.url || "", // Use the first image or fallback
          "url": project.url,
          "author": {
            "@type": "Person",
            "name": "Andrija Mićunović"
          },
          "keywords": project.category || ""
        };
      }
      break;

    case "design-process":
      if (
        Array.isArray(pageData) &&
        (pageData as DesignProcessStep[])[0]?.process
      ) {
        jsonLd = {
          "@context": "https://schema.org",
          "@type": "HowTo",
          "name": "Design Process",
          "description": "Steps in the design process by Andrija Mićunović",
          "url": "https://www.portfolio.andrijadesign.com/design-process",
          "step": (pageData as DesignProcessStep[]).map(
            (step: DesignProcessStep) => ({
              "@type": "HowToStep",
              "name": step.process,
              "description": step.desc,
              "image": step.img,
              "position": step.id
            })
          )
        };
      }
      break;

    case "about":
      // Schema for About page
      jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Andrija Mićunović",
        "jobTitle": "Furniture Designer & 3D Artist",
        "worksFor": {
          "@type": "Organization",
          "name": "Andrija Design"
        },
        "url": "https://www.portfolio.andrijadesign.com",
        "sameAs": [
          "https://www.instagram.com/fastdrecad/",
          "https://www.linkedin.com/in/andrija-micunovic/",
          "https://www.behance.net/Andrijas"
        ]
      };
      break;

    case "contact":
      // Check if pageData has contact-specific properties
      if (pageData && "telephone" in pageData && !Array.isArray(pageData)) {
        const contact = pageData as ContactData;
        jsonLd = {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "url": "https://www.portfolio.andrijadesign.com/contact",
          "contactType": "Customer Support",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": contact.telephone,
            "contactType": contact.contactType,
            "areaServed": contact.areaServed,
            "availableLanguage": "English"
          }
        };
      }
      break;

    default:
      break;
  }

  return (
    <Helmet>
      {/* Inject the generated JSON-LD schema into the page */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};

export default JsonLd;
