/* import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Scroll = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default Scroll;


 */

import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Scroll = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Using requestAnimationFrame for immediate effect
    const scrollToTop = () => window.scrollTo(0, 0);

    // Request animation frame to ensure the scroll happens after the browser has repainted
    requestAnimationFrame(() => {
      requestAnimationFrame(scrollToTop);
    });
  }, [pathname]);

  return null;
};

export default Scroll;
