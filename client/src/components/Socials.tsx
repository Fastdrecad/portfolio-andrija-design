import { socialLinks } from '../utils/constants';

interface SocialsProps {
  containerStyles: string;
  iconStyles: string;
}

const Socials: React.FC<SocialsProps> = ({ containerStyles, iconStyles }) => {
  return (
    <div className={`${containerStyles}`}>
      {socialLinks.map((link) => {
        const { href, id, target, rel, icon: Icon } = link;
        return (
          <a href={href} target={target} rel={rel} key={id}>
            <div className={`${iconStyles}`}>
              <Icon />
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default Socials;
