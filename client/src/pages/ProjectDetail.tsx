import { useParams } from "react-router-dom";
import PortfolioModal from "@/components/portfolio/PortfolioModal";
import { useGetProjectBySlugQuery } from "@/redux/services/portfolioApi";
import SEO from "@/components/common/seo/SEO";
import JsonLd from "@/components/common/seo/JsonLd";

const ProjectDetail = () => {
  const { slug } = useParams();
  const { data: project } = useGetProjectBySlugQuery(slug || "");

  if (!slug) {
    return null;
  }

  return (
    <>
      {project && (
        <>
          <SEO
            title={`${project.projectName} | Andrija Mićunović - Furniture Designer & 3D Artist`}
            description={project.description}
            url={`https://www.portfolio.andrijadesign.com/portfolio/${slug}`}
            siteName="Andrija Mićunović Portfolio"
            image={project.url}
            canonicalUrl={`https://www.portfolio.andrijadesign.com/portfolio/${slug}`}
          />
          <JsonLd pageType="project" pageData={project} />
        </>
      )}

      <PortfolioModal projectId={slug} />
    </>
  );
};

export default ProjectDetail;
