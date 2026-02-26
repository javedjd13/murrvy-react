import { useEffect } from "react";

const useSlickResizeFix = (sliderRef, itemCount = 0) => {
  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const refreshSlider = () => {
      sliderRef.current?.innerSlider?.onWindowResized?.();
    };

    const frameId = window.requestAnimationFrame(refreshSlider);
    const timerIds = [window.setTimeout(refreshSlider, 300), window.setTimeout(refreshSlider, 1200)];

    window.addEventListener("resize", refreshSlider);
    window.addEventListener("orientationchange", refreshSlider);

    return () => {
      window.cancelAnimationFrame(frameId);
      timerIds.forEach((timerId) => window.clearTimeout(timerId));
      window.removeEventListener("resize", refreshSlider);
      window.removeEventListener("orientationchange", refreshSlider);
    };
  }, [sliderRef, itemCount]);
};

export default useSlickResizeFix;
