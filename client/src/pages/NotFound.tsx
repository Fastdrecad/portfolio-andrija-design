import { NavLink } from "react-router-dom";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import SEO from "@/components/common/seo/SEO";

const NotFound = () => {
  useDocumentTitle("Page not found");

  return (
    <>
      <SEO
        title="404 - Page Not Found | Andrija Mićunović"
        description="Oops! We can't seem to find the page you're looking for. Return to the homepage or explore the portfolio."
        url="https://www.portfolio.andrijadesign.com/404"
        siteName="Andrija Mićunović Portfolio"
        canonicalUrl="https://www.portfolio.andrijadesign.com/404"
        image="https://www.portfolio.andrijadesign.com/404-thumbnail.jpg"
      />

      <div className="not-found">
        <div id="moon">
          <div className="layer layer-1"></div>
          <div className="layer layer-2"></div>
          <div className="layer layer-3"></div>
          <div className="layer layer-4"></div>
          <div className="layer layer-5"></div>
          <div className="layer layer-6"></div>
        </div>
        <div className="not-found-text">
          <h1>
            <strong>404 </strong>
            <br />
            Oops! We can't seem to find the page you're looking for.
          </h1>
          <div>
            <h3>
              You can return to the{" "}
              <NavLink to="/design-process">Design Process Page</NavLink> or
              explore my <NavLink to="/portfolio">Portfolio</NavLink>
            </h3>
            <div className="button-wrapper">
              <NavLink to="/">Go Back</NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
