// TaskForm.jsx
import React from "react";

function TaskForm({ formData, onInputChange, onSubmit }) {
    console.log(formData)
  return (
    <form>
      <label htmlFor="Task_name">Task Name:</label>
      <input
        type="text"
        id="Task_name"
        name="Task_name"
        value={formData.Task_name}
        onChange={onInputChange}
      />

      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        name="description"
        value={formData.description}
        onChange={onInputChange}
      />

      <label htmlFor="creator">Creator:</label>
      <input
        type="text"
        id="creator"
        name="creator"
        value={formData.creator}
        onChange={onInputChange}
      />
      <input type="hidden" name="project" value={formData.project} />
      <button type="button" onClick={onSubmit}>
        Add Task
      </button>
    </form>
  );
}

export default TaskForm;
