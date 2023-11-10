import { createSlice } from "@reduxjs/toolkit";
import { fetchTasks } from "../Api/TaskApi";
const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
      // Reducer for creating a new task
      createtask: (state, action) => {
        const newtask = action.payload;
        state.data.push(newtask);
      },
    //   edit task
      edittask: (state, action) => {
        const { taskId, newData } = action.payload;
        const task = state.data.find((p) => p.id === taskId);
        if (task) {
          Object.assign(task, newData);
        }
      },
  
      //delete task
      deletetask: (state, action) => {
        const taskIdToDelete = action.payload;
        state.data = state.data.filter((p) => p.id !== taskIdToDelete);
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(fetchTasks.pending, (state) => {
          state.status = 'loading';
        })
        .addCase(fetchTasks.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.data = action.payload;
        })
        .addCase(fetchTasks.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        });
    },
  });
  
  export const { createtask, edittask, deletetask } = tasksSlice.actions;
  
  export default tasksSlice.reducer;