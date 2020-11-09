<<<<<<< HEAD
import axios from 'axios'
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE
} from './types'
import setAuthToken from './../../helpers/setAuthToken'
import { toast } from 'react-toastify'
=======
import axios from "axios";
import {
  REGISTER_USER,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_ERROR,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT,
  CLEAR_PROFILE,
} from "./types";
import setAuthToken from "./../../helpers/setAuthToken";
import { toast } from "react-toastify";
import { showError } from "./../../helpers/functions";
>>>>>>> 5384a27002b3ea2692c30c85c4243193a12f2dca

const API_URL = process.env.REACT_APP_IDIOMIA_API

// Load User
<<<<<<< HEAD
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  try {
    const res = await axios.get(`${API_URL}/users/get-user`)

    dispatch({
      type: USER_LOADED,
      payload: res.data.current_user
    })
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    })
    localStorage.removeItem('token')
=======
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    dispatch({
      type: GET_USER_INFO,
    });
    const res = await axios.get(`${API_URL}/users/get-user`);

    dispatch({
      type: GET_USER_INFO_SUCCESS,
      payload: res.data.current_user,
    });
  } catch (err) {
    dispatch({
      type: GET_USER_INFO_ERROR,
    });
    localStorage.removeItem("token");
>>>>>>> 5384a27002b3ea2692c30c85c4243193a12f2dca
  }
}

// Register User
<<<<<<< HEAD
export const register = data => async dispatch => {
  try {
    const res = await axios.post(`${API_URL}/users/signup`, data)
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })
    localStorage.setItem('token', res.data.token)
    toast.success('You have registered successfully')
    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach(error => toast.error(error.msg))
    }
    if (err) {
      toast.error('Email exists. Try to log in')
    }
    dispatch({
      type: REGISTER_FAIL
    })
    localStorage.removeItem('token')
  }
}

// Login User
export const login = data => async dispatch => {
  try {
    const res = await axios.post(`${API_URL}/users/login`, data)
    console.log(res.data)
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })
    localStorage.setItem('token', res.data.token)
    dispatch(loadUser())
    toast.success('You have logged in successfully')
  } catch (err) {
    const { errors, msg } = err.response.data

    if (errors) {
      errors.forEach(error => toast.error(error.msg))
    }
    if (msg) {
      toast.error(msg)
    }

    dispatch({
      type: LOGIN_FAIL
    })
    localStorage.removeItem('token')
  }
}

// Logout / Clear Profile
export const logout = () => dispatch => {
  dispatch({ type: CLEAR_PROFILE })
  dispatch({ type: LOGOUT })
  localStorage.removeItem('token')
}
=======
export const register = (data) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_USER,
    });
    const res = await axios.post(`${API_URL}/users/signup`, data);
    localStorage.setItem("token", res.data.token);

    await dispatch(loadUser());
    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: res.data,
    });
    toast.success("You have registered successfully");
  } catch (err) {
    showError(err);

    dispatch({
      type: REGISTER_USER_ERROR,
    });
    localStorage.removeItem("token");
  }
};

// Login User
export const login = (data) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_USER,
    });
    const res = await axios.post(`${API_URL}/users/login`, data);
    localStorage.setItem("token", res.data.token);
    await dispatch(loadUser());
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: res.data,
    });
    toast.success("You have logined successfully");
  } catch (err) {
    showError(err);

    dispatch({
      type: LOGIN_USER_ERROR,
    });
    localStorage.removeItem("token");
  }
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
  localStorage.removeItem("token");
};
>>>>>>> 5384a27002b3ea2692c30c85c4243193a12f2dca
