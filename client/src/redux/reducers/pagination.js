import {
  SET_PAGINATION_PAGE,
  SET_PAGINATION_SIZE,
  SET_PAGINATION_RESET,
  CLEAR_PROFILE,
  LOCATION_CHANGED,
} from "./../actions/types";

const initialState = {
  activePage: 1,
  pageSize: 10,
  pageItems: [],
  pageReset: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_PAGINATION_PAGE:
      return {
        ...state,
        activePage: payload.page,
        pageItems: payload.items,
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
    case LOCATION_CHANGED:
      return initialState;
    default:
      return state;
  }
}
