import React from "react";
// import Logo from "../assets/logo.png";
import { useSelector } from "react-redux/es/hooks/useSelector";
const Header = () => {
  const User_login = useSelector((state) => state.singleuser);
  return (
    <div className="h-max p-3 bg-white dark:bg-[#2b2c37]">
      <nav className="flex justify-between items-center">
        <div className="flex justify-between gap-4 items-baseline">
          {/* <img src={User_login} alt="pic" /> */}
          <div className="font-bold text-black dark:text-white text-2xl font-heading">
            Welcome <span className="text-[#635fc7]">{User_login.name}</span>
          </div>
        </div>
        {/* <div className="rounded-lg flex items-center gap-[1rem]">
          <div >
            <img src={Logo} alt="" className="w-[50px] h-[50px]" />
          </div>
        </div> */}
        <div className="text-2xl font-bold text-black dark:text-white hidden md:block">
          Platform Launch
          <span className="text-purple-500"></span>
        </div>
      </nav>
    </div>
  );
};

export default Header;
