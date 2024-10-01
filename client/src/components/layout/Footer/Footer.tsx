import { Link } from "react-router-dom";

import Socials from "@/components/layout/Socials";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer__ellipses" />
      <div className="footer__container">
        <Socials containerStyles="social-icons" iconStyles="icon-style" />
        <div className="footer__copyright">
          <Link
            to="https://www.andrijadesign.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            <p>
              Designed & Built by Andrija Mićunović
              <br /> © {new Date().getFullYear()}
            </p>
          </Link>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
