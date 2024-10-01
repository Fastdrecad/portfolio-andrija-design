import RedLine from "@/components/common/RedLine";
import { forwardRef } from "react";

import { Link } from "react-router-dom";

interface AboutContentProps {
  titleIsVisible: boolean;
}

export const AboutContent = forwardRef<HTMLDivElement, AboutContentProps>(
  ({ titleIsVisible }, ref) => (
    <div className="about-section__text" ref={ref}>
      <div
        ref={ref}
        className={`about-section__desc ${titleIsVisible ? "fade-in" : ""}`}
      >
        <RedLine isVisible={titleIsVisible} iconVariant="start">
          <h3 className="about-section__title ">
            Andrija <strong className="bold-title">Mićunović</strong>
          </h3>
        </RedLine>
        <ContentBlocks />
      </div>
    </div>
  )
);

const ContentBlocks: React.FC = () => (
  <>
    <ContentBlock title="Welcome to the world of innovative design">
      <p>
        I provide tailor-made solutions to companies across the globe, ensuring
        each project sets a new benchmark. With every design, I push boundaries
        and always put quality first, delivering results that speak for
        themselves.
      </p>
      <p>
        I help clients transform their ideas into reality by offering innovative
        design solutions in Furniture & Product Design, 3D Modeling, Rendering,
        and 2D/3D CAD. With over two decades of experience, I deliver
        high-quality, photorealistic renderings, detailed 3D models, and
        technical drawings.
      </p>
    </ContentBlock>

    <ContentBlock title="Technical Expertise:">
      <ul>
        <li>
          <strong>CAD Modeling:</strong> Proficient in AutoCAD, Inventor, and
          SOLIDWORKS, I deliver precise, functional designs for both 2D and 3D
          projects.
        </li>
        <li>
          <strong>Visualization and Rendering:</strong> With expertise in 3ds
          Max, V-Ray, Corona, Photoshop, and Illustrator, I create lifelike
          renderings to communicate your vision with precision.
        </li>
        <li>
          <strong>Product Development:</strong> Specialized in physical product
          design and development, I ensure that your furniture and product
          designs are both innovative and practical.
        </li>
      </ul>
    </ContentBlock>

    <ContentBlock title="Key Offerings:">
      <ul>
        <li>
          <strong>Quality & Precision:</strong> My detailed, accurate models and
          renders are crafted to meet the highest standards.
        </li>
        <li>
          <strong>Reliable Collaboration:</strong> I prioritize long-term
          partnerships built on consistent performance and communication.
        </li>
        <li>
          <strong>Effective Communication:</strong> Available around the clock
          for prompt replies and regular updates.
        </li>
        <li>
          <strong>Timely Delivery:</strong> I deliver top-quality work within
          your timeline and budget, ensuring seamless project execution.
        </li>
        <li>
          <strong>Streamlined Workflow:</strong> Using advanced tools, I provide
          clean, organized files ready for production or presentation.
        </li>
      </ul>
    </ContentBlock>

    <ContentBlock title="Portfolio Highlights">
      <p>
        I’ve partnered with esteemed clients like StreetForms, ergoCentric,
        Holdenart, and Project Direct, showcasing a wide range of successful
        collaborations. Each project highlights my ability to push boundaries
        and exceed expectations in design, functionality, and visual appeal.
      </p>
    </ContentBlock>

    <ContentBlock title="Proven Expertise:">
      <ul>
        <li>
          Over 20 years of experience in furniture design, interior and exterior
          visualization, and product development.
        </li>
        <li>180+ five-star reviews and a 100% job success score on Upwork.</li>
        <li>
          Top-Rated Plus Freelancer on Upwork with a Skill Certification in 3D
          Modeling and over 3,000 hours of completed projects.
        </li>
      </ul>
    </ContentBlock>

    <ContentBlock title="My Workflow:">
      <p>
        My workflow revolves around a structured approach to ensure every
        project is handled with care and professionalism. I prioritize open
        communication, attention to detail, and collaboration to guarantee
        results that exceed expectations. Learn more about my process in the{" "}
        <Link className="underline" to="/design-process">
          design process
        </Link>
        .
      </p>
    </ContentBlock>

    <ContentBlock title="Let’s Elevate Your Vision:">
      <p>
        Whether you represent an established company, a startup, or are an
        individual with a visionary concept, I’m here to bring your furniture
        and product projects to life with stunning 3D visualizations and
        technical drawings. Together, we can achieve breathtaking results.
      </p>
    </ContentBlock>

    <ContactCallToAction />
  </>
);

const ContentBlock: React.FC<{ title: string; children: React.ReactNode }> = ({
  title,
  children
}) => (
  <>
    <h2 style={{ fontSize: "2rem", marginBottom: "1rem" }}>{title}</h2>
    {children}
    <hr style={{ margin: "3.5rem 0" }} />
  </>
);

const ContactCallToAction: React.FC = () => (
  <p>
    <a
      className="underline"
      href="mailto:andrija@andrijadesign.com?subject=Project%20Inquiry&body=Contact%20me%20to%20share%20a%20brief%20description%20of%20your%20project%2C%20and%20let's%20make%20your%20vision%20a%20reality."
    >
      Contact me
    </a>{" "}
    to share a brief description of your project, and let's make your vision a
    reality.
  </p>
);
