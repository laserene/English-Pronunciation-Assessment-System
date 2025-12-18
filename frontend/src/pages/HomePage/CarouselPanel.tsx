import { useRef, useState, useEffect } from "react";

export default function CarouselPanel({
  title,
  children,
  scrollAmount = 280
}: {
  title: string;
  children?: React.ReactNode;
  scrollAmount?: number;
}) {
  const scrollRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [isOverflowX, setIsOverflowX] = useState(false);

  // Set starting and ending point value
  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setIsAtStart(scrollLeft < 10);
      setIsAtEnd(scrollLeft >= scrollWidth - clientWidth - 10);
      setIsOverflowX(scrollWidth > clientWidth);
    }
  };

  // Scrolling
  const scroll = (direction: string | null) => {
    if (scrollRef.current) {
      if (
        direction === "left" &&
        scrollRef.current.scrollLeft <= scrollAmount
      ) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  // Check if carousel is overflow, then change left-scroll-button visibility
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScroll();

    const observer = new ResizeObserver(() => {
      checkScroll();
    });

    observer.observe(el);

    return () => {
      observer.disconnect();
    };

    setIsOverflowX(el.scrollWidth > el.clientWidth);
  }, []);

  return (
    <div style={{ marginBottom: "64px" }}>
      <div className="carousel-panel-title">{title}</div>
      <div style={{ position: "relative" }}>
        {!isAtStart && (
          <button
            onClick={() => scroll("left")}
            className="carousel-btn left-carousel-btn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path d="M169.4 297.4C156.9 309.9 156.9 330.2 169.4 342.7L361.4 534.7C373.9 547.2 394.2 547.2 406.7 534.7C419.2 522.2 419.2 501.9 406.7 489.4L237.3 320L406.6 150.6C419.1 138.1 419.1 117.8 406.6 105.3C394.1 92.8 373.8 92.8 361.3 105.3L169.3 297.3z" />
            </svg>
          </button>
        )}

        {!isAtEnd && isOverflowX && (
          <button
            onClick={() => scroll("right")}
            className="carousel-btn right-carousel-btn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640">
              <path d="M471.1 297.4C483.6 309.9 483.6 330.2 471.1 342.7L279.1 534.7C266.6 547.2 246.3 547.2 233.8 534.7C221.3 522.2 221.3 501.9 233.8 489.4L403.2 320L233.9 150.6C221.4 138.1 221.4 117.8 233.9 105.3C246.4 92.8 266.7 92.8 279.2 105.3L471.2 297.3z" />
            </svg>
          </button>
        )}

        <div
          ref={scrollRef}
          className="carousel-item-container"
          onScroll={checkScroll}
        >
          <div
            className="carousel-item-area"
            style={{
              paddingLeft: isAtStart ? "160px" : "0px",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
