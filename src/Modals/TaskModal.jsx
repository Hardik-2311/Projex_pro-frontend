// TaskModal.jsx
import React, { useState } from "react";
import Modal from "../Components/Modal";
import TaskForm from "../Components/TaskForm";

function TaskModal({ isOpen, onClose, onTaskCreate,project}) {
  console.log(project)
  const [formData, setFormData] = useState({
    Task_name: "",
    description: "",
    creator: "",
    project:project,
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onTaskCreate(formData);

    setFormData({
      Task_name: "",
      description: "",
      creator: "",
    });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <h2 className="text-2xl font-bold mb-4">Add a Task</h2>
        <TaskForm
          formData={formData}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
        />
      </div>
    </Modal>
  );
}

export default TaskModal;
