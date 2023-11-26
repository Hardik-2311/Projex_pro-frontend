// api/projectApi.js
import axios from "axios";
const axiosConfig = {
  withCredentials: true,
};

export const fetchProjectsApi = () => {
  return axios.get("http://127.0.0.1:8000/projects/", axiosConfig);
};

export const createProjectApi = (newProject) => {
  return axios.post("http://127.0.0.1:8000/projects/", newProject, axiosConfig);
};

export const deleteProjectApi = (projectId) => {
  return axios.delete(`http://127.0.0.1:8000/projects/${projectId}/`, axiosConfig);
};

export const editProjectApi = (projectId, newData) => {
  return axios.put(`http://127.0.0.1:8000/projects/${projectId}/`, newData, axiosConfig);
};
