import {
  SET_SEARCH_TERM,
  SET_SEARCH_FIELD,
  LOCATION_CHANGED,
  CLEAR_PROFILE,
} from "./../actions/types";

const initialState = {
  isActive: null,
  searchTerm: "",
  field: "proverb",
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_SEARCH_TERM:
      return {
        ...state,
        isActive: payload ? true : null,
        searchTerm: payload,
      };
    case SET_SEARCH_FIELD:
      return {
        ...state,
        field: payload,
      };
    case LOCATION_CHANGED:
    case CLEAR_PROFILE:
      return initialState;

    default:
      return state;
  }
}
