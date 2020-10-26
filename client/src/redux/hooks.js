import { useCallback } from "react";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { loadUser, register, login, logout } from "./actions/auth";
import {
  getProverbs,
  addProverb,
  deleteProverb,
  updateProverb,
  getProverb,
} from "./actions/proverb";

export function useAuth() {
  const dispatch = useDispatch();
  const { token, isAuthenticated, loading, user } = useSelector(
    (state) => ({
      token: state.auth.token,
      isAuthenticated: state.auth.isAuthenticated,
      loading: state.auth.loading,
      user: state.auth.user,
    }),
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
    (state) => ({
      proverbs: state.proverb.proverbs,
      userProverbs: state.proverb.userProverbs,
      proverb: state.proverb.proverb,
      loading: state.proverb.loading,
      error: state.proverb.error,
    }),
    shallowEqual
  );

  const boundGetProverbs = useCallback(
    (...args) => {
      return dispatch(getProverbs(...args));
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
    getProverb: boundGetProverb,
    addProverb: boundAddProverb,
    deleteProverb: boundDeleteProverb,
    updateProverb: boundUpdateProverb,
  };
}
