// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "../Api/UserApi"; // Import from the api folder

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    createUser: (state, action) => {
      const newUser = action.payload;
      state.data.push(newUser);
    },
    editUser: (state, action) => {
      const { userId, newData } = action.payload;
      const user = state.data.find((u) => u.id === userId);
      if (user) {
        Object.assign(user, newData);
      }
    },
    deleteUser: (state, action) => {
      const userIdToDelete = action.payload;
      state.data = state.data.filter((u) => u.id !== userIdToDelete);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { createUser, editUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
