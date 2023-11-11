// api/taskApi.js
import axios from "axios";

const axiosConfig = {
  withCredentials: true,
  'Access-Control-Allow-Origin': '*',
};

export const fetchTasksApi = () => {
  return axios.get("http://127.0.0.1:8000/tasks/", axiosConfig);
};

export const createTaskApi = (newTask) => {
  return axios.post("http://127.0.0.1:8000/tasks/", newTask, axiosConfig);
};

export const deleteTaskApi = (taskId) => {
  return axios.delete(`http://127.0.0.1:8000/tasks/${taskId}/`, axiosConfig);
};

export const editTaskApi = (taskId, newData) => {
  return axios.put(`http://127.0.0.1:8000/tasks/${taskId}/`, newData, axiosConfig);
};
