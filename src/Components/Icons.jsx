import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee, faCode, faCamera, faMusic } from "@fortawesome/free-solid-svg-icons";

const iconOptions = [faCoffee, faCode, faCamera, faMusic];

const getRandomIcon = () => {
  const randomIndex = Math.floor(Math.random() * iconOptions.length);
  return iconOptions[randomIndex];
};

const ProjectIcon = () => {
  const randomIcon = getRandomIcon();

  return (
    <div>
      <FontAwesomeIcon icon={randomIcon} size="3x" />
      {/* You can add any content or styling here */}
    </div>
  );
};

export default ProjectIcon;
