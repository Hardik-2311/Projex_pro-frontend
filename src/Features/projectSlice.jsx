// features/project/projectSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchProjectsApi, createProjectApi, deleteProjectApi, editProjectApi } from "../Api/ProjectApi";

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

export const fetchProjectsAsync = createAsyncThunk("project/fetchProjects", async () => {
  const response = await fetchProjectsApi();
  return response.data;
});

export const createProjectAsync = createAsyncThunk("project/createProject", async (newProject) => {
  const response = await createProjectApi(newProject);
  return response.data;
});

export const deleteProjectAsync = createAsyncThunk("project/deleteProject", async (projectId) => {
  await deleteProjectApi(projectId);
  return projectId;
});

export const editProjectAsync = createAsyncThunk("project/editProject", async ({projectId,newData}) => {
  console.log(projectId)
  console.log(newData)
  const response = await editProjectApi(projectId, newData);
  return response.data;
});

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjectsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchProjectsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createProjectAsync.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(deleteProjectAsync.fulfilled, (state, action) => {
        state.data = state.data.filter((project) => project.id !== action.payload);
      })
      .addCase(editProjectAsync.fulfilled, (state, action) => {
        // Update the project in the state
        const updatedProjectIndex = state.data.findIndex((project) => project.id === action.payload.id);
        if (updatedProjectIndex !== -1) {
          state.data[updatedProjectIndex] = action.payload;
        }
      });
  },
});

export default projectSlice.reducer;
