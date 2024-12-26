/* eslint-disable react-refresh/only-export-components */
import { Helmet } from "react-helmet-async";

import { SEOProps } from "@/types/seoTypes";

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  url,
  siteName,
  contentType = "website",
  image = "https://www.portfolio.andrijadesign.com/thumbnail.jpg",
  canonicalUrl
}) => {
  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="description" content={description} />

      {/* Optional Keywords Meta Tag */}
      <meta
        name="keywords"
        content="furniture design, 3D rendering, custom furniture, 2D, 3D, CAD, product design, visualization, interior design, 3D modeling, Andrija Mićunović"
      />

      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:type" content={contentType} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Andrija's Portfolio Thumbnail" />
      <meta property="og:locale" content="en_US" />

      {/* Open Graph Profile (Optional for personal branding) */}
      <meta property="og:profile:username" content="Andrija Mićunović" />
      <meta property="og:profile:first_name" content="Andrija" />
      <meta property="og:profile:last_name" content="Mićunović" />

      {/* Social Media Links with rel="me" */}
      <link rel="me" href="https://www.andrijadesign.com" />
      <link rel="me" href="https://www.upwork.com/freelancers/fastdrecad" />
      <link rel="me" href="https://www.linkedin.com/in/andrija-micunovic/" />
      <link rel="me" href="https://www.instagram.com/fastdrecad/" />
      <link rel="me" href="https://www.behance.net/Andrijas" />

      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <link
        rel="icon"
        type="image/png"
        href="/icons/favicon-16x16.png"
        sizes="16x16"
      />
      <link
        rel="icon"
        type="image/png"
        href="/icons/favicon-32x32.png"
        sizes="32x32"
      />
      <link
        rel="icon"
        type="image/png"
        href="/icons/favicon-96x96.png"
        sizes="96x96"
      />

      {/* Apple Touch Icons */}
      <link
        rel="apple-touch-icon"
        sizes="57x57"
        href="/icons/apple-icon-57x57.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="60x60"
        href="/icons/apple-icon-60x60.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="72x72"
        href="/icons/apple-icon-72x72.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href="/icons/apple-icon-76x76.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="114x114"
        href="/icons/apple-icon-114x114.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="120x120"
        href="/icons/apple-icon-120x120.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="144x144"
        href="/icons/apple-icon-144x144.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="152x152"
        href="/icons/apple-icon-152x152.png"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/icons/apple-icon-180x180.png"
      />

      {/* Manifest for PWA (if applicable) */}
      <link rel="manifest" href="/site.webmanifest" />

      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://www.youtube-nocookie.com" />
      <link rel="preconnect" href="https://www.google.com" />
      <link rel="preconnect" href="https://googleads.g.doubleclick.net" />
      <link rel="preconnect" href="https://static.doubleclick.net" />

      {/* Preconnect DNS Prefetch for faster DNS lookups */}
      <link rel="dns-prefetch" href="https://www.youtube-nocookie.com" />
      <link rel="dns-prefetch" href="https://www.google.com" />
      <link rel="dns-prefetch" href="https://googleads.g.doubleclick.net" />
      <link rel="dns-prefetch" href="https://static.doubleclick.net" />
    </Helmet>
  );
};

export default SEO;
