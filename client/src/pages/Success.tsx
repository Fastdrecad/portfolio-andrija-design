import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Confetti from "react-confetti";
import useDocumentTitle from "@/hooks/useDocumentTitle";
import SEO from "@/components/common/seo/SEO";

const Success: React.FC = () => {
  useDocumentTitle("Congratulations!");
  const [pieces, setPieces] = useState<number>(200);

  const stopConfetti = () => {
    setTimeout(() => {
      setPieces(0);
    }, 3000);
  };

  useEffect(() => {
    stopConfetti();
  }, []);

  return (
    <>
      <SEO
        title="Successful submission | Andrija Mićunović"
        description="Thank you for your form submission. We will get back to you soon."
        url="https://www.portfolio.andrijadesign.com/success"
        siteName="Andrija Mićunović Portfolio"
        canonicalUrl="https://www.portfolio.andrijadesign.com/success"
        image="https://www.portfolio.andrijadesign.com/success-thumbnail.jpg"
      />

      <div className="success">
        <div className="success__message">
          <h1 className="success__title">Thank you!</h1>
          <p>Your form submission has been received.</p>
          <Link to="/" className="underline">
            <span>&larr;</span> Back to home
          </Link>
        </div>

        <Confetti gravity={0.3} numberOfPieces={pieces} />
      </div>
    </>
  );
};

export default Success;
