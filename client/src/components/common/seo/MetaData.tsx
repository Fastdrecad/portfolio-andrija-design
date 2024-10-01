import { Helmet } from "react-helmet-async";

export const MetaData = () => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>
        Portfolio | Andrija Mićunović - Furniture Designer & 3D Artist
      </title>
      <meta
        name="description"
        content="Explore top-tier Furniture Design and 3D Rendering services by Andrija Mićunović."
      />
      <meta
        name="keywords"
        content="furniture design, 3D rendering, custom furniture,2D, 3D, CAD, product design, visualization, interior design, 3D modeling, Andrija Mićunović"
      />

      {/* OpenGraph Meta Tags */}
      <meta
        property="og:url"
        content="https://www.portfolio.andrijadesign.com"
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:title"
        content="Portfolio | Andrija Mićunović - Furniture Designer & 3D Artist"
      />
      <meta
        property="og:description"
        content="Discover custom furniture, product designs and 3D modeling services by Andrija Mićunović. See unique creations that blend creativity with craftsmanship."
      />
      <meta
        property="og:image"
        content="https://www.portfolio.andrijadesign.com/thumbnail.jpg"
      />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Andrija's Portfolio Thumbnail" />

      <meta property="og:site_name" content="Andrija's Portfolio" />
      <meta property="og:locale" content="en_US" />

      {/* Other Social Platforms */}
      <meta property="og:profile:username" content="Andrija Mićunović" />
      <meta property="og:profile:first_name" content="Andrija" />
      <meta property="og:profile:last_name" content="Mićunović" />

      <link rel="me" href="https://www.andrijadesign.com" />
      <link rel="me" href="https://www.upwork.com/freelancers/fastdrecad" />
      <link rel="me" href="https://www.linkedin.com/in/andrija-micunovic/" />
      <link rel="me" href="https://www.instagram.com/fastdrecad/" />
      <link rel="me" href="https://www.behance.net/Andrijas" />

      {/* Canonical URL */}
      <link rel="canonical" href="https://www.portfolio.andrijadesign.com" />
    </Helmet>
  );
};
