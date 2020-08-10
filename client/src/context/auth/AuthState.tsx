import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import axios, { AxiosResponse } from "axios";

import setHeaderToken from "../../utils/setHeaderToken";
import { initialState, User, RegisterUserDataType } from "./interface";

import {
  REGISTER_USER,
  REGISTER_FAIL,
  CLEAR_ERRORS,
  LOAD_USER,
  LOAD_USER_FAIL,
  LOGIN_USER,
  LOGIN_FAILED,
  LOGOUT,
  UPDATE_LOADING
} from "../types";

const config = {
  headers: {
    "Content-type": "application/json"
  }
};

const AuthState: React.FunctionComponent = props => {

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // authenticate user

  const authenticateUser = async (formData: RegisterUserDataType) => {
    try {
      const res: AxiosResponse = await axios.post("/api/auth", formData, config);
      dispatch({
        type: LOGIN_USER,
        payload: { user: res.data }
      });
      loadUser();
    } catch (err) {
      console.log("ERROR : ", err);
      dispatch({
        type: LOGIN_FAILED,
        payload: { error: err.response.data.msg }
      });
    }
  };

  // load user

  const loadUser = async () => {
    if (localStorage.token) {
      setHeaderToken(localStorage.token);
    }

    try {
      const res: AxiosResponse<User> = await axios.get("/api/auth", config);
      dispatch({
        type: LOAD_USER,
        payload: { user: res.data }
      });
    } catch (err) {
      console.log("ERROR : ", err.response.data);
      dispatch({
        type: LOAD_USER_FAIL,
        payload: { error: err.response.data.msg }
      });
    }
  };

  // register user

  const registerUser = async (formData: RegisterUserDataType) => {
    try {
      const res: AxiosResponse = await axios.post("/api/user", formData, config);
      dispatch({
        type: REGISTER_USER,
        payload: res.data
      });
      loadUser();
    } catch (err) {
      console.log("ERROR : ", err.response.data);
      dispatch({
        type: REGISTER_FAIL,
        payload: { error: err.response.data.msg }
      });
    }
  };

  // logout

  const logout = () => {
    dispatch({
      type: LOGOUT
    });
  };

  // clear errors

  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS
    });
  };

  // loading

  const updateLoading = (value: boolean) => {
    dispatch({
      type: UPDATE_LOADING,
      payload: {
        loading: value
      }
    });
  }

  return (<AuthContext.Provider
    value={{
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      loading: state.loading,
      token: state.token,
      error: state.error,
      registerUser,
      authenticateUser,
      logout,
      clearErrors,
      updateLoading
    }}
  >
    {props.children}
  </AuthContext.Provider>)
};

export default AuthState;
