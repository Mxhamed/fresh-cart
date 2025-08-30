import { useCallback, useEffect, useState } from "react";
import ChevronBackIcon from "../icons/ChevronBackIcon";
import ChevronForwardIcon from "../icons/ChevronForwardIcon";

function Carousel({
  initialSlide,
  withChevrons = true,
  autoSlide = true,
  duration = 3000,
  children: slides,
}) {
  const [currentSlide, setCurrentSlide] = useState(initialSlide);

  const prev = () => {
    currentSlide === 0
      ? setCurrentSlide(slides.length - 1)
      : setCurrentSlide((prev) => prev - 1);
  };

  const next = useCallback(() => {
    currentSlide === slides.length - 1
      ? setCurrentSlide(0)
      : setCurrentSlide((prev) => prev + 1);
  }, [currentSlide, slides.length]);

  useEffect(() => {
    if (!autoSlide) return;

    const intervalId = setInterval(next, duration);

    return () => clearInterval(intervalId);
  }, [autoSlide, duration, next]);

  return (
    <div className="Carousel">
      <div className="body">
        <div className="slidesParent">
          <div
            className="slides"
            style={{
              translate: `-${currentSlide * 100}%`,
            }}>
            {slides}
          </div>
        </div>

        {withChevrons && (
          <div className="chevrons">
            <button
              onClick={prev}
              aria-label="Move to the Last Slide"
              className="prev">
              <ChevronBackIcon />
            </button>

            <button
              onClick={next}
              aria-label="Move to the Next Slide"
              className="next">
              <ChevronForwardIcon />
            </button>
          </div>
        )}
      </div>

      <div className="indicators flex-center">
        {Array.from({ length: slides.length }, (_, i) => (
          <span
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={currentSlide === i ? "active" : ""}></span>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
