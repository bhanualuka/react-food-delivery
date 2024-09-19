import React from "react";
import { useEffect, useState } from "react";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show or hide the button based on the scroll position
  const handleScroll = () => {
    if (window.scrollY > 300) {
      // Show button when scrolled down 300px
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Add scroll event listener on mount
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Scroll to the top of the page
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {isVisible && (
        <button onClick={scrollToTop} style={styles.button}>
          ↑
        </button>
      )}
    </>
  );
};

const styles = {
  button: {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    backgroundColor: "blue",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    fontSize: "24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    zIndex: 1000,
  },
};

export default ScrollToTop;
