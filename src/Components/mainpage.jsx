import React, { useState } from "react";
import ProjectList from "../Pages/ProjectPage";
import TaskList from "../Pages/TaskList";
import Header from "./Header";

const MainPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const handleProjectClick = (projectId) => {
    setSelectedProject(projectId);
  };

  return (
    <div className="flex flex-col overflow-scroll scrollbar-hide">
      <div className="">
        <Header />
      </div>
      <div className=" min-h-screen flex flex-row ">
        <div className="left-panel w-[1/3.5] justify-center dark:bg-[#2b2c37] bg-white ">
          <ProjectList onProjectClick={handleProjectClick} />
        </div>
        <div className="right-panel dark:bg-[#20212c] bg-[#E9EFFA] min-w-max w-[100vw]">
          <TaskList projectId={selectedProject} />
        </div>
      </div>
    </div>
  );
};

export default MainPage;
