import {
  SET_PAGINATION_PAGE,
  SET_PAGINATION_SIZE,
  SET_PAGINATION_RESET,
} from "./types";

export const setPage = (page, items) => async (dispatch) => {
  dispatch({
    type: SET_PAGINATION_PAGE,
    payload: { page, items },
  });
};

export const setPageSize = (size) => async (dispatch) => {
  dispatch({
    type: SET_PAGINATION_SIZE,
    payload: size,
  });
};

export const setPageReset = (bool) => async (dispatch) => {
  dispatch({
    type: SET_PAGINATION_RESET,
    payload: bool,
  });
};
