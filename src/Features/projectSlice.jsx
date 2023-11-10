// projectSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchProjects } from "../Api/ProjectApi"; // Import from the api folder

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    createProject: (state, action) => {
      const newProject = action.payload;
      state.data.push(newProject);
    },
    editProject: (state, action) => {
      const { projectId, newData } = action.payload;
      const project = state.data.find((p) => p.id === projectId);
      if (project) {
        Object.assign(project, newData);
      }
    },
    deleteProject: (state, action) => {
      const projectIdToDelete = action.payload;
      state.data = state.data.filter((p) => p.id !== projectIdToDelete);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { createProject, editProject, deleteProject } = projectSlice.actions;
export default projectSlice.reducer;
