// taskSlice.js
import { createSlice} from "@reduxjs/toolkit";
import { fetchTasks } from "../Api/TaskApi"; // Import from the api folder

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    createTask: (state, action) => {
      const newTask = action.payload;
      state.data.push(newTask);
    },
    editTask: (state, action) => {
      const { taskId, newData } = action.payload;
      const task = state.data.find((t) => t.id === taskId);
      if (task) {
        Object.assign(task, newData);
      }
    },
    deleteTask: (state, action) => {
      const taskIdToDelete = action.payload;
      state.data = state.data.filter((t) => t.id !== taskIdToDelete);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { createTask, editTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
