import { combineReducers } from "redux";
import auth from "./auth";
import proverb from "./proverb";
import search from "./search";
import pagination from "./pagination";

export default combineReducers({
  auth,
  proverb,
  search,
  pagination,
});
