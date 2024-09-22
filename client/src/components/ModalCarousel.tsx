interface ModalCarouselProps {
  items: {
    url: string;
    desc: string;
  }[];
  currentIndex: number;
}

const ModalCarousel: React.FC<ModalCarouselProps> = ({
  items,
  currentIndex
}) => {
  return (
    <div className="carousel">
      <div className="carousel__list">
        <span className="carousel__project-page-number">
          {currentIndex + 1} / {items.length}
        </span>
        <div className="carousel__item">
          <img
            src={`${items[currentIndex]?.url}`}
            alt={`${items[currentIndex]?.desc}`}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default ModalCarousel;
