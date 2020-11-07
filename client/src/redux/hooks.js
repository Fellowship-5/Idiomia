import { useCallback } from "react";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { loadUser, register, login, logout } from "./actions/auth";
import { setSearch, setSearchTerm } from "./actions/search";
import { setLocationChanged } from "./actions/location";
import {
  setPage,
  setPageItems,
  setPageSize,
  setPageReset,
} from "./actions/pagination";

import {
  getProverbs,
  getUserProverbs,
  addProverb,
  deleteProverb,
  updateProverb,
  getProverb,
  addUserProverb,
} from "./actions/proverb";
import {
  selectAuth,
  selectProverb,
  selectSearch,
  selectPagination,
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
  const { proverbs, userProverbs, proverb, loading, error } = useSelector(
    selectProverb,
    shallowEqual
  );

  const boundGetProverbs = useCallback(
    (...args) => {
      return dispatch(getProverbs(...args));
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

  return {
    proverbs,
    userProverbs,
    proverb,
    loading,
    error,
    getProverbs: boundGetProverbs,
    getUserProverbs: boundGetUserProverbs,
    getProverb: boundGetProverb,
    addProverb: boundAddProverb,
    addUserProverb: boundAddUserProverb,
    deleteProverb: boundDeleteProverb,
    updateProverb: boundUpdateProverb,
  };
}

export function useSearch() {
  const dispatch = useDispatch();
  const { isActive, searchTerm, filtered } = useSelector(
    selectSearch,
    shallowEqual
  );

  const boundSetSearchTerm = useCallback(
    (term, type) => {
      return dispatch(setSearchTerm(term, type));
    },
    [dispatch]
  );

  const boundSetSearch = useCallback(
    (...args) => {
      return dispatch(setSearch(...args));
    },
    [dispatch]
  );

  return {
    filtered,
    setSearchTerm: boundSetSearchTerm,
    setSearch: boundSetSearch,
    isActive,
    searchTerm,
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
  const { activePage, pageSize, pageOfItems, pageReset } = useSelector(
    selectPagination,
    shallowEqual
  );

  const boundSetPageSize = useCallback(
    (...args) => {
      return dispatch(setPageSize(...args));
    },
    [dispatch]
  );
  const boundSetPage = useCallback(
    (...args) => {
      return dispatch(setPage(...args));
    },
    [dispatch]
  );
  const boundSetPageItems = useCallback(
    (...args) => {
      return dispatch(setPageItems(...args));
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
    pageOfItems,
    pageReset,
    setPageSize: boundSetPageSize,
    setPage: boundSetPage,
    setPageItems: boundSetPageItems,
    setPageReset: boundSetPageReset,
  };
}
