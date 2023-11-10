// api/feedbacksApi.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const axiosConfig = {
  withCredentials: true,
};

export const fetchFeedbacks = createAsyncThunk(
  "feedback/fetchFeedbacks",
  async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/feedbacks/",
        axiosConfig
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const createFeedback = createAsyncThunk(
  "feedback/createFeedback",
  async (newFeedback) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/feedbacks/",
        newFeedback,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const editFeedback = createAsyncThunk(
  "feedback/editFeedback",
  async ({ feedbackId, newData }) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/feedbacks/${feedbackId}/`,
        newData,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteFeedback = createAsyncThunk(
  "feedback/deleteFeedback",
  async (feedbackId) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/feedbacks/${feedbackId}/`,
        axiosConfig
      );
      return feedbackId;
    } catch (error) {
      throw error;
    }
  }
);
