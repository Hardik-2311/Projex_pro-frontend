// api/feedbackApi.js
import axios from "axios";

const axiosConfig = {
  withCredentials: true,
};

export const fetchFeedbacksApi = () => {
  return axios.get("http://127.0.0.1:8000/feedbacks/", axiosConfig);
};

export const createFeedbackApi = (newFeedback) => {
  return axios.post("http://127.0.0.1:8000/feedbacks/", newFeedback, axiosConfig);
};

export const deleteFeedbackApi = (feedbackId) => {
  return axios.delete(`http://127.0.0.1:8000/feedbacks/${feedbackId}/`, axiosConfig);
};

export const editFeedbackApi = (feedbackId, newData) => {
  return axios.put(`http://127.0.0.1:8000/feedbacks/${feedbackId}/`, newData, axiosConfig);
};
