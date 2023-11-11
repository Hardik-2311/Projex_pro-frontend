import React, { useState } from "react";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { Switch } from "@headlessui/react";
import useDarkMode from "../Hooks/useDark";
const LoginPage = () => {
  const [colorTheme, setTheme] = useDarkMode();
  const [darkMode, setDarkMode] = useState(
    colorTheme === "light" ? true : false
  );
  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkMode(checked);
  };
  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = "http://127.0.0.1:8000/login";
  };


  return (
    <div className={`w-full min-h-screen ${darkMode ? "dark" : ""}`}>
      <div
        className={`h-[100vh] flex justify-center items-center bg-slate-400 dark:bg-[#20212c]`}
      >
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="logo text-white dark:text-black">Projex_Pro</div>
          <div>
            <button
              className="bg-purple-500 p-6 rounded-full"
              onClick={handleClick}
            >
              Sign In with Channel I
            </button>
          </div>
          <div className="flex items-center text-white dark:text-black">
            <div className="p-4 w-full justify-center relative space-x-2 bg-slate-100 dark:bg-[#20212c] flex  items-center rounded-lg">
              <BsFillSunFill />
              <Switch
                checked={darkMode}
                onChange={toggleDarkMode}
                className={`${
                  darkMode ? "bg-[#635fc7]" : "bg-gray-200"
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span
                  className={`${
                    darkMode ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
              <BsFillMoonFill />
            </div>
            <label className="switch">
              <input
              hidden
                type="checkbox"
                onChange={toggleDarkMode}
                checked={darkMode}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
