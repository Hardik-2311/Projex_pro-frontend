// api/goalApi.js
import axios from "axios";
import toast from "react-hot-toast";
const axiosConfig = {
  withCredentials: true,
};

export const fetchGoalsApi = () => {
  return axios.get("http://127.0.0.1:8000/goals/", axiosConfig);
};

export const createGoalApi = (newGoal) => {
  toast.success("goal created successfully")
  return axios.post("http://127.0.0.1:8000/goals/", newGoal, axiosConfig);
 
};

export const deleteGoalApi = (goalId) => {
  toast.success("goal deleted successfully")
  return axios.delete(`http://127.0.0.1:8000/goals/${goalId}/`, axiosConfig);
};

export const editGoalApi = (newData,goalId) => {
  return axios.put(`http://127.0.0.1:8000/goals/${goalId}/`, newData, axiosConfig);
};
