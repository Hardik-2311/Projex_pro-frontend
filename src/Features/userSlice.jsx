// features/user/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUsersApi, createUserApi, deleteUserApi, editUserApi } from "../Api/UserApi";

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

export const fetchUsersAsync = createAsyncThunk("user/fetchUsers", async () => {
  const response = await fetchUsersApi();
  return response.data;
});

export const createUserAsync = createAsyncThunk("user/createUser", async (newUser) => {
  const response = await createUserApi(newUser);
  return response.data;
});

export const deleteUserAsync = createAsyncThunk("user/deleteUser", async (userId) => {
  await deleteUserApi(userId);
  return userId;
});

export const editUserAsync = createAsyncThunk("user/editUser", async ({ userId, newData }) => {
  const response = await editUserApi(userId, newData);
  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsersAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchUsersAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.data = state.data.filter((user) => user.id !== action.payload);
      })
      .addCase(editUserAsync.fulfilled, (state, action) => {
        // Update the user in the state
        const updatedUserIndex = state.data.findIndex((user) => user.id === action.payload.id);
        if (updatedUserIndex !== -1) {
          state.data[updatedUserIndex] = action.payload;
        }
      });
  },
});

export default userSlice.reducer;
