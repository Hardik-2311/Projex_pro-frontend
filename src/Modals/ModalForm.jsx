import React, { useState } from "react";

const ModalForm = ({ onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    project_name: "",
    creator: "",
    members: "",
    description: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Project_name</label>
      <input
        type="text"
        name="project_name"
        value={formData.project_name}
        onChange={handleInputChange}
      />

      <label>Creator</label>
      <input
        type="text"
        name="creator"
        value={formData.creator}
        onChange={handleInputChange}
      />

      <label>Members</label>
      <input
        type="text"
        name="members"
        value={formData.members}
        onChange={handleInputChange}
      />

      <label>Description</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
      />

      <button type="submit">Create Project</button>
    </form>
  );
};

export default ModalForm;
