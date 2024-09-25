interface ThumbnailProps {
  url: string;
}

interface ThumbnailsProps {
  items: ThumbnailProps[];
  goToSlide: (slideIndex: number) => void;
  currentIndex: number;
}

const Thumbnails: React.FC<ThumbnailsProps> = ({
  items,
  goToSlide,
  currentIndex
}) => {
  return (
    <div className="thumbnails">
      {items.map((item, slideIndex) => (
        <div
          className="thumbnails__item"
          key={slideIndex}
          onClick={() => goToSlide(slideIndex)}
        >
          <img
            loading="lazy"
            src={item.url}
            alt="Portfolio Projects Thumbnail"
            className={`thumbnails__item-image  ${
              currentIndex === slideIndex
                ? "thumbnails__item-image--active"
                : ""
            }`}
          />
        </div>
      ))}
    </div>
  );
};

export default Thumbnails;
