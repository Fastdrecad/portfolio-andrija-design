import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

// Custom hook to set the document title based on the current path
const useDocumentTitle = (defaultTitle: string) => {
  const location = useLocation();
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    const setTitle = () => {
      switch (location.pathname) {
        case "/":
          document.title = "Home | Andrija Mićunović Design";
          break;
        case "/portfolio":
          document.title = "Portfolio | Andrija Mićunović Design";
          break;
        case "/design-process":
          document.title = "Design Process | Andrija Mićunović Design";
          break;
        case "/about":
          document.title = "About | Andrija Mićunović Design";
          break;
        case "/contact":
          document.title = "Contact | Andrija Mićunović Design";
          break;
        case "/success":
          document.title = "Submission Successful | Andrija Mićunović Design";
          break;
        case `/portfolio/${slug}`:
          document.title = `Project | ${slug}`;
          break;
        case "/not-found":
          document.title =
            "Oops! 404 - Page Not Found | Andrija Mićunović Design";
          break;
        default:
          document.title =
            "Oops! 404 - Page Not Found | Andrija Mićunović Design";
      }
    };

    setTitle();

    return () => {
      document.title = defaultTitle;
    };
  }, [location, defaultTitle, slug]);
};

export default useDocumentTitle;
