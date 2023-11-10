import React, { useState } from "react";

const ModalForm = ({ onSubmit, onClose, creator, users }) => {
  const [formData, setFormData] = useState({
    project_name: "",
    creator: creator,
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
      <label>Project Name</label>
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
        disabled // Disabling creator input assuming it should not be edited
      />

      <label>Members</label>
      <select
        name="members"
        value={formData.members}
        onChange={handleInputChange}
      >
        <option value="">Select a member</option>
        {users.map((user) => (
          <option key={user.id} value={user.username}>
            {user.username}
          </option>
        ))}
      </select>

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
