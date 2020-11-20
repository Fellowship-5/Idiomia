import { SET_TOGGLE } from "./types";

export const setToggle = ({ value, label }) => async (dispatch) => {
  dispatch({
    type: SET_TOGGLE,
    payload: { value, label },
  });
};
