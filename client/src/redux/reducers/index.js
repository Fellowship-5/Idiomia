import { combineReducers } from "redux";
import auth from "./auth";
import proverb from "./proverb";
import search from './search';


export default combineReducers({
  auth,
  proverb,
  search
});
