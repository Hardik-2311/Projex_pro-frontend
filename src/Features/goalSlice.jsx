// features/goal/goalSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchGoalsApi,
  createGoalApi,
  deleteGoalApi,
  editGoalApi,
} from "../Api/GoalApi";

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

export const fetchGoalsAsync = createAsyncThunk("goal/fetchGoals", async () => {
  const response = await fetchGoalsApi();
  return response.data;
});

export const createGoalAsync = createAsyncThunk(
  "goal/createGoal",
  async (newGoal) => {
    const response = await createGoalApi(newGoal);
    return response.data;
  }
);

export const deleteGoalAsync = createAsyncThunk(
  "goal/deleteGoal",
  async (goalId) => {
    await deleteGoalApi(goalId);
    return goalId;
  }
);

export const editGoalAsync = createAsyncThunk(
  "goal/editGoal",
  async ({ newData, goalId }) => {
    console.log(goalId);
    const response = await editGoalApi(newData, goalId);
    return response.data;
  }
);

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
        const editedGoal = action.payload;
        const index = state.data.findIndex((goal) => goal.id === editedGoal.id);
        console.log(index);
        if (index !== -1) {
          state.data[index] = editedGoal;
        }
      });
  },
});

export default goalSlice.reducer;
