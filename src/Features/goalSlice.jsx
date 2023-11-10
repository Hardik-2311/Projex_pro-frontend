// features/goal/goalSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGoalsApi, createGoalApi, deleteGoalApi, editGoalApi } from "../Api/GoalApi";

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

export const fetchGoalsAsync = createAsyncThunk("goal/fetchGoals", async () => {
  const response = await fetchGoalsApi();
  return response.data;
});

export const createGoalAsync = createAsyncThunk("goal/createGoal", async (newGoal) => {
  const response = await createGoalApi(newGoal);
  return response.data;
});

export const deleteGoalAsync = createAsyncThunk("goal/deleteGoal", async (goalId) => {
  await deleteGoalApi(goalId);
  return goalId;
});

export const editGoalAsync = createAsyncThunk("goal/editGoal", async ({ goalId, newData }) => {
  const response = await editGoalApi(goalId, newData);
  return response.data;
});

const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoalsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGoalsAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchGoalsAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createGoalAsync.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(deleteGoalAsync.fulfilled, (state, action) => {
        state.data = state.data.filter((goal) => goal.id !== action.payload);
      })
      .addCase(editGoalAsync.fulfilled, (state, action) => {
        // Update the goal in the state
        const updatedGoalIndex = state.data.findIndex((goal) => goal.id === action.payload.id);
        if (updatedGoalIndex !== -1) {
          state.data[updatedGoalIndex] = action.payload;
        }
      });
  },
});

export default goalSlice.reducer;
