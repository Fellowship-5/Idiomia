import { SET_SEARCH_FIELD, SET_SEARCH_TERM, SET_SEARCH_ICON_CLICKED } from "./types";

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

export const setSearchIconClicked = (bool) => async (dispatch) => {
  dispatch({
    type: SET_SEARCH_ICON_CLICKED,
    payload: bool,
  });
};
