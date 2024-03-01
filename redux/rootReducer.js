import { combineReducers } from "redux";
import imageReducer from "./slice/imageSlice";
import userReducer from "./slice/userSlice";

export const rootReducer = combineReducers({
  image: imageReducer,
  user: userReducer,
});
