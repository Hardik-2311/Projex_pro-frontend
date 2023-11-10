import React from "react";
import { BACKEND_HOST } from "../hosts";
const LoginPage = () => {
  // const auth_params = {
  //   CLIENT_ID: "0eNloDqa757KnDrpnjQ2tfSGES1TVgIrxhb9H5pd",
  //   STATE_STRING: "Success",
  //   REDIRECT_URI: "http://localhost:3000/projects/",
  // };

  const handleClick = (e) => {
    e.preventDefault();
    window.location.href=`${BACKEND_HOST}login`;
  };

  return (
    <div className="w-full min-h-screen bg-blue-300">
      <div className="h-[100vh] flex justify-center items-center bg-slate-400">
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="logo">Projex_Pro</div>
          <div>
            <button
              className="bg-purple-500 p-6 rounded-full"
              onClick={handleClick}
            >
              Sign In with Channel I
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
