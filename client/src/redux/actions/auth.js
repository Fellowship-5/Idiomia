import axios from 'axios';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_PROFILE
} from './types';
import setAuthToken from './../../helpers/setAuthToken';
import { toast } from 'react-toastify';

const API_URL = process.env.REACT_APP_IDIOMIA_API;

// Load User
export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get(`${API_URL}/users/get-user`);

    dispatch({
      type: USER_LOADED,
      payload: res.data.current_user,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
    localStorage.removeItem("token");
  }
};

// Register User
export const register = (data) => async (dispatch) => {
	const body = JSON.stringify(data);

	try {
		const res = await axios.post('/api/users', body);

		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data
		});
		localStorage.setItem('token', res.data.token);
		toast.success('You have registered successfully');
		dispatch(loadUser());
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => toast.error(error.msg));
		}

		dispatch({
			type: REGISTER_FAIL
		});
		localStorage.removeItem('token');
	}
};

// Login User
export const login = (data) => async (dispatch) => {
	try {
		const res = await axios.post(`${API_URL}/users/login`, data);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data
		});
		localStorage.setItem('token', res.data.token);
		dispatch(loadUser());
		toast.success('You have logined successfully');
	} catch (err) {
		const { errors, msg } = err.response.data;

		if (errors) {
			errors.forEach((error) => toast.error(error.msg));
		}
		if (msg) {
			toast.error(msg);
		}

		dispatch({
			type: LOGIN_FAIL
		});
		localStorage.removeItem('token');
	}
};

// Logout / Clear Profile
export const logout = () => (dispatch) => {
	dispatch({ type: CLEAR_PROFILE });
	dispatch({ type: LOGOUT });
	localStorage.removeItem('token');
};
