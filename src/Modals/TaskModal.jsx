import React, { useState } from "react";

function TaskModal({ isOpen, onClose, onTaskCreate, creator , project }) {
  const [formData, setFormData] = useState({
    Task_name: "",
    description: "",
    creator: creator,
    project:project
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTaskCreate = () => {
    onTaskCreate(formData);
    onClose();
  };

  return (
    <div
      className={` fixed inset-0 z-50 ${
        isOpen ? "opacity-100 backdrop-blur-md" : "opacity-0 pointer-events-none"
      } transition-opacity duration-300 scrollbar-hide  `}
    >
      <div
        className=" overflow-y-scroll scrollbar-hide max-h-[100vh]  my-auto  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold
       shadow-md shadow-[#364e7e1a] max-w-md mx-auto  w-full px-8  py-8 rounded-xl"
      >
        <div className="flex flex-row justify-around items-baseline">
          <div>
            <h2 className="text-2xl font-bold mb-4">Add Task</h2>
          </div>
          <div>
            <button
              type="button"
              onClick={onClose}
              className=" button mt-4 text-white hover:text-gray-700"
            >
              Close
            </button>
          </div>
        </div>

        <form>
          <div className="mb-4  flex flex-col space-y-1">
            <label className=" text-sm dark:text-white text-gray-500">
              Task Name:
            </label>
            <input
              type="text"
              name="Task_name"
              value={formData.Task_name}
              onChange={handleInputChange}
              className="bg-transparent  px-4 py-2 outline-none focus:border-0 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1  ring-0"
            />
          </div>

          <div className=" mb-4 flex flex-col space-y-1">
            <label className=" text-sm dark:text-white text-gray-500">
              Description:
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className=" bg-transparent outline-none min-h-[200px] focus:border-0 px-4 py-2 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px] "
            />
          </div>

          <div className="mb-4 flex flex-col space-y-2">
            <label className="text-sm dark:text-white text-gray-500">
              Creator:
            </label>
            <input
              type="text"
              name="creator"
              value={formData.creator}
              onChange={handleInputChange}
              className="bg-transparent  px-4 py-2 outline-none focus:border-0 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1  ring-0"
            />
          </div>

          <div className="mb-4 flex flex-col space-y-2">
            <label className="text-sm dark:text-white text-gray-500">
              Project:
            </label>
            <input
              type="text"
              name="project"
              value={formData.project}
              onChange={handleInputChange}
              className="bg-transparent  px-4 py-2 outline-none focus:border-0 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1  ring-0"
            />
          </div>

          <button
            type="button"
            onClick={handleTaskCreate}
            className="dark:text-white py-2 px-4 rounded-full flex-grow text-sm bg-transparent focus:border-0  border-[1px] border-gray-300 focus:outline-[#635fc7] hover:bg-[#635fc7] hover:text-[white] outline-none"
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaskModal;
