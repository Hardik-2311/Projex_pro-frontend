import React, { useState } from "react";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import { Switch } from "@headlessui/react";
import useDarkMode from "../Hooks/useDark";
import channel  from "../assets/channel.svg";
import club from "../assets/club.png"
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
          <div className="rounded-md flex shadow-3xl py-10">
            <div>
              <div className="flex flex-col justify-center items-center">
                <img src={club} width={70} height={70} alt="img"  />
                <div className="flex flex-col items-start p-2 m-5">
                  <div className="text-2xl font-bold  text-black dark:text-white">
                    Avenger's Assemble
                  </div>
                </div>
                <button
                  type="button"
                  className="text-white bg-[#635fc7] hover:bg-[#402cff]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex justify-between items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2 space-x-5"
                  onClick={handleClick}
                >
                  <img src={channel} width={24} height={24} alt="channel i" />
                  <div>Sign in with Channeli</div>
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center text-white dark:text-black">
            <div className="p-4 w-full justify-center relative space-x-2 bg-slate-500 dark:bg-[#20212c] flex  items-center rounded-lg">
              <BsFillSunFill className="dark:text-white text-black" />
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
                  } inline-block h-4 w-4 transform rounded-full bg-black dark:bg-white transition`}
                />
              </Switch>
              <BsFillMoonFill className="dark:text-white text-black" />
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
