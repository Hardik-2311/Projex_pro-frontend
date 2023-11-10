// api/projectsApi.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const axiosConfig = {
  withCredentials: true,
};

export const fetchProjects = createAsyncThunk(
  "project/fetchProjects",
  async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/projects/",
        axiosConfig
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const createProject = createAsyncThunk(
  "project/createProject",
  async (newProject) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/projects/",
        newProject,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const editProject = createAsyncThunk(
  "project/editProject",
  async ({ projectId, newData }) => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/projects/${projectId}/`,
        newData,
        axiosConfig
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteProject = createAsyncThunk(
  "project/deleteProject",
  async (projectId) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/projects/${projectId}/`,
        axiosConfig
      );
      return projectId;
    } catch (error) {
      throw error;
    }
  }
);
