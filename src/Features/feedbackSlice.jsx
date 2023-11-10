// features/feedback/feedbackSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchFeedbacksApi, createFeedbackApi, deleteFeedbackApi, editFeedbackApi } from "../Api/FeedbackApi";

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

export const fetchFeedbacksAsync = createAsyncThunk("feedback/fetchFeedbacks", async () => {
  const response = await fetchFeedbacksApi();
  return response.data;
});

export const createFeedbackAsync = createAsyncThunk("feedback/createFeedback", async (newFeedback) => {
  const response = await createFeedbackApi(newFeedback);
  return response.data;
});

export const deleteFeedbackAsync = createAsyncThunk("feedback/deleteFeedback", async (feedbackId) => {
  await deleteFeedbackApi(feedbackId);
  return feedbackId;
});

export const editFeedbackAsync = createAsyncThunk("feedback/editFeedback", async ({ feedbackId, newData }) => {
  const response = await editFeedbackApi(feedbackId, newData);
  return response.data;
});

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedbacksAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFeedbacksAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchFeedbacksAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createFeedbackAsync.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(deleteFeedbackAsync.fulfilled, (state, action) => {
        state.data = state.data.filter((feedback) => feedback.id !== action.payload);
      })
      .addCase(editFeedbackAsync.fulfilled, (state, action) => {
        // Update the feedback in the state
        const updatedFeedbackIndex = state.data.findIndex((feedback) => feedback.id === action.payload.id);
        if (updatedFeedbackIndex !== -1) {
          state.data[updatedFeedbackIndex] = action.payload;
        }
      });
  },
});

export default feedbackSlice.reducer;
