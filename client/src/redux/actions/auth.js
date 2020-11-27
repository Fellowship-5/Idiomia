import axios from 'axios'
import i18n from '../../i18n';

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
  CLEAR_PROFILE
} from './types'
import setAuthToken from './../../helpers/setAuthToken'
import { toast } from 'react-toastify'
import { showError } from './../../helpers/functions'

const API_URL = process.env.REACT_APP_IDIOMIA_API


// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  try {
    dispatch({
      type: GET_USER_INFO
    })
    const res = await axios.get(`${API_URL}/users/get-user`)

    dispatch({
      type: GET_USER_INFO_SUCCESS,
      payload: res.data.current_user
    })
  } catch (err) {
    dispatch({
      type: GET_USER_INFO_ERROR
    })
    localStorage.removeItem('token')
  }
}

// Register User
export const register = data => async dispatch => {
  try {
    dispatch({
      type: REGISTER_USER
    })
    const res = await axios.post(`${API_URL}/users/signup`, data)
    localStorage.setItem('token', res.data.token)

    await dispatch(loadUser())
    dispatch({
      type: REGISTER_USER_SUCCESS,
      payload: res.data
    })
    toast.success(i18n.t('auth: You have registered successfully'))
  } catch (err) {
    showError(err)

    dispatch({
      type: REGISTER_USER_ERROR
    })
    localStorage.removeItem('token')
  }
}

// Login User
export const login = data => async dispatch => {
  try {
    dispatch({
      type: LOGIN_USER
    })
    const res = await axios.post(`${API_URL}/users/login`, data)
    localStorage.setItem('token', res.data.token)
    await dispatch(loadUser())
    dispatch({
      type: LOGIN_USER_SUCCESS,
      payload: res.data
    })
    toast.success(i18n.t('auth:You have logined successfully'))
  } catch (err) {
    showError(err)

    dispatch({
      type: LOGIN_USER_ERROR
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
