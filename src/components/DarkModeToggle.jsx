import { useEffect, useState } from "react";
import Switch from "react-switch";
import { BsSun, BsMoon } from "react-icons/bs";

const DarkModeToggle = () => {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="flex items-center">
      <BsSun className="text-yellow-500 text-xl" />
      <Switch
        onChange={() => setDarkMode(!darkMode)}
        checked={darkMode}
        checkedIcon={false}
        uncheckedIcon={false}
        onColor="#4F46E5"
        offColor="#D1D5DB"
        className="mx-2"
      />
      <BsMoon className="text-gray-300 text-xl" />
    </div>
  );
};

export default DarkModeToggle;
