import { LOCATION_CHANGED } from "./types";

export const setLocationChanged = () => async (dispatch) => {
  dispatch({
    type: LOCATION_CHANGED,
  });
};
