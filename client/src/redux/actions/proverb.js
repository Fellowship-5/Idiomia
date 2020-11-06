import axios from 'axios'
import {
  GET_PROVERBS,
  GET_PROVERBS_SUCCESS,
  GET_PROVERBS_ERROR,
  GET_USER_PROVERBS,
  GET_USER_PROVERBS_SUCCESS,
  GET_USER_PROVERBS_ERROR,
  GET_PROVERB,
  GET_PROVERB_SUCCESS,
  GET_PROVERB_ERROR,
  ADD_PROVERB,
  ADD_PROVERB_SUCCESS,
  ADD_PROVERB_ERROR,
  DELETE_PROVERB,
  DELETE_PROVERB_SUCCESS,
  DELETE_PROVERB_ERROR,
  UPDATE_PROVERB,
  UPDATE_PROVERB_SUCCESS,
  UPDATE_PROVERB_ERROR
} from './types'
import { toast } from 'react-toastify'

const API_URL = process.env.REACT_APP_IDIOMIA_API

// Get All Proverbs for common user
export const getProverbs = () => async dispatch => {
  try {
    dispatch({
      type: GET_PROVERBS
    })
    const res = await axios.get(`${API_URL}/proverbs/all-proverbs`)
    dispatch({
      type: GET_PROVERBS_SUCCESS,
      payload: res.data.proverbs
    })
  } catch (err) {
    dispatch({
      type: GET_PROVERBS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}
// Get All Proverbs for registered user
export const getUserProverbs = () => async dispatch => {
  try {
    dispatch({
      type: GET_USER_PROVERBS
    })
    const res = await axios.get(`${API_URL}/proverbs/my-proverbs`)
    dispatch({
      type: GET_USER_PROVERBS_SUCCESS,
      payload: res.data.user_proverbs
    })
  } catch (err) {
    dispatch({
      type: GET_USER_PROVERBS_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

// Get Proverb
export const getProverb = id => async dispatch => {
  try {
    dispatch({
      type: GET_PROVERB
    })
    const res = await axios.get(`${API_URL}/xxx`) //@not ready

    dispatch({
      type: GET_PROVERB_SUCCESS,
      payload: res.data
    })
  } catch (err) {
    dispatch({
      type: GET_PROVERB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

// Add proverb
export const addProverb = formData => async (dispatch, getState) => {
  const { isAuthenticated } = getState().auth
  try {
    dispatch({
      type: ADD_PROVERB
    })
    const postUrl = isAuthenticated
      ? `${API_URL}/proverbs/post-my-proverb`
      : `${API_URL}/proverbs/post-proverb`
    const res = await axios.post(postUrl, formData)

    dispatch({
      type: ADD_PROVERB_SUCCESS,
      payload: res.data.proverb
    })

    toast.success('Proverb added successfully')
  } catch (err) {
    const { errors, msg } = err.response.data

    if (errors) {
      errors.forEach(error => toast.error(error.msg))
    }
    if (msg) {
      toast.error(msg)
    }

    dispatch({
      type: ADD_PROVERB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

// Delete proverb
export const deleteProverb = id => async dispatch => {
  try {
    dispatch({
      type: DELETE_PROVERB
    })
    await axios.delete(`${API_URL}/proverbs/delete-my-proverb/${id}`)

    dispatch({
      type: DELETE_PROVERB_SUCCESS,
      payload: id
    })

    toast.success('Proverb deleted successfully')
  } catch (err) {
    dispatch({
      type: DELETE_PROVERB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}

// Update Proverb
export const updateProverb = (formData, id) => async dispatch => {
  try {
    dispatch({
      type: UPDATE_PROVERB
    })
    const res = await axios.put(
      `${API_URL}/proverbs/edit-my-proverb/${id}`,
      formData
    )

    dispatch({
      type: UPDATE_PROVERB_SUCCESS,
      payload: res.data
    })

    toast.success('Proverb updated successfully')
  } catch (err) {
    const { errors, msg } = err.response.data

    if (errors) {
      errors.forEach(error => toast.error(error.msg))
    }
    if (msg) {
      toast.error(msg)
    }
    dispatch({
      type: UPDATE_PROVERB_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    })
  }
}
