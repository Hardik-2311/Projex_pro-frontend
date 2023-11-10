// feedbackSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchFeedbacks } from "../Api/FeedbackApi";

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    createFeedback: (state, action) => {
      const newFeedback = action.payload;
      state.data.push(newFeedback);
    },
    editFeedback: (state, action) => {
      const { feedbackId, newData } = action.payload;
      const feedback = state.data.find((f) => f.id === feedbackId);
      if (feedback) {
        Object.assign(feedback, newData);
      }
    },
    deleteFeedback: (state, action) => {
      const feedbackIdToDelete = action.payload;
      state.data = state.data.filter((f) => f.id !== feedbackIdToDelete);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedbacks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFeedbacks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchFeedbacks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { createFeedback, editFeedback, deleteFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer;
