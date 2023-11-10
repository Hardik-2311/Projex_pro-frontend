// goalSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchGoals } from "./api/goalsApi"; // Import from the api folder

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    createGoal: (state, action) => {
      const newGoal = action.payload;
      state.data.push(newGoal);
    },
    editGoal: (state, action) => {
      const { goalId, newData } = action.payload;
      const goal = state.data.find((g) => g.id === goalId);
      if (goal) {
        Object.assign(goal, newData);
      }
    },
    deleteGoal: (state, action) => {
      const goalIdToDelete = action.payload;
      state.data = state.data.filter((g) => g.id !== goalIdToDelete);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { createGoal, editGoal, deleteGoal } = goalSlice.actions;
export default goalSlice.reducer;
