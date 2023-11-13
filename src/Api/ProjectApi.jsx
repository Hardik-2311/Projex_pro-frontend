// api/projectApi.js
import axios from "axios";
import toast from "react-hot-toast";
const axiosConfig = {
  withCredentials: true,
};

export const fetchProjectsApi = () => {
  return axios.get("http://127.0.0.1:8000/projects/", axiosConfig);
};

export const createProjectApi = (newProject) => {
  toast.success("project created successfully")
  return axios.post("http://127.0.0.1:8000/projects/", newProject, axiosConfig);
};

export const deleteProjectApi = (projectId) => {
  toast.success("project deleted successfully")
  return axios.delete(`http://127.0.0.1:8000/projects/${projectId}/`, axiosConfig);
};

export const editProjectApi = (projectId, newData) => {
  // console.log(newData)
  toast.success("project edited successfully")
  return axios.put(`http://127.0.0.1:8000/projects/${projectId}/`, newData, axiosConfig);
};
