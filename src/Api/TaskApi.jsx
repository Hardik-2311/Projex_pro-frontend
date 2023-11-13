// api/taskApi.js
import axios from "axios";
import toast from "react-hot-toast";
const axiosConfig = {
  withCredentials: true,
};

export const fetchTasksApi = () => {
  return axios.get("http://127.0.0.1:8000/tasks/", axiosConfig);
};

export const createTaskApi = (newTask) => {
  try {
    toast.success("task created successfully");
    return axios.post("http://127.0.0.1:8000/tasks/", newTask, axiosConfig);
  } catch (error) {
    toast.error("error in creating the task");
  }
};

export const deleteTaskApi = (taskId) => {
  toast.success("task deleted successfully");
  return axios.delete(`http://127.0.0.1:8000/tasks/${taskId}/`, axiosConfig);
};

export const editTaskApi = (taskId, newData) => {
  toast.success("task editedd successfully");
  return axios.put(
    `http://127.0.0.1:8000/tasks/${taskId}/`,
    newData,
    axiosConfig
  );
};
