import React, { useReducer } from "react";
import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";
import axios, { AxiosResponse } from "axios";

import setHeaderToken from "../../utils/setHeaderToken";
import { initialState } from "./interface";

import {
  REGISTER_USER,
  REGISTER_FAIL,
  CLEAR_ERRORS,
  LOAD_USER,
  LOAD_USER_FAIL,
  LOGIN_USER,
  LOGIN_FAILED,
  LOGOUT
} from "../types";

const config = {
  headers: {
    "Content-type": "application/json"
  }
};

const AuthState: React.FunctionComponent = props => {

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // authenticate user

  /* const authenticateUser = async formData => {
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    };
    if (localStorage.token) {
      setHeaderToken(localStorage.token);
    }
    try {
      const res = await axios.post("/api/auth", formData, config);
      dispatch({
        type: LOGIN_USER,
        payload: res.data
      });
      loadUser();
    } catch (err) {
      console.log("ERROR : ", err);
      dispatch({
        type: LOGIN_FAILED,
        payload: err.response.data
      });
    }
  }; */

  // load user

  const loadUser = async () => {
    if (localStorage.token) {
      setHeaderToken(localStorage.token);
    }

    try {
      const res = await axios.get("/api/auth", config);

      dispatch({
        type: LOAD_USER,
        payload: res.data
      });
    } catch (err) {
      console.log("ERROR : ", err.response.data);
      dispatch({
        type: LOAD_USER_FAIL,
        payload: err.response.data
      });
    }
  };

  // register user

  const registerUser = async (formData: any) => {
    try {
      const res: AxiosResponse = await axios.post("/api/user", formData, config);
      dispatch({
        type: REGISTER_USER,
        payload: res.data
      });
    } catch (err) {
      console.log("ERROR : ", err.response.data);
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data
      });
    }
  };

  // logout

  /* const logout = () => {
    dispatch({
      type: LOGOUT
    });
  }; */

  // clear errors

  /* const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS
    });
  }; */

  return (<AuthContext.Provider
    value={{
      isAuthenticated: state.isAuthenticated,
      user: state.user,
      loading: state.loading,
      token: state.token,
      error: state.error,
      registerUser
    }}
  >
    {props.children}
  </AuthContext.Provider>)
};

export default AuthState;
