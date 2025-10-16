import { useCallback, useEffect, useState } from "react";

const useScroll = ({ elementRef }) => {
  const [scrollMetrics, setScrollMetrics] = useState({
    height: 0,
    top: 0,
    bottom: 0,
  });

  const [isScrolling, setIsScrolling] = useState(false);

  const scrollToStart = useCallback(
    ({ start = "bottom", onScrollDone }) => {
      if (isScrolling) {
        return;
      }
      const top = start === "top" ? 0 : scrollMetrics.height + 2000;
      elementRef?.current.scroll({ top, behavior: "smooth" });

      if (typeof onScrollDone === "function") {
        onScrollDone();
      }
    },
    [elementRef, scrollMetrics, isScrolling]
  );

  const handleScroll = useCallback(
    ({ target: { scrollHeight, scrollTop, clientHeight } }) => {
      clearTimeout(window.scrollEndTimer);

      if (!isScrolling) {
        setIsScrolling(true);
      }

      window.scrollEndTimer = setTimeout(() => {
        setScrollMetrics({
          height: scrollHeight,
          top: scrollTop,
          bottom: scrollHeight - scrollTop - clientHeight,
        });
        setIsScrolling(false);
      }, 100);
    },
    [isScrolling]
  );

  useEffect(() => {
    const wrapperElement = elementRef?.current;
    wrapperElement.addEventListener("scroll", handleScroll);

    return () => wrapperElement.removeEventListener("scroll", handleScroll);
  }, [elementRef, handleScroll]);

  return {
    isScrolling,
    scrollToStart,
    scrollHeight: scrollMetrics.height,
    scrollTop: scrollMetrics.top,
    scrollBottom: scrollMetrics.bottom,
  };
};

export default useScroll;
