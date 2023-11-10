// features/task/taskSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTasksApi, createTaskApi, deleteTaskApi, editTaskApi } from "../Api/TaskApi";

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

export const fetchTasksAsync = createAsyncThunk("task/fetchTasks", async () => {
  const response = await fetchTasksApi();
  return response.data;
});

export const createTaskAsync = createAsyncThunk("task/createTask", async (newTask) => {
  const response = await createTaskApi(newTask);
  return response.data;
});

export const deleteTaskAsync = createAsyncThunk("task/deleteTask", async (taskId) => {
  await deleteTaskApi(taskId);
  return taskId;
});

export const editTaskAsync = createAsyncThunk("task/editTask", async ({ taskId, newData }) => {
  const response = await editTaskApi(taskId, newData);
  return response.data;
});

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasksAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasksAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchTasksAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createTaskAsync.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(deleteTaskAsync.fulfilled, (state, action) => {
        state.data = state.data.filter((task) => task.id !== action.payload);
      })
      .addCase(editTaskAsync.fulfilled, (state, action) => {
        // Update the task in the state
        const updatedTaskIndex = state.data.findIndex((task) => task.id === action.payload.id);
        if (updatedTaskIndex !== -1) {
          state.data[updatedTaskIndex] = action.payload;
        }
      });
  },
});

export default taskSlice.reducer;
