import { useCallback } from 'react';
import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { loadUser, register, login, logout } from './actions/auth';

export function useAuth() {
    const dispatch = useDispatch();
    const { token, isAuthenticated, loading, user } = useSelector(
      (state) => ({
        token: state.auth.token,
        isAuthenticated: state.auth.isAuthenticated,
        loading: state.auth.loading,
        user: state.auth.user
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
      logoutUser: boundLogoutUser
    };
  }