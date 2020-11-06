import { SET_SEARCH_TERM, SET_SEARCH } from "./types";

export const setSearchTerm = (term) => async (dispatch) => {
  dispatch({
    type: SET_SEARCH_TERM,
    payload: term,
  });
};

export const setSearch = (term, data) => async (dispatch) => {
  const searchFields = (arr, value, fields) => {
    const searchValue = value.toLowerCase().trim();
    return arr.filter((item) =>
      fields.some((field) =>
        item[field].toLowerCase().includes(searchValue)
      )
    );
  };

  dispatch({
    type: SET_SEARCH,
    payload: searchFields(data, term, [
      "proverb",
      "explanation",
      "translation",
    ]),
  });
};
