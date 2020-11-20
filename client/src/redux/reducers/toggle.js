import { SET_TOGGLE } from "./../actions/types";

const initialState = {
  value: 0,
  label: "All",
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_TOGGLE:
      return { label: payload.label, value: payload.value };
    default:
      return state;
  }
}
