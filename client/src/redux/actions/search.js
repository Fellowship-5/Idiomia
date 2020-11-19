import { SET_SEARCH_FIELD, SET_SEARCH_TERM } from "./types";

export const setSearchTerm = (term) => async (dispatch) => {
  dispatch({
    type: SET_SEARCH_TERM,
    payload: term,
  });
};

export const setSearchField = (field) => async (dispatch) => {
  dispatch({
    type: SET_SEARCH_FIELD,
    payload: field,
  });
};
