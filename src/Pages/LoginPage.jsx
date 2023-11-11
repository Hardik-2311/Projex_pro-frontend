import React from "react";

const LoginPage = () => {
  const handleClick = (e) => {
    e.preventDefault();
    window.location.href='http://127.0.0.1:8000/login';
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
