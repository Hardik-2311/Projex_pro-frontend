import React, { useState } from "react";
import ProjectList from "../Pages/ProjectPage";
import TaskList from "../Pages/TaskList";
import Header from "./Header";
import Dashboard from "../Pages/Dashboard";

const MainPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  // console.log(selectedProject);
  const handleProjectClick = (projectId) => {
    setSelectedProject(projectId);
  };
  const handleProjectDelete = () => {
    setSelectedProject(null);
  };
  return (
    <div className="flex flex-col bg-[#E9EFFA] dark:bg-[#20212c] ">
      <div className="">
        <Header />
      </div>
      <div className="min-h-screen flex flex-row overflow-x-scroll">
        <div className="left-panel overflow-y-sroll w-[1/3.5] justify-center dark:bg-[#2b2c37] bg-white ">
          {
            <ProjectList
              onProjectClick={handleProjectClick}
              onProjectDelete={handleProjectDelete}
            />
          }
        </div>
        <div className="right-panel dark:bg-[#20212c] bg-[#E9EFFA] min-w-[100vh] w-2/3">
          {selectedProject === null ? (
            <Dashboard />
          ) : (
            <TaskList projectId={selectedProject} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
