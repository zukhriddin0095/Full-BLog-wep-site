import { combineReducers } from "redux";
import userReducer from "./roodReducer";

export const rootReducer = combineReducers({
  user: userReducer,
});
