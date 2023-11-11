import React, { useState, useEffect } from "react";

function GoalModal({
  isOpen,
  onClose,
  onGoalCreate,
  onGoalEdit,
  selectedGoal,
  taskId,
  creator,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    creator: creator,
    due_date: "",
    task_id: taskId,
  });

  useEffect(() => {
    if (selectedGoal) {
      // If in edit mode, set the form data with the selected goal's data
      setFormData({
        title: selectedGoal.title,
        description: selectedGoal.description,
        creator: creator,
        due_date: selectedGoal.due_date,
        task_id: taskId,
      });
    }
  }, [selectedGoal, creator, taskId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleGoalCreate = () => {
    if (selectedGoal) {
      onGoalEdit(formData);
    } else {
      onGoalCreate(formData);
    }
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 ${
        isOpen ? "opacity-100 backdrop-blur-md" : "opacity-0 pointer-events-none"
      } transition-opacity duration-300 scrollbar-hide  `}
    >
      <div
        className=" overflow-y-scroll scrollbar-hide max-h-[95vh]  my-auto  bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold
       shadow-md shadow-[#364e7e1a] max-w-md mx-auto  w-full px-8  py-8 rounded-xl"
      >
        <div className="flex flex-row justify-around items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              {selectedGoal ? "Edit Goal" : "Add Goal"}
            </h2>
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
              Title:
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
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
              Due Date:
            </label>
            <input
              type="date"
              name="due_date"
              value={formData.due_date}
              onChange={handleInputChange}
              className="bg-transparent  px-4 py-2 outline-none focus:border-0 rounded-md text-sm  border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1  ring-0"
            />
          </div>

          <button
            type="button"
            onClick={handleGoalCreate}
            className="text-white flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0  border-[1px] border-gray-300 focus:outline-[#635fc7] hover:bg-[#635fc7] hover:text-[white] outline-none"
          >
            {selectedGoal ? "Edit Goal" : "Add Goal"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default GoalModal;
