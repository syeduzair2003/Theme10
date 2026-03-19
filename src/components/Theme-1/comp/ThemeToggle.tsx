"use client"
import React, { useState, useEffect } from "react";
import sun from '@theme1/assets/images/icons/sun.svg'
import moon from '@theme1/assets/images/icons/moon.svg'
import Image from "next/image";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      isDarkMode ? "dark" : "light"
    );
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className="theme-switch-wrapper position-relative">
      <label className="theme-switch" htmlFor="checkbox">
        {isDarkMode ? (
          <>
            <input type="checkbox" className="d-none" id="checkbox" />
            <span
              className="slider text-black header-right__button white-version"
              onClick={toggleTheme}
            >
              <Image src={sun} alt="" />
            </span>
          </>
        ) : (
          <>
            <span
              className="slider text-black header-right__button dark-version"
              onClick={toggleTheme}
            >
              <Image src={moon} alt="" />
            </span>
          </>
        )}
      </label>
    </div>
  );
};

export default ThemeToggle;
