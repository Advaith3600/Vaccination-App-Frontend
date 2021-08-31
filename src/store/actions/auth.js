import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from '../types';
import { setAlert } from './alert';
import { setAuthHeaders, setUser, removeUser, isLoggedIn } from '../../utils';

const BACKEND_URL = 'https://vaccinationapp.herokuapp.com';

export const uploadImage = (id, image) => async (dispatch) => {
  try {
    const data = new FormData();
    data.append('file', image);
    const url = '/users/photo/' + id;
    const response = await fetch(url, {
      method: 'POST',
      body: data
    });
    const responseData = await response.json();
    if (response.ok) {
      dispatch(setAlert('Image Uploaded', 'success', 5000));
    }
    if (responseData.error) {
      dispatch(setAlert(responseData.error.message, 'error', 5000));
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

// Login user
export const login = (email, password) => async (dispatch) => {
  try {
    const url = BACKEND_URL + '/api/auth/signin/';
    if (!email || !password)
      return dispatch(
        setAlert('Email and/or password cannot be empty', 'error', 5000)
      );
    // const response = await axios.post(url, { email, password });
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const responseData = await response.json();
    if (response.ok) {
      var user = responseData;
      user && setUser(user);
      dispatch({ type: LOGIN_SUCCESS, payload: responseData });
      dispatch(setAlert(`Welcome ${user.userFullName}`, 'success', 5000));
    } else {
      dispatch({ type: LOGIN_FAIL });
      dispatch(setAlert(responseData, 'error', 5000));
    }
  } catch (error) {
    dispatch({ type: LOGIN_FAIL });
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

// Register user
export const register =
  ({
    userFullName,
    aadharNumber,
    email,
    password,
    mobileNumber,
    address,
    dob,
    gender,
    isAdmin
  }) =>
  async (dispatch) => {
    try {
      const url = BACKEND_URL + '/api/auth/register';
      const body = {
        userFullName,
        aadharNumber,
        email,
        password,
        mobileNumber,
        address,
        dob,
        gender,
        isAdmin
      };
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const responseData = await response.json();
      if (response.ok) {
        const user = responseData;
        user && setUser(user);
        dispatch({ type: REGISTER_SUCCESS, payload: responseData });
        dispatch(setAlert('Register Success', 'success', 5000));
      } else {
        dispatch({ type: REGISTER_FAIL });
        dispatch(setAlert(responseData, 'error', 5000));
      }
    } catch (error) {
      dispatch({ type: REGISTER_FAIL });
      dispatch(setAlert(error.message, 'error', 5000));
    }
  };

// Load user
export const loadUser = () => async (dispatch) => {
  if (!isLoggedIn()) return;
  try {
    const url = BACKEND_URL + '/api/auth/signin/';
    const response = await fetch(url, {
      method: 'POST',
      headers: setAuthHeaders()
    });
    const responseData = await response.json();
    if (response.ok) {
      const { user } = responseData;
      user && setUser(user);
      dispatch({ type: USER_LOADED, payload: responseData });
    }
    if (!response.ok) dispatch({ type: AUTH_ERROR });
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Logout
export const logout = () => async (dispatch) => {
  try {
    const url = BACKEND_URL + '/api/auth/logout';
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const responseData = await response.json();
    if (response.ok) {
      removeUser();
      dispatch({ type: LOGOUT });
      dispatch(setAlert('LOGOUT Success', 'success', 5000));
    }
    if (responseData.error) {
      dispatch(setAlert(responseData.error.message, 'error', 5000));
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};
export default login;
