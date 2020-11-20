import {
  SET_PAGINATION_PAGE,
  SET_PAGINATION_SIZE,
  SET_PAGINATION_RESET,
  SET_PAGINATION_ITEMS,
  CLEAR_PROFILE,
  LOCATION_CHANGED,
} from "./../actions/types";

const initialState = {
  activePage: 1,
  pageSize: 5,
  pageItems: [],
  pageReset: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_PAGINATION_PAGE:
      return {
        ...state,
        activePage: payload,
      };
    case SET_PAGINATION_ITEMS:
      return {
        ...state,
        pageItems: payload,
      };

    case SET_PAGINATION_SIZE:
      return {
        ...state,
        pageSize: payload,
      };
    case SET_PAGINATION_RESET:
      return {
        ...state,
        pageReset: payload,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        activePage: 1,
        pageSize: 5,
      };
    case LOCATION_CHANGED:
      return {
        ...state,
        activePage: 1,
        pageSize: 5,
        pageReset: false,
      };
    default:
      return state;
  }
}
