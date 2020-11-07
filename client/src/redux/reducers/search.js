import {
  SET_SEARCH_TERM,
  LOCATION_CHANGED,
  SET_SEARCH,
  CLEAR_PROFILE,
} from "./../actions/types";

const initialState = {
  isActive: null,
  searchTerm: "",
  filtered: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_SEARCH:
      return {
        ...state,
        filtered: payload,
      };
    case SET_SEARCH_TERM:
      return {
        ...state,
        isActive: payload ? true : null,
        searchTerm: payload,
        filtered: payload ? state.filtered : [],
      };
    case LOCATION_CHANGED:
      return initialState;
    case CLEAR_PROFILE:
      return {
        isActive: null,
        searchTerm: "",
        filtered: [],
      };

    default:
      return state;
  }
}
