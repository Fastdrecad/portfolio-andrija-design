import Image from "@/components/common/Image";

import heroImage from "@/assets/images/hero-image.webp";

const HeroImage: React.FC = () => (
  <Image
    src={heroImage}
    alt="Andrija Mićunović at the workplace"
    className="hero__image top"
    loading="eager"
  />
);

export default HeroImage;
