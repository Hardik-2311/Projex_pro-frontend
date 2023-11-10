import React from "react";

const LoginPage = () => {
  const auth_params = {
    CLIENT_ID: "0eNloDqa757KnDrpnjQ2tfSGES1TVgIrxhb9H5pd",
    STATE_STRING: "this_string",
    REDIRECT_URI: "http://localhost:3000/projects/",
  };

  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = `https://channeli.in/oauth/authorise/?client_id=${auth_params.CLIENT_ID}&redirect_uri=${auth_params.REDIRECT_URI}&state=${auth_params.STATE_STRING}`;
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
