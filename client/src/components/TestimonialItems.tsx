import {
  useMemo,
  Children,
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  useCallback
} from "react";
import { testimonials } from "../data";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

interface TestimonialItemsProps {
  children: React.ReactNode;
}

const TestimonialItems: React.FC<TestimonialItemsProps> = ({ children }) => {
  const containerRef = useRef<HTMLUListElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [current, setCurrent] = useState<number>(1);
  const [translateX, setTranslateX] = useState<number>(0);

  const goToSlide = (slideIndex: number) => {
    if (containerRef.current) {
      containerRef.current.style.transitionDuration = "400ms";
      setTranslateX(containerRef.current.clientWidth * slideIndex);
      setCurrent(slideIndex);
    }
  };

  const actionHandler = useCallback(
    (mode: "prev" | "next") => {
      if (containerRef.current) {
        containerRef.current.style.transitionDuration = "400ms";
        if (mode === "prev") {
          if (current <= 1) {
            setTranslateX(0);
            setCurrent(children ? Children.count(children) : 1);
          } else {
            setTranslateX(containerRef.current.clientWidth * (current - 1));
            setCurrent((prev) => --prev);
          }
        } else if (mode === "next") {
          if (current >= (children ? Children.count(children) : 1)) {
            setTranslateX(
              containerRef.current.clientWidth *
                (children ? Children.count(children) + 1 : 2)
            );
            setCurrent(1);
          } else {
            setTranslateX(containerRef.current.clientWidth * (current + 1));
            setCurrent((prev) => ++prev);
          }
        }
      }
    },
    [children, current]
  );

  useEffect(() => {
    const transitionEnd = () => {
      if (containerRef.current) {
        if (current <= 1) {
          containerRef.current.style.transitionDuration = "0ms";
          setTranslateX(containerRef.current.clientWidth * current);
        }

        if (current >= (children ? Children.count(children) : 1)) {
          containerRef.current.style.transitionDuration = "0ms";
          setTranslateX(
            containerRef.current.clientWidth *
              (children ? Children.count(children) : 1)
          );
        }
      }
    };

    document.addEventListener("transitionend", transitionEnd);

    return () => {
      document.removeEventListener("transitionend", transitionEnd);
    };
  }, [current, children]);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      actionHandler("next");
    }, 2000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [actionHandler]);

  const slides = useMemo(() => {
    const childrenArray = Children.toArray(children);

    if (childrenArray.length > 1) {
      const items = childrenArray.map((child, i) => (
        <li key={i} className="testimonial-list__slide">
          {child}
        </li>
      ));

      return [
        <li key={childrenArray.length + 1} className="testimonial-list__slide">
          {childrenArray[childrenArray.length - 1]}
        </li>,
        ...items,
        <li key={childrenArray.length + 2} className="testimonial-list__slide">
          {childrenArray[0]}
        </li>
      ];
    }

    return <li className="testimonial-list__slide">{children}</li>;
  }, [children]);

  const changeChild = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        if (current <= 1) {
          setTranslateX(0);
          setCurrent(children ? Children.count(children) : 1);
        } else {
          setTranslateX(
            (containerRef.current?.clientWidth || 0) * (current - 1)
          );
          setCurrent((prev) => --prev);
        }
      } else if (e.key === "ArrowRight") {
        if (current >= (children ? Children.count(children) : 1)) {
          setTranslateX(
            (containerRef.current?.clientWidth || 0) *
              ((children ? Children.count(children) : 1) + 1)
          );
          setCurrent(1);
        } else {
          setTranslateX(
            (containerRef.current?.clientWidth || 0) * (current + 1)
          );
          setCurrent((prev) => ++prev);
        }
      }
    },
    [children, current]
  );

  useEffect(() => {
    document.addEventListener("keydown", changeChild);

    return function cleanup() {
      document.removeEventListener("keydown", changeChild);
    };
  }, [changeChild]);

  useLayoutEffect(() => {
    if (containerRef.current) {
      setTranslateX(containerRef.current.clientWidth * current);
    }
  }, []);

  return (
    <div className="testimonial-list">
      <button
        className="testimonial-list__btn testimonial-list__btn--left"
        onClick={() => actionHandler("prev")}
      >
        <MdKeyboardArrowLeft className="testimonial-list__arrow" />
      </button>
      <button
        className="testimonial-list__btn testimonial-list__btn--right"
        onClick={() => actionHandler("next")}
      >
        <MdKeyboardArrowRight className="testimonial-list__arrow" />
      </button>
      <ul
        className="testimonial-list__container-list"
        ref={containerRef}
        style={{
          transform: `translate3d(${-translateX}px, 0, 0)`
        }}
      >
        {slides}
      </ul>
      <div className="testimonial-list__dots-container">
        {testimonials.map((_, slideIndex) => (
          <div
            key={slideIndex}
            className={`testimonial-list__dot ${
              current === slideIndex + 1 ? "testimonial-list__dot--active" : ""
            }`}
            onClick={() => goToSlide(slideIndex + 1)}
          >
            &#11044;
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialItems;
