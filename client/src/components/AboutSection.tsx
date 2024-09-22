import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentRoute } from "../redux/routeSlice";
import ImageKit from "./ImageKit";
import { SignatureSvg } from "@components/SignatureSvg";

const AboutSection: React.FC = () => {
  const { ref: ref1, inView: titleIsVisible } = useInView();

  const dispatch = useDispatch();

  const handleNavLinkClick = (url: string) => {
    dispatch(setCurrentRoute(url));
  };

  return (
    <div className="about-section">
      <div className="about-section__container">
        <div className="about-section__part">
          <div className="about-section__content">
            <div className="about-section__fixed-wrapper">
              <div className="about-section__sticky-parent">
                <div className="about-section__pen-image">
                  <ImageKit
                    path="/images/pen-image.png"
                    alt="Digital drawing pen and holder, typically used with graphic tablets for design work."
                  />
                </div>
              </div>
            </div>
            <div className="about-section__text">
              <h3
                ref={ref1}
                className={`about-section__title ${
                  titleIsVisible ? "fade-in" : ""
                }`}
              >
                Andrija
                <strong className="bold-title">Mićunović</strong>
              </h3>
              <div
                ref={ref1}
                className={`about-section__desc ${
                  titleIsVisible ? "fade-in" : ""
                }`}
              >
                <h2 style={{ fontSize: "2rem" }}>
                  Welcome to the world of innovative design
                </h2>
                <p>
                  I help clients transform their ideas into reality by
                  specializing in Furniture & Product Design, 3D Modeling, 3D
                  Rendering, and 2D/3D CAD, ensuring both precision and
                  creativity in every project. With over two decades of
                  experience and expertise in SOLIDWORKS, Inventor, AutoCAD, 3ds
                  Max, and V-Ray, I deliver high-quality, photorealistic
                  renderings for interiors, exteriors, and product
                  visualizations, as well as detailed 3D models and 2D technical
                  drawings tailored to your needs.
                </p>
                <hr style={{ margin: "3.5rem 0" }} />

                <h2 style={{ fontSize: "2rem", margin: "2rem 0" }}>
                  Technical Expertise:
                </h2>
                <ul>
                  <li>
                    <strong>CAD Modeling:</strong> Proficient in AutoCAD,
                    Inventor, and SOLIDWORKS, I deliver precise, functional
                    designs for both 2D and 3D projects.
                  </li>
                  <li>
                    <strong>Visualization and Rendering:</strong> With expertise
                    in 3ds Max, V-Ray, Corona, Photoshop, and Illustrator, I
                    create lifelike renderings to communicate your vision with
                    precision.
                  </li>
                  <li>
                    <strong>Product Development:</strong> Specialized in
                    physical product design and development, I ensure that your
                    furniture and product designs are both innovative and
                    practical.
                  </li>
                </ul>
                <hr style={{ margin: "3.5rem 0" }} />

                <h2 style={{ fontSize: "2rem", margin: "2rem 0" }}>
                  Key Offerings:
                </h2>
                <ul>
                  <li>
                    <strong>Quality & Precision: </strong>
                    My detailed, accurate models and renders are crafted to meet
                    the highest standards.
                  </li>
                  <li>
                    <strong> Reliable Collaboration: </strong> I prioritize
                    long-term partnerships built on consistent performance and
                    communication.
                  </li>
                  <li>
                    <strong>Effective Communication: </strong> Available around
                    the clock for prompt replies and regular updates.
                  </li>
                  <li>
                    <strong>Timely Delivery: </strong>I deliver top-quality work
                    within your timeline and budget, ensuring seamless project
                    execution.
                  </li>
                  <li>
                    <strong>Streamlined Workflow: </strong> Using advanced
                    tools, I provide clean, organized files ready for production
                    or presentation.
                  </li>
                </ul>
                <hr style={{ margin: "3.5rem 0" }} />

                <h2 style={{ fontSize: "2rem", margin: "2rem 0" }}>
                  Portfolio Highlights
                </h2>
                <p>
                  I’ve partnered with esteemed clients like StreetForms,
                  ergoCentric, Holdenart, and Project Direct, showcasing a wide
                  range of successful collaborations. Each project highlights my
                  ability to push boundaries and exceed expectations in design,
                  functionality, and visual appeal.
                </p>
                <hr style={{ margin: "3.5rem 0" }} />

                <h2 style={{ fontSize: "2rem", margin: "2rem 0" }}>
                  Proven Expertise:
                </h2>
                <ul>
                  <li>
                    Over 20 years of experience in furniture design, interior
                    and exterior visualization, and product development.
                  </li>

                  <li>
                    180+ five-star reviews and a 100% job success score on
                    Upwork.
                  </li>
                  <li>
                    Top-Rated Plus Freelancer on Upwork with a Skill
                    Certification in 3D Modeling and over 3,000 hours of
                    completed projects.
                  </li>
                </ul>
                <hr style={{ margin: "3.5rem 0" }} />

                <h2 style={{ fontSize: "2rem", margin: "2rem 0" }}>
                  My Workflow:
                </h2>
                <p>
                  Please check the{" "}
                  <Link
                    to="/design-process"
                    onClick={() => handleNavLinkClick("/design-process")}
                  >
                    design process
                  </Link>{" "}
                  for more details.
                </p>
                <hr style={{ margin: "3.5rem 0" }} />

                <h2 style={{ fontSize: "2rem", margin: "2rem 0" }}>
                  Let’s Elevate Your Vision:
                </h2>
                <p>
                  Whether you represent an established company, a startup, or
                  are an individual with a visionary concept, I’m here to bring
                  your furniture and product projects to life with stunning 3D
                  visualizations and technical drawings. Together, we can
                  achieve breathtaking results.
                </p>
                <br />
                <h2 style={{ fontSize: "2rem", margin: "2rem 0" }}>
                  Ready to get started?
                </h2>
                <p>
                  <a href="mailto:andrija@andrijadesign.com?subject=Project%20Inquiry&body=Contact%20me%20to%20share%20a%20brief%20description%20of%20your%20project%2C%20and%20let's%20make%20your%20vision%20a%20reality.">
                    Contact me
                  </a>{" "}
                  to share a brief description of your project, and let's make
                  your vision a reality.
                </p>
                <br />
              </div>
            </div>

            <div className="about-section__signature">
              <SignatureSvg />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
