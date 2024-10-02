import { Link, useNavigate, useParams } from "react-router-dom";

import { generateSlug } from "@/utils/slugUtils";

import ModalContent from "@/components/common/Modal/ModalContent";

import { portfolio } from "@/data";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import { useDispatch } from "react-redux";
import { setCurrentRoute } from "@/redux/routeSlice";
import { AnimatePresence } from "framer-motion";
import SEO from "@/components/common/seo/SEO";
import JsonLd from "@/components/common/seo/JsonLd";

const ProjectDetail: React.FC = () => {
  const dispatch = useDispatch();

  const { slug } = useParams<{ slug: string }>();
  const project = portfolio.find((p) => generateSlug(p.projectName) === slug);
  useDocumentTitle(project?.projectName || "");

  const navigate = useNavigate();

  if (!project) {
    return <Link to="/not-found"></Link>;
  }

  const handleClose = () => {
    navigate("/portfolio");

    dispatch(setCurrentRoute("/portfolio"));
  };

  // Create the SEO metadata for the project
  const seoData = {
    title: `${project.projectName} | Andrija Mićunović - Furniture Designer & 3D Artist`,
    description: project.description,
    url: `https://www.portfolio.andrijadesign.com/portfolio/${slug}`,
    siteName: "Andrija Mićunović Portfolio",
    image: project.url,
    canonicalUrl: `https://www.portfolio.andrijadesign.com/portfolio/${slug}`
  };

  return (
    <>
      <SEO
        title={seoData.title}
        description={seoData.description}
        url={seoData.url}
        siteName={seoData.siteName}
        image={seoData.image}
        canonicalUrl={seoData.canonicalUrl}
      />

      <JsonLd pageType="project" pageData={project} />

      <AnimatePresence initial={false} onExitComplete={() => null} mode="wait">
        <ModalContent
          projectId={project.id}
          isModal={false}
          onClose={handleClose}
        />
      </AnimatePresence>
    </>
  );
};

export default ProjectDetail;
