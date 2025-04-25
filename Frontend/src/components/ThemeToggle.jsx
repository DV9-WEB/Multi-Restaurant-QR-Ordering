import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
      />
      <svg
        className="swap-on fill-current w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M5.64 17.657A9 9 0 0012 21a9 9 0 000-18 9 9 0 00-6.36 15.657z" />
      </svg>
      <svg
        className="swap-off fill-current w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path d="M21.64 13a9 9 0 01-8.64 8.64 9 9 0 010-17.28A9 9 0 0121.64 13z" />
      </svg>
    </label>
  );
};

export default ThemeToggle;
