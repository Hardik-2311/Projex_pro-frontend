import React from 'react';

const Header = () => {
 

  return (
    <div className="h-max p-3 bg-white dark:bg-[#2b2c37]">
      <nav className="flex justify-between items-center">
        <div className="rounded-lg flex items-center gap-[1rem]">
          {/* <img src={Logo} alt="" className="rounded-full w-[4rem]" /> */}
          <div className='font-bold text-black text-xl'>ProjexPro</div>
        </div>

        <div className="text-2xl font-bold text-black dark:text-white hidden md:block">
          Platform Launch
          <span className="text-purple-500">
            
          </span>
        </div>
        <div>
          <div className="flex space-x-4 items-center md:space-x-6">
            <button
              className="button hidden md:block"
              onClick={() => {
                // Add your logic here
              }}
            >
              + Add New Task
            </button>
            <button
              onClick={() => {
                
              }}
              className="button py-1 px-3 md:hidden"
            >
              +
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
