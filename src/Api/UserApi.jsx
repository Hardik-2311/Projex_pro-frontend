// api/userApi.js
import axios from "axios";
axios.defaults.headers.post["Content-Type"]="multipart/form-data";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";
const axiosConfig = {
  withCredentials: true,
};

export const fetchUsersApi = () => {
  return axios.get("http://127.0.0.1:8000/users/", axiosConfig);
};

export const createUserApi = (newUser) => {
  return axios.post("http://127.0.0.1:8000/users/", newUser, axiosConfig);
};

export const deleteUserApi = (userId) => {
  return axios.delete(`http://127.0.0.1:8000/users/${userId}/`, axiosConfig);
};

export const editUserApi = (userId, newData) => {
  return axios.put(`http://127.0.0.1:8000/users/${userId}/`, newData, axiosConfig);
};
