import proverbReducer from "./proverb";
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
  DELETE_PROVERB,
  DELETE_PROVERB_SUCCESS,
  DELETE_PROVERB_ERROR,
  UPDATE_PROVERB,
  UPDATE_PROVERB_SUCCESS,
  UPDATE_PROVERB_ERROR,
  CLEAR_PROFILE,
} from "../actions/types";

describe("proverb", () => {
  const mockProverb = {
    proverb: "test data of proverb",
    translation: "a test proverd",
    explanation: "a test explanation",
  };

  const mockInitialState = {
    proverbs: [mockProverb],
    userProverbs: [],
    proverb: {},
    loading: false,
    error: {},
  };
  it("should return initial state by default", () => {
    expect(proverbReducer(mockInitialState, "FAKE_TYPE")).toEqual(
      mockInitialState
    );
  });

  it("should update loading for GET_PROVERBS action", () => {
    const reducerResponse = proverbReducer(mockInitialState, {
      type: GET_PROVERBS,
    });

    expect(reducerResponse).toEqual({
      ...mockInitialState,
      loading: true,
    });
  });

  it("should add new proverb for ADD_PROVERB_SUCCESS action", () => {
    const newProverb = {
      proverb: "test new proverb",
      translation: "test new proverb translation",
      explanation: "test new proverb explanation",
    };

    const reducerResponse = proverbReducer(mockInitialState, {
      type: ADD_PROVERB_SUCCESS,
      payload: newProverb,
    });

    expect(reducerResponse.proverbs).toEqual([newProverb, mockProverb]);
  });
});
