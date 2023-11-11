// ProjectPage.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  fetchProjectsAsync,
  deleteProjectAsync,
  createProjectAsync,
  editProjectAsync,
} from "../Features/projectSlice";
import { MdEdit } from "react-icons/md";
import { LuProjector } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import useDarkMode from "../Hooks/useDark";
import { Switch } from "@headlessui/react";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import Modal from "../Components/Modal";
import ProjectModal from "../Modals/ProjectModal";
import CheckLogin from "../SingleUser/singleuser";
function ProjectPage({ onProjectClick }) {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.project.data);
  const status = useSelector((state) => state.project.status);
  const User_login=useSelector((state)=>state.singleuser)
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const users = useSelector((state) => state.user.data);
  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateProject = (formData) => {
    console.log(formData)
    dispatch(createProjectAsync(formData));
    toast.success("Project is created");
  };
  const loginUser = async ()=>{
    await CheckLogin();
  }

  loginUser()

  
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProjectsAsync());
      
    }
  }, [status, dispatch]);

  
  const handleDeleteProject = async (projectId) => {
    try {
      await dispatch(deleteProjectAsync(projectId));
      toast.success("Project is deleted");
    } catch (e) {
      toast.error(e);
    }
  };

  const [editingProject, setEditingProject] = useState(null);

  const handleEditProject = (project) => {
    setEditingProject(project);
    openModal();
  };

  const handleUpdateProject = (formData) => {
    dispatch(
      editProjectAsync({ projectId: editingProject.id, newData: formData })
    );
    closeModal();
  };
  return (
    <div className="h-screen">
      <h3 className="dark:text-white text-gray-600 mx-6 text-xl font-bold mt-4">
        ALL Projects {projects.length}
      </h3>
      <div className="flex flex-col items-start p-4 gap-4 ">
        <div className="">
          <ul className="flex flex-col space-y-3">
            {projects.map((project) => (
              <li
                key={project.id}
                onClick={() => {
                  setSelectedProject(project.id);
                  onProjectClick(project.id);
                }}
                className={`text-xl flex flex-row gap-4 items-center font-bold cursor-pointer`}
              >
                <div>
                  <LuProjector />
                </div>
                <div
                  className={` text-black dark:text-white dark:hover:text-[#635fc7] ${
                    selectedProject === project.id
                      ? " text-[#635fc7] underline "
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedProject(project.id);
                  }}
                >
                  {project.project_name}
                </div>{" "}
                <div className="flex">
                  <MdEdit
                    className="hover:text-[#635fc7]"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditProject(project);
                    }}
                  />
                  <MdDelete
                    className="hover:text-[#635fc7]"
                    onClick={() => {
                      handleDeleteProject(project.id);
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <button
            className="hidden md:block py-2 px-3 text-lg font-bold dark:text-white"
            onClick={openModal}
          >
            + Create New Project
          </button>
          <button onClick={openModal} className="button py-1 px-3 md:hidden">
            +
          </button>
        </div>
        <div className="mx-2 p-4 relative space-x-2 bg-slate-100 dark:bg-[#20212c] flex justify-center items-center rounded-lg">
          <BsFillSunFill />
          <Switch
            checked={darkSide}
            onChange={toggleDarkMode}
            className={`${
              darkSide ? "bg-[#635fc7]" : "bg-gray-200"
            } relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span
              className={`${
                darkSide ? "translate-x-6" : "translate-x-1"
              } inline-block h-4 w-4 transform rounded-full bg-white transition`}
            />
          </Switch>
          <BsFillMoonFill />
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <ProjectModal
            isOpen={isModalOpen}
            onSubmit={
              editingProject ? handleUpdateProject : handleCreateProject
            }
            onClose={closeModal}
            initialData={editingProject}
            creator={User_login.name}
            users={users}
            projectToEdit={editingProject}
          />
        </Modal>
      </div>
    </div>
  );
}

export default ProjectPage;
