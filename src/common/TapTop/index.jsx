import { useEffect, useState } from "react";

const TapTop = () => {
  const [taptopStyle, setTapTopStyle] = useState(false);

  const executeScroll = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handleScroll = () => {
    if (window.scrollY > 600) {
      setTapTopStyle(true);
    } else {
      setTapTopStyle(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleTapTop = (event) => {
    event.preventDefault();
    executeScroll();
  };

  return (
    <div className={`tap-to-top ${taptopStyle ? "show" : ""}`}>
      <a href="#" onClick={handleTapTop} aria-label="Scroll to top">
        <i className="fas fa-chevron-up"></i>
      </a>
    </div>
  );
};
export default TapTop;
