import { Helmet } from "react-helmet-async";
import Hero from "@components/Hero";
import LatestWorks from "@components/LatestWorks";
import Testimonials from "@components/Testimonials";
import TimeIsNow from "@components/TimeIsNow";
import Video from "@components/Video";
import pageTransition from "@components/pageTransition";
// import VideoKit from "@components/VideoKit";

const HomePage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>
          Expert Furniture & Product Design | 3D Modeling and Rendering |
          Andrija Mićunović
        </title>
        <meta
          name="description"
          content="Discover top-notch Furniture and Product Design with Andrija Mićunović. Specializing in 3D Modeling, 3D Rendering, and comprehensive 2D/3D CAD services. Elevate your project today!"
        />

        {/* Open Graph Meta Tags */}
        <meta
          property="og:title"
          content="Andrija Mićunović - Portfolio of 3D Designs and Renderings"
        />
        <meta
          property="og:description"
          content="Explore Andrija Mićunović's professional portfolio with high-quality 3D designs, product renders, and CAD work."
        />
        <meta
          property="og:image"
          content="https://www.andrijadesign.com/portfolio/portfolio-preview.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:url"
          content="https://www.andrijadesign.com/portfolio"
        />
        <meta property="og:type" content="website" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Andrija Mićunović - Portfolio of 3D Designs and Renderings"
        />
        <meta
          name="twitter:description"
          content="Explore high-quality Furniture Design, 3D Modeling, and CAD Renderings."
        />
        <meta
          name="twitter:image"
          content="https://www.andrijadesign.com/portfolio/portfolio-preview.jpg"
        />
        <meta
          name="twitter:url"
          content="https://www.andrijadesign.com/portfolio"
        />
        <script type="application/ld+json">
          {`
            {
              "@context": "http://schema.org",
              "@type": "WebSite",
              "name": "Andrija Mićunović Design",
              "url": "https://www.andrijadesign.com/portfolio",
              "logo": "https://www.andrijadesign.com/portfolio/logo.png",  
              "author": {
                "@type": "Person",
                "name": "Andrija Mićunović"
                },
                "sameAs": [
                  "https://www.linkedin.com/in/andrija-micunovic/",
                  "https://www.behance.net/Andrijas",
                  "https://www.youtube.com/channel/UCAz40UjYzoUVc_MZurNI0yg?view_as=subscriber",
                  "https://www.instagram.com/fastdrecad/",
                  "https://www.upwork.com/freelancers/fastdrecad"
                  ],
                  "priceRange": "$$",
                  "image": "https://www.andrijadesign.com/portfolio/entry-image.jpg",
                  "description": "An experienced Furniture & Product Designer with expertise in 3D modeling, rendering, and conceptual design.",
            }
          `}
        </script>
      </Helmet>

      <main className="home-sections" data-scroll>
        <Hero />
        <Video />
        <LatestWorks />
        <TimeIsNow />
        <Testimonials />
        {/*
      TODO: Remove this later
      <div style={{ width: "100vw", height: "600px" }}>
      <h3>Video Kit</h3>
      <VideoKit path="it-bridge-loop.mp4" width="500" height="300" cont  lazy="loading" />
      </div> */}
      </main>
    </>
  );
};

const HomePageWithTransition = pageTransition(HomePage);

export default HomePageWithTransition;
