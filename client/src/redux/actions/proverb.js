import axios from "axios";
import i18n from "../../i18n";

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
  SEARCH_APPROVED_PROVERBS,
  SEARCH_APPROVED_PROVERBS_SUCCESS,
  SEARCH_APPROVED_PROVERBS_ERROR,
  SEARCH_USER_PROVERBS,
  SEARCH_USER_PROVERBS_SUCCESS,
  SEARCH_USER_PROVERBS_ERROR,
} from "./types";
import { toast } from "react-toastify";
import { showError } from "./../../helpers/functions";

const API_URL = process.env.REACT_APP_IDIOMIA_API;

// Get All Proverbs for common user
export const getApprovedProverbs = (page, limit) => async (dispatch) => {
  try {
    dispatch({
      type: GET_APPROVED_PROVERBS,
    });
    const res = await axios.get(
      `${API_URL}/proverbs/all-proverbs?limit=${limit}&sort=desc&approved=true&page=${page}`
    );
    dispatch({
      type: GET_APPROVED_PROVERBS_SUCCESS,
      payload: res.data.proverbs,
    });
  } catch (err) {
    dispatch({
      type: GET_APPROVED_PROVERBS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get All Proverbs for registered user
export const getUserProverbs = (page, limit) => async (dispatch) => {
  try {
    dispatch({
      type: GET_USER_PROVERBS,
    });
    const res = await axios.get(
      `${API_URL}/proverbs/my-proverbs?page=${page}&limit=${limit}&sort=asc`
    );
    dispatch({
      type: GET_USER_PROVERBS_SUCCESS,
      payload: res.data.user_proverbs,
    });
  } catch (err) {
    dispatch({
      type: GET_USER_PROVERBS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Proverb for user
export const getProverb = (id) => (dispatch) => {
  dispatch({
    type: GET_PROVERB_SUCCESS,
    payload: id,
  });
};

// Add proverb for registered user
export const addUserProverb = (formData) => async (dispatch, getState) => {
  const { activePage, pageSize } = getState().pagination;
  try {
    dispatch({
      type: ADD_USER_PROVERB,
    });
    const res = await axios.post(
      `${API_URL}/proverbs/post-my-proverb`,
      formData
    );

    dispatch({
      type: ADD_USER_PROVERB_SUCCESS,
      payload: res.data.proverb,
    });
    dispatch(getUserProverbs(activePage, pageSize));

    toast(i18n.t("proverbs:proverb Success"), {
      className: "toast-user-proverb",
      position: "top-left",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (err) {
    showError(err);

    dispatch({
      type: ADD_USER_PROVERB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add proverb for common user
export const addProverb = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_PROVERB,
    });
    const res = await axios.post(`${API_URL}/proverbs/post-proverb`, formData);

    dispatch({
      type: ADD_PROVERB_SUCCESS,
      payload: res.data.proverb,
    });

    toast(i18n.t("proverbs:proverb Success"), {
      className: "toast-user-proverb",
      position: "top-left",
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (err) {
    showError(err);

    dispatch({
      type: ADD_PROVERB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete proverb for registered user
export const deleteProverb = (id) => async (dispatch, getState) => {
  const { activePage, pageSize } = getState().pagination;

  try {
    dispatch({
      type: DELETE_PROVERB,
    });
    const res = await axios.delete(
      `${API_URL}/proverbs/delete-my-proverb/${id}`
    );

    await dispatch({
      type: DELETE_PROVERB_SUCCESS,
      payload: res.data.deleted_proverbId,
    });
    await dispatch(getUserProverbs(activePage, pageSize));

    toast.success(i18n.t("proverbs:Proverb deleted successfully"));
  } catch (err) {
    dispatch({
      type: DELETE_PROVERB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Update Proverb for registered user
export const updateProverb = (formData, id) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PROVERB,
    });
    const res = await axios.patch(
      `${API_URL}/proverbs/edit-my-proverb/${id}`,
      formData
    );

    dispatch({
      type: UPDATE_PROVERB_SUCCESS,
      payload: res.data.edited_proverb,
    });

    toast.success(i18n.t("proverbs:Proverb updated successfully"));
  } catch (err) {
    showError(err);

    dispatch({
      type: UPDATE_PROVERB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Search user proverbs for common user on homepage
export const searchApprovedProverbs = (page, limit, term, field) => async (
  dispatch
) => {
  try {
    dispatch({
      type: SEARCH_APPROVED_PROVERBS,
    });
    const res = await axios.get(
      `${API_URL}/proverbs/proverb-search?search_field=${field}&search_value=${term}&page=${page}&limit=${limit}&approved=true`
    );

    dispatch({
      type: SEARCH_APPROVED_PROVERBS_SUCCESS,
      payload: res.data.paginatedProverbs,
    });
  } catch (err) {
    dispatch({
      type: SEARCH_APPROVED_PROVERBS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//admin actions

// Get All User Proverbs @admin role
export const getAllUserProverbs = (page, limit, isApproved = "all") => async (
  dispatch
) => {
  let allUserProverbsUrl = `${API_URL}/admin/all-proverbs?page=${page}&limit=${limit}&sort=desc`;

  if (isApproved !== "all") {
    allUserProverbsUrl = allUserProverbsUrl + `&approved=${isApproved}`;
  }

  try {
    dispatch({
      type: GET_ALL_USER_PROVERBS,
    });
    const res = await axios.get(allUserProverbsUrl);
    dispatch({
      type: GET_ALL_USER_PROVERBS_SUCCESS,
      payload: res.data.proverbs,
    });
  } catch (err) {
    dispatch({
      type: GET_ALL_USER_PROVERBS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get Proverb for admin
export const getProverbAdmin = (id) => (dispatch) => {
  dispatch({
    type: GET_PROVERB_ADMIN_SUCCESS,
    payload: id,
  });
};

// Approve user proverb for admin
export const approveUserProverb = (data, id) => async (dispatch, getState) => {
  const { activePage, pageSize } = getState().pagination;
  const { value: toggleValue } = getState().toggle;
  const { isActive: isSearchActive, searchTerm, field } = getState().search;

  let isApproved = "all";
  if (toggleValue === 1) {
    isApproved = false;
  }
  if (toggleValue === 2) {
    isApproved = true;
  }

  try {
    dispatch({
      type: APPROVE_USER_PROVERB,
    });
    const res = await axios.patch(`${API_URL}/admin/approve-proverb/${id}`, {
      approve: data,
    });

    dispatch({
      type: APPROVE_USER_PROVERB_SUCCESS,
      payload: res.data.approved_proverb,
    });
    if (isSearchActive) {
      await dispatch(
        searchUserProverbs(activePage, pageSize, searchTerm, field)
      );
    } else {
      await dispatch(getAllUserProverbs(activePage, pageSize, isApproved));
    }

    toast.success(`Proverb ${data ? "approved" : "disapproved"} successfully`);
  } catch (err) {
    dispatch({
      type: APPROVE_USER_PROVERB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Update User Proverb for admin
export const updateUserProverb = (formData, id) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_USER_PROVERB,
    });
    const res = await axios.patch(
      `${API_URL}/admin/edit-proverb/${id}`,
      formData
    );

    dispatch({
      type: UPDATE_USER_PROVERB_SUCCESS,
      payload: res.data.edited_proverb,
    });

    toast.success(i18n.t("proverbs:Proverb updated successfully"));
  } catch (err) {
    showError(err);

    dispatch({
      type: UPDATE_USER_PROVERB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete user proverb for admin
export const deleteUserProverb = (id) => async (dispatch, getState) => {
  const { activePage, pageSize } = getState().pagination;
  const { value: toggleValue } = getState().toggle;
  const { isActive: isSearchActive, searchTerm, field } = getState().search;

  let isApproved = "all";
  if (toggleValue === 1) {
    isApproved = false;
  }
  if (toggleValue === 2) {
    isApproved = true;
  }

  try {
    dispatch({
      type: DELETE_USER_PROVERB,
    });
    const res = await axios.delete(`${API_URL}/admin/delete-proverb/${id}`);

    dispatch({
      type: DELETE_USER_PROVERB_SUCCESS,
      payload: res.data.deleted_proverb,
    });

    if (isSearchActive) {
      await dispatch(
        searchUserProverbs(activePage, pageSize, searchTerm, field)
      );
    } else {
      await dispatch(getAllUserProverbs(activePage, pageSize, isApproved));
    }
    toast.success(i18n.t("proverbs:Proverb deleted successfully"));
  } catch (err) {
    dispatch({
      type: DELETE_USER_PROVERB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
// Search user proverbs for admin
export const searchUserProverbs = (page, limit, term, field) => async (
  dispatch,
  getState
) => {
  const { value: toggleValue } = getState().toggle;
  let searchProverbsUrl = `${API_URL}/proverbs/proverb-search?search_field=${field}&search_value=${term}&page=${page}&limit=${limit}`;

  if (toggleValue === 1) {
    searchProverbsUrl = searchProverbsUrl + `&approved=false`;
  }
  if (toggleValue === 2) {
    searchProverbsUrl = searchProverbsUrl + `&approved=true`;
  }

  try {
    dispatch({
      type: SEARCH_USER_PROVERBS,
    });
    const res = await axios.get(searchProverbsUrl);

    dispatch({
      type: SEARCH_USER_PROVERBS_SUCCESS,
      payload: res.data.paginatedProverbs,
    });
    //  await dispatch(getAllUserProverbs(activePage, pageSize, isApproved));
  } catch (err) {
    dispatch({
      type: SEARCH_USER_PROVERBS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
