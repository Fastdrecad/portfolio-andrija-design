import Image from "@/components/common/Image";

import heroImage from "@/assets/images/hero-image.png";

const HeroImage: React.FC = () => (
  <Image
    src={heroImage}
    alt="Andrija Mićunović at the workplace"
    className="hero__image top"
  />
);

export default HeroImage;
