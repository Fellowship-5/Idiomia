import { combineReducers } from "redux";
import auth from "./auth";
import proverb from "./proverb";
import search from "./search";
import pagination from "./pagination";
import toggle from "./toggle";

export default combineReducers({
  auth,
  proverb,
  search,
  pagination,
  toggle,
});
