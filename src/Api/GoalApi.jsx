import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const axiosConfig = {
  withCredentials: true, // Enable sending session credentials
};

export const fetchGoal = createAsyncThunk("goal/fetchGoal", async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/goals/", axiosConfig);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const createGoal = createAsyncThunk("goal/createGoal", async (newGoal) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/goals/", newGoal, axiosConfig);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const editGoal = createAsyncThunk("goal/editGoal", async ({ goalId, newData }) => {
  try {
    const response = await axios.put(`http://127.0.0.1:8000/goals/${goalId}/`, newData, axiosConfig);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const deleteGoal = createAsyncThunk("goal/deleteGoal", async (goalId) => {
  try {
    await axios.delete(`http://127.0.0.1:8000/goals/${goalId}/`, axiosConfig);
    return goalId;
  } catch (error) {
    throw error;
  }
});
