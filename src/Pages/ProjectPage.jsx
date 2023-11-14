// ProjectPage.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProjectsAsync,
  deleteProjectAsync,
  createProjectAsync,
  editProjectAsync,
} from "../Features/projectSlice";
import hide from "../assets/hide.svg";
import show from "../assets/show.svg";
import { MdEdit } from "react-icons/md";
import CircleIcon from "../Components/Circles";
import { RiDeleteBin5Line } from "react-icons/ri";
import useDarkMode from "../Hooks/useDark";
import { Switch } from "@headlessui/react";
import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import Modal from "../Components/Modal";
import ProjectModal from "../Modals/ProjectModal";
import { useCheckLogin } from "../Login_user/LoginUser";
function ProjectPage({ onProjectClick, onProjectDelete }) {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.project.data);
  const status = useSelector((state) => state.project.status);
  const User_login = useSelector((state) => state.singleuser);
  const [colorTheme, setTheme] = useDarkMode();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const toggleSidebar = () => {
    setIsSideBarOpen((curr) => !curr);
  };
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
    // console.log(formData);
    dispatch(createProjectAsync(formData));
  };
  useCheckLogin();
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProjectsAsync());
    }
  }, [status, dispatch]);

  const handleDeleteProject = async (projectId) => {
    await dispatch(deleteProjectAsync(projectId));
    onProjectDelete();
  };

  const [editingProject, setEditingProject] = useState(null);

  const handleEditProject = (project) => {
    setEditingProject(project);
    openModal();
  };
  const handleCreatewithFormdata = () => {
    setEditingProject(null);
  };
  const handleUpdateProject = (formData) => {
    dispatch(
      editProjectAsync({ projectId: editingProject.id, newData: formData })
    );
    closeModal();
  };
  return (
    <div>
      {isSideBarOpen && (
        <div className="w-[230px]">
          <h3 className="dark:text-white text-gray-600 mx-6 text-xl font-bold mt-4">
            ALL Projects {projects.length}
          </h3>
          <div className="flex flex-col mt-4 items-center gap-4 ">
            <div className="w-full">
              <ul className="flex flex-col  items-center">
                {projects.map((project) => (
                  <li
                    key={project.id}
                    onClick={() => {
                      setSelectedProject(project.id);
                      onProjectClick(project.id);
                    }}
                    className={`text-xl flex-row py-3  justify-around w-full gap-4 font-bold className="text-black dark:text-white font-sub-heading flex items-center dark:hover:text-[#635fc7]"
                onClick={() => {
                  setSelectedProject(project.id);
                }} cursor-pointer ${
                  selectedProject === project.id
                    ? "text-white bg-[#635fc7] rounded-r-full "
                    : ""
                }`}
                  >
                    <CircleIcon />
                    {project.project_name}

                    <div className="flex justify-center items-center">
                      <MdEdit
                        className=""
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditProject(project);
                        }}
                      />
                      <RiDeleteBin5Line
                        className=""
                        onClick={() => {
                          handleDeleteProject(project.id);
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full flex justify-center items-center">
              <button
                className="hidden md:block py-2 px-3 text-md border border-gray-700 dark:border-white rounded-full font-bold dark:text-white"
                onClick={() => {
                  openModal();
                  handleCreatewithFormdata();
                }}
              >
                + Create New Project
              </button>
              <button
                onClick={openModal}
                className="button py-1 px-3 md:hidden"
              >
                +
              </button>
            </div>
            <div className="p-4 w-[90%] mx-auto justify-center relative space-x-2  bg-slate-100 dark:bg-[#20212c] flex  items-center rounded-lg">
              <BsFillSunFill className="dark:text-white" />
              <Switch
                checked={darkSide}
                onChange={toggleDarkMode}
                className={`${
                  darkSide ? "bg-[#635fc7] " : "bg-gray-200"
                } relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span
                  className={`${
                    darkSide ? "translate-x-6" : "translate-x-1"
                  } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
              </Switch>
              <BsFillMoonFill className="dark:text-white" />
            </div>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
              <ProjectModal
                isOpen={isModalOpen}
                onSubmit={
                  editingProject ? handleUpdateProject : handleCreateProject
                }
                onClose={closeModal}
                initialData={editingProject}
                creator={User_login.username}
                users={users}
              />
            </Modal>
          </div>
        </div>
      )}
      {isSideBarOpen ? (
        <div
          onClick={() => toggleSidebar()}
          className=" flex  items-center absolute  bottom-16  text-lg font-bold  rounded-r-full hover:text-[#635FC7] cursor-pointer mr-6 mb-8 px-8 py-4 hover:bg-[#635fc71a] dark:hover:bg-white  space-x-2 justify-center  my-4 text-gray-500 "
        >
          <img className=" min-w-[20px]" src={hide} alt=" side bar show/hide" />
          {isSideBarOpen && <p> Hide Sidebar </p>}
        </div>
      ) : (
        <div
          className="flex flex-row h-full justify-center items-center gap-[2rem] "
          onClick={() => toggleSidebar()}
        >
          <div className=" flex justify between text-lg font-bold hover:text-[#635FC7] cursor-pointer mr-6 mb-8 px-8 py-4 hover:bg-[#635fc71a] dark:hover:bg-white text-gray-500 rounded-r-full my-4  ">
            {/* <img src={show} alt="showSidebarIcon" w={24} h={24} /> */}
            Show Projects
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectPage;
