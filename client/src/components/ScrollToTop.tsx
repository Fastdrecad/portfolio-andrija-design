import { useEffect, useState } from 'react';
import { GoChevronUp } from 'react-icons/go';

const ScrollToTop: React.FC = () => {
  const [showTopBtn, setShowTopBtn] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      id='scroll-to-top'
      className={showTopBtn ? 'show' : ''}
      onClick={goToTop}
    >
      <GoChevronUp className='icon-position' />
    </button>
  );
};

export default ScrollToTop;
