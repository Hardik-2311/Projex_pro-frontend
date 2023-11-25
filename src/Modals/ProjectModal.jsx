import { useState, useEffect } from "react";
const ProjectModal = ({
  isOpen,
  onClose,
  onSubmit,
  creator,
  users,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    project_name: "",
    creator: creator,
    members: [],
    description: "",
  });
  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        // editing dtata
        setFormData(initialData);
      } else {
        //  new create data
        setFormData({
          project_name: "",
          creator: creator,
          members: [],
          description: "",
        });
      }
    }
  }, [isOpen, initialData, creator]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "members") {
      // If the field is 'members', convert the selected option to an array
      const selectedMembers = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setFormData({ ...formData, [name]: selectedMembers });
    } else {
      // For other fields, update the value as usual
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };
  return (
    <div
      className={`fixed inset-0 z-50 ${
        isOpen
          ? "opacity-100 backdrop-blur-md"
          : "opacity-0 pointer-events-none"
      } transition-opacity duration-300 scrollbar-hide overflow-y-scroll  `}
    >
      <div
        className="overflow-y-scroll scrollbar-hide my-auto bg-white dark:bg-[#2b2c37] text-black dark:text-white font-bold
       shadow-md shadow-[#364e7e1a] max-w-md mx-auto w-full px-8 py-8 rounded-xl"
      >
        <div className="flex flex-row justify-around items-baseline">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              {initialData ? "Edit Project" : "Create Project"}
            </h2>
          </div>
          <div>
            <button
              type="button"
              onClick={onClose}
              className="button mt-4 text-white"
            >
              Close
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col space-y-1">
            <label className="text-sm dark:text-white text-gray-500">
              Project Name:
            </label>
            <input
              required
              type="text"
              name="project_name"
              value={formData.project_name}
              onChange={handleInputChange}
              className="bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1 ring-0"
            />
          </div>

          <div className="mb-4 flex flex-col space-y-2">
            <label className="text-sm dark:text-white text-gray-500">
              Creator:
            </label>
            <input
              required
              type="text"
              name="creator"
              value={formData.creator}
              onChange={handleInputChange}
              disabled
              className="bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1 ring-0"
            />
          </div>

          <div className="mb-4 flex flex-col space-y-2">
            <label className="text-sm dark:bg-[#2b2c37] dark:text-white">
              Members:
            </label>
            <select
              required
              name="members"
              value={formData.members}
              onChange={handleInputChange}
              className="bg-transparent px-4 py-2 outline-none focus:border-0 rounded-md text-sm border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-1 ring-0"
            >
              <option value="" disabled className="dark:bg-[#2b2c37]">
                Select a member
              </option>
              {users.map((user) => (
                <option
                  key={user.id}
                  value={user.username}
                  className="dark:bg-[#2b2c37]"
                >
                  {user.username}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4 flex flex-col space-y-1">
            <label className="text-sm dark:text-white text-gray-500">
              description:
            </label>
            <textarea
              required
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="bg-transparent outline-none min-h-[200px] focus:border-0 px-4 py-2 rounded-md text-sm border-[0.5px] border-gray-600 focus:outline-[#635fc7] outline-[1px]"
            />
          </div>

          <button
            type="submit"
            className="dark:text-white flex-grow px-4 py-2 rounded-md text-sm bg-transparent focus:border-0 border-[1px] border-gray-300 focus:outline-[#635fc7] hover:bg-[#635fc7] hover:text-[white] outline-none"
          >
            {initialData ? "Edit Project" : "Create Project"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;
