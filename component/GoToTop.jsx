'use client'
import React, { useState, useEffect } from "react";
import "primeicons/primeicons.css";
        
function GoToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 400) {
      // Adjust this value to control when the button becomes visible
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
    className="arrow"
      style={{
        display: isVisible ? "block" : "none",
        fontWeight: "600",
        zIndex: "999",
        position: "fixed",
        bottom: "50px",
        right: "40px",
        cursor: "pointer",
        backgroundColor: "#f97316",
        padding: "10px",
        borderRadius: "55%",
        color:"white"
      }}
      onClick={scrollToTop}
    >
      <i className="pi pi-arrow-up fs-1 opacity-75"></i>
    </div>
  );
}

export default GoToTop;
