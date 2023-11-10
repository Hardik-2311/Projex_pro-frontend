import React, { useState } from "react";

function GoalModal({ isOpen, onClose, onGoalCreate, taskId ,creator }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    creator: creator,
    due_date: "",
    finished: false,
    task_id: taskId,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleGoalCreate = () => {
    onGoalCreate(formData);
    onClose();
  };

  return (
    <div>
      <div className="modal-content">
        <h2>Add Goal</h2>
        <form>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
          />

          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />

          <label>Creator:</label>
          <input
            type="text"
            name="creator"
            value={formData.creator}
            onChange={handleInputChange}
          />

          <label>Due Date:</label>
          <input
            type="date"
            name="due_date"
            value={formData.due_date}
            onChange={handleInputChange}
          />

          <label>Finished:</label>
          <input
            type="checkbox"
            name="finished"
            checked={formData.finished}
            onChange={handleInputChange}
          />

          <button type="button" onClick={handleGoalCreate}>
            Add Goal
          </button>
        </form>
        <button type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}

export default GoalModal;
