// api/usersApi.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const axiosConfig = {
  withCredentials: true,
};

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/users/", axiosConfig);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const createUser = createAsyncThunk("user/createUser", async (newUser) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/users/", newUser, axiosConfig);
    return response.data;
  } catch (error) {
    throw error;
  }
});


export const editUser = createAsyncThunk("user/editUser", async ({ userId, newData }) => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/users/${userId}/`, newData, axiosConfig);
      return response.data;
    } catch (error) {
      throw error;
    }
  });
  
  export const deleteUser = createAsyncThunk("user/deleteUser", async (userId) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/users/${userId}/`, axiosConfig);
      return userId;
    } catch (error) {
      throw error;
    }
  });
