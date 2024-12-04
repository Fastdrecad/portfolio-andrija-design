import useDocumentTitle from "@/hooks/useDocumentTitle";

import { AmHeroBanner } from "@/components/common/AmHeroBanner";
import JsonLd from "@/components/common/seo/JsonLd";
import SEO from "@/components/common/seo/SEO";
import {
  ContactFooter,
  ContactForm,
  ContactHeader
} from "@/components/contact";

const Contact: React.FC = () => {
  useDocumentTitle("Contact Me");

  const contactData = {
    telephone: "+38162776979",
    contactType: "customer service",
    areaServed: "Worldwide"
  };

  return (
    <>
      <SEO
        title="Contact Me | Andrija Mićunović"
        description="Get in touch with Andrija Mićunović for custom furniture design and 3D modeling services."
        url="https://www.portfolio.andrijadesign.com/contact"
        siteName="Andrija Mićunović Portfolio"
        canonicalUrl="https://www.portfolio.andrijadesign.com/contact"
        image="https://www.portfolio.andrijadesign.com/contact-thumbnail.jpg"
      />

      <JsonLd pageType="contact" pageData={contactData} />

      <section className="contact-page">
        <div className="contact-page__wrapper">
          <div className="contact-page__logo-banner-container">
            <AmHeroBanner color="black" />
          </div>

          <div className="contact-page__content">
            <ContactHeader />
            <ContactForm />
          </div>
        </div>

        <ContactFooter />
      </section>
    </>
  );
};

export default Contact;
