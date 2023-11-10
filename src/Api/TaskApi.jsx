// api/tasksApi.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const axiosConfig = {
  withCredentials: true,
};

export const fetchTasks = createAsyncThunk("task/fetchTasks", async () => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/tasks/",
      axiosConfig
    );
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const createTask = createAsyncThunk(
  "task/createTask",
  async (newTask) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/tasks/",
        newTask,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const editTask = createAsyncThunk(
  "task/editTask",
  async ({ taskId, newData }) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/tasks/${taskId}/`,
        newData,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (taskId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/tasks/${taskId}/`, axiosConfig);
      return taskId;
    } catch (error) {
      throw error;
    }
  }
);
