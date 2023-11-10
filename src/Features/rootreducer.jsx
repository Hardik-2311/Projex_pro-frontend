// rootReducer.js
import { combineReducers } from "@reduxjs/toolkit";
import goalReducer from "./goalSlice";
import projectReducer from "./projectSlice";
import taskReducer from "./taskSlice";
import feedbackReducer from "./feedbackSlice";
import userReducer from "./userSlice";

const rootReducer = combineReducers({
  goal: goalReducer,
  project: projectReducer,
  task: taskReducer,
  feedback: feedbackReducer,
  user: userReducer,
});

export default rootReducer;
