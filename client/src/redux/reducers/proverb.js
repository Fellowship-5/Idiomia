import {
  GET_PROVERBS,
  GET_PROVERBS_SUCCESS,
  GET_PROVERBS_ERROR,
  GET_USER_PROVERBS,
  GET_USER_PROVERBS_SUCCESS,
  GET_USER_PROVERBS_ERROR,
  GET_PROVERB,
  GET_PROVERB_SUCCESS,
  GET_PROVERB_ERROR,
  ADD_PROVERB,
  ADD_PROVERB_SUCCESS,
  ADD_PROVERB_ERROR,
  ADD_USER_PROVERB,
  ADD_USER_PROVERB_SUCCESS,
  ADD_USER_PROVERB_ERROR,
  DELETE_PROVERB,
  DELETE_PROVERB_SUCCESS,
  DELETE_PROVERB_ERROR,
  UPDATE_PROVERB,
  UPDATE_PROVERB_SUCCESS,
  UPDATE_PROVERB_ERROR,
  CLEAR_PROFILE,
} from "./../actions/types";

const initialState = {
  proverbs: [],
  userProverbs: [],
  proverb: {},
  totalPages: null,
  loading: false,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_PROVERBS:
    case GET_USER_PROVERBS:
    case GET_PROVERB:
    case ADD_PROVERB:
    case ADD_USER_PROVERB:
    case DELETE_PROVERB:
    case UPDATE_PROVERB:
      return {
        ...state,
        loading: true,
      };
    case ADD_PROVERB_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case ADD_USER_PROVERB_SUCCESS:
      return {
        ...state,
        userProverbs: [...state.userProverbs, payload],
        loading: false,
      };
    case GET_PROVERBS_SUCCESS:
      return {
        ...state,
        proverbs: payload.results,
        totalPages: payload.total_pages,
        loading: false,
      };
    case GET_USER_PROVERBS_SUCCESS:
      return {
        ...state,
        userProverbs: payload.results,
        totalPages: payload.total_pages,
        loading: false,
      };
    case GET_PROVERB_SUCCESS:
      return {
        ...state,
        proverb: payload,
        loading: false,
      };
    case GET_PROVERBS_ERROR:
    case GET_USER_PROVERBS_ERROR:
    case GET_PROVERB_ERROR:
    case ADD_PROVERB_ERROR:
    case ADD_USER_PROVERB_ERROR:
    case DELETE_PROVERB_ERROR:
    case UPDATE_PROVERB_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case DELETE_PROVERB_SUCCESS:
      return {
        ...state,
        userProverbs: state.userProverbs.filter(
          (proverb) => proverb._id !== payload
        ),
        loading: false,
      };
    case UPDATE_PROVERB_SUCCESS:
      return {
        ...state,
        userProverbs: state.userProverbs.map((proverb) =>
          proverb._id === payload._id ? { ...payload } : proverb
        ),
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        userProverbs: [],
      };
    default:
      return state;
  }
}
