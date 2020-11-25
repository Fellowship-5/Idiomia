import {
  GET_APPROVED_PROVERBS,
  GET_APPROVED_PROVERBS_SUCCESS,
  GET_APPROVED_PROVERBS_ERROR,
  GET_USER_PROVERBS,
  GET_USER_PROVERBS_SUCCESS,
  GET_USER_PROVERBS_ERROR,
  GET_PROVERB_SUCCESS,
  GET_PROVERB_ADMIN_SUCCESS,
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
  GET_ALL_USER_PROVERBS,
  GET_ALL_USER_PROVERBS_SUCCESS,
  GET_ALL_USER_PROVERBS_ERROR,
  APPROVE_USER_PROVERB,
  APPROVE_USER_PROVERB_SUCCESS,
  APPROVE_USER_PROVERB_ERROR,
  DELETE_USER_PROVERB,
  DELETE_USER_PROVERB_SUCCESS,
  DELETE_USER_PROVERB_ERROR,
  UPDATE_USER_PROVERB,
  UPDATE_USER_PROVERB_SUCCESS,
  UPDATE_USER_PROVERB_ERROR,
  SEARCH_USER_PROVERBS,
  SEARCH_USER_PROVERBS_SUCCESS,
  SEARCH_USER_PROVERBS_ERROR,
  SEARCH_APPROVED_PROVERBS,
  SEARCH_APPROVED_PROVERBS_SUCCESS,
  SEARCH_APPROVED_PROVERBS_ERROR,
} from "./../actions/types";

const initialState = {
  approvedProverbs: [],
  userProverbs: [],
  allProverbs: [],
  proverb: {},
  totalPages: null,
  loading: false,
  totalFound: null,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_APPROVED_PROVERBS:
    case GET_USER_PROVERBS:
    case ADD_PROVERB:
    case ADD_USER_PROVERB:
    case DELETE_PROVERB:
    case UPDATE_PROVERB:
    case GET_ALL_USER_PROVERBS:
    case APPROVE_USER_PROVERB:
    case DELETE_USER_PROVERB:
    case UPDATE_USER_PROVERB:
    case SEARCH_USER_PROVERBS:
    case SEARCH_APPROVED_PROVERBS:
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
        loading: false,
      };
    case GET_APPROVED_PROVERBS_SUCCESS:
    case SEARCH_APPROVED_PROVERBS_SUCCESS:
      return {
        ...state,
        approvedProverbs: payload.results,
        totalPages: payload.total_pages,
        totalFound: payload.total,
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
        proverb: state.userProverbs.find((proverb) => proverb._id === payload),
        loading: false,
      };
    case GET_PROVERB_ADMIN_SUCCESS:
      return {
        ...state,
        proverb: state.allProverbs.find((proverb) => proverb._id === payload),
        loading: false,
      };
    case GET_APPROVED_PROVERBS_ERROR:
    case GET_USER_PROVERBS_ERROR:
    case GET_ALL_USER_PROVERBS_ERROR:
    case ADD_PROVERB_ERROR:
    case ADD_USER_PROVERB_ERROR:
    case DELETE_PROVERB_ERROR:
    case UPDATE_PROVERB_ERROR:
    case APPROVE_USER_PROVERB_ERROR:
    case DELETE_USER_PROVERB_ERROR:
    case UPDATE_USER_PROVERB_ERROR:
    case SEARCH_APPROVED_PROVERBS_ERROR:
    case SEARCH_USER_PROVERBS_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case DELETE_PROVERB_SUCCESS:
      return {
        ...state,
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
    case GET_ALL_USER_PROVERBS_SUCCESS:
    case SEARCH_USER_PROVERBS_SUCCESS:
      return {
        ...state,
        allProverbs: payload.results,
        totalPages: payload.total_pages,
        totalFound: payload.total,
        loading: false,
      };
    case APPROVE_USER_PROVERB_SUCCESS:
    case UPDATE_USER_PROVERB_SUCCESS:
      return {
        ...state,
        allProverbs: state.allProverbs.map((proverb) =>
          proverb._id === payload._id ? payload : proverb
        ),
        loading: false,
      };
    case DELETE_USER_PROVERB_SUCCESS:
      return {
        ...state,
        allProverbs: state.allProverbs.filter(
          (proverb) => proverb._id !== payload
        ),
        loading: false,
      };

    default:
      return state;
  }
}
