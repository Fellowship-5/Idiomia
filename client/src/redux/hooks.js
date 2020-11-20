import { useCallback } from "react";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { loadUser, register, login, logout } from "./actions/auth";
import {
  setSearchTerm,
  setSearchField,
  setSearchIconClicked,
} from "./actions/search";
import { setLocationChanged } from "./actions/location";
import {
  setPage,
  setPageSize,
  setPageReset,
  setPageItems,
} from "./actions/pagination";
import { setToggle } from "./actions/toggle";

import {
  getApprovedProverbs,
  getUserProverbs,
  getAllUserProverbs,
  addProverb,
  deleteProverb,
  updateProverb,
  getProverb,
  addUserProverb,
  updateUserProverb,
  approveUserProverb,
  deleteUserProverb,
  getProverbAdmin,
  searchUserProverbs,
  searchApprovedProverbs,
} from "./actions/proverb";
import {
  selectAuth,
  selectProverb,
  selectSearch,
  selectPagination,
  selectToggle,
} from "./selectors";

export function useAuth() {
  const dispatch = useDispatch();
  const { token, isAuthenticated, loading, user } = useSelector(
    selectAuth,
    shallowEqual
  );

  const boundLoadUser = useCallback(
    (...args) => {
      return dispatch(loadUser(...args));
    },
    [dispatch]
  );

  const boundRegisterUser = useCallback(
    (...args) => {
      return dispatch(register(...args));
    },
    [dispatch]
  );

  const boundLoginUser = useCallback(
    (...args) => {
      return dispatch(login(...args));
    },
    [dispatch]
  );
  const boundLogoutUser = useCallback(
    (...args) => {
      return dispatch(logout(...args));
    },
    [dispatch]
  );

  return {
    token,
    isAuthenticated,
    loading,
    user,
    loadUser: boundLoadUser,
    registerUser: boundRegisterUser,
    loginUser: boundLoginUser,
    logoutUser: boundLogoutUser,
  };
}

export function useProverb() {
  const dispatch = useDispatch();
  const {
    approvedProverbs,
    userProverbs,
    allProverbs,
    proverb,
    loading,
    error,
    totalPages,
  } = useSelector(selectProverb, shallowEqual);

  const boundGetApprovedProverbs = useCallback(
    (...args) => {
      return dispatch(getApprovedProverbs(...args));
    },
    [dispatch]
  );
  const boundGetUserProverbs = useCallback(
    (...args) => {
      return dispatch(getUserProverbs(...args));
    },
    [dispatch]
  );

  const boundGetProverb = useCallback(
    (...args) => {
      return dispatch(getProverb(...args));
    },
    [dispatch]
  );

  const boundAddProverb = useCallback(
    (...args) => {
      return dispatch(addProverb(...args));
    },
    [dispatch]
  );

  const boundAddUserProverb = useCallback(
    (...args) => {
      return dispatch(addUserProverb(...args));
    },
    [dispatch]
  );

  const boundDeleteProverb = useCallback(
    (...args) => {
      return dispatch(deleteProverb(...args));
    },
    [dispatch]
  );

  const boundUpdateProverb = useCallback(
    (...args) => {
      return dispatch(updateProverb(...args));
    },
    [dispatch]
  );
  const boundGetAllUserProverbs = useCallback(
    (...args) => {
      return dispatch(getAllUserProverbs(...args));
    },
    [dispatch]
  );
  const boundUpdateUserProverb = useCallback(
    (...args) => {
      return dispatch(updateUserProverb(...args));
    },
    [dispatch]
  );

  const boundApproveUserProverb = useCallback(
    (...args) => {
      return dispatch(approveUserProverb(...args));
    },
    [dispatch]
  );

  const boundDeleteUserProverb = useCallback(
    (...args) => {
      return dispatch(deleteUserProverb(...args));
    },
    [dispatch]
  );
  const boundGetProverbAdmin = useCallback(
    (...args) => {
      return dispatch(getProverbAdmin(...args));
    },
    [dispatch]
  );
  const boundSearchUserProverbs = useCallback(
    (...args) => {
      return dispatch(searchUserProverbs(...args));
    },
    [dispatch]
  );
  const boundSearchApprovedProverbs = useCallback(
    (...args) => {
      return dispatch(searchApprovedProverbs(...args));
    },
    [dispatch]
  );
  return {
    approvedProverbs,
    userProverbs,
    allProverbs,
    proverb,
    loading,
    error,
    totalPages,
    getApprovedProverbs: boundGetApprovedProverbs,
    getUserProverbs: boundGetUserProverbs,
    getProverb: boundGetProverb,
    addProverb: boundAddProverb,
    addUserProverb: boundAddUserProverb,
    deleteProverb: boundDeleteProverb,
    updateProverb: boundUpdateProverb,
    getAllUserProverbs: boundGetAllUserProverbs,
    updateUserProverb: boundUpdateUserProverb,
    approveUserProverb: boundApproveUserProverb,
    deleteUserProverb: boundDeleteUserProverb,
    getProverbAdmin: boundGetProverbAdmin,
    searchUserProverbs: boundSearchUserProverbs,
    searchApprovedProverbs: boundSearchApprovedProverbs,
  };
}

export function useSearch() {
  const dispatch = useDispatch();
  const { isActive, searchTerm, field, isButtonClicked } = useSelector(
    selectSearch,
    shallowEqual
  );

  const boundSetSearchTerm = useCallback(
    (...args) => {
      return dispatch(setSearchTerm(...args));
    },
    [dispatch]
  );

  const boundSetSearchIconClicked = useCallback(
    (...args) => {
      return dispatch(setSearchIconClicked(...args));
    },
    [dispatch]
  );

  const boundSetSearchField = useCallback(
    (...args) => {
      return dispatch(setSearchField(...args));
    },
    [dispatch]
  );

  return {
    setSearchTerm: boundSetSearchTerm,
    setSearchField: boundSetSearchField,
    setSearchIconClicked: boundSetSearchIconClicked,
    isActive,
    searchTerm,
    field,
    isButtonClicked,
  };
}

export function useLocation() {
  const dispatch = useDispatch();
  const boundSetLocationChanged = useCallback(
    (...args) => {
      return dispatch(setLocationChanged(...args));
    },
    [dispatch]
  );

  return {
    setLocationChanged: boundSetLocationChanged,
  };
}

export function usePagination() {
  const dispatch = useDispatch();
  const { activePage, pageSize, pageItems, pageReset } = useSelector(
    selectPagination,
    shallowEqual
  );

  const boundSetPageSize = useCallback(
    (...args) => {
      return dispatch(setPageSize(...args));
    },
    [dispatch]
  );
  const boundSetPageItems = useCallback(
    (...args) => {
      return dispatch(setPageItems(...args));
    },
    [dispatch]
  );
  const boundSetPage = useCallback(
    (...args) => {
      return dispatch(setPage(...args));
    },
    [dispatch]
  );

  const boundSetPageReset = useCallback(
    (...args) => {
      return dispatch(setPageReset(...args));
    },
    [dispatch]
  );
  return {
    activePage,
    pageSize,
    pageItems,
    pageReset,
    setPageSize: boundSetPageSize,
    setPage: boundSetPage,
    setPageItems: boundSetPageItems,
    setPageReset: boundSetPageReset,
  };
}

export function useToggle() {
  const dispatch = useDispatch();
  const { value, label } = useSelector(selectToggle, shallowEqual);

  const boundSetToggle = useCallback(
    (...args) => {
      return dispatch(setToggle(...args));
    },
    [dispatch]
  );

  return {
    value,
    label,
    setToggle: boundSetToggle,
  };
}
