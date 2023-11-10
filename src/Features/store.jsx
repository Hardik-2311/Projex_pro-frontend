// store.js
import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./projectSlice";
import taskReducer from "./taskSlice";
import feedbackReducer from "./feedbackSlice";
import userReducer from "./userSlice";
import goalReducer from "./goalSlice";

const store = configureStore({
  reducer: {
    project: projectReducer,
    task: taskReducer,
    feedback: feedbackReducer,
    user: userReducer,
    goal: goalReducer,
  },
});

export default store;
