import { combineReducers } from "redux";
import auth from "./auth";
import proverb from "./proverb";

export default combineReducers({
  auth,
  proverb,
});
