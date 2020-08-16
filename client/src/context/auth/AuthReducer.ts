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
import { AuthState, AuthActionType } from "./interface";

const AuthReducer = (state: AuthState, action: AuthActionType): AuthState => {
    switch (action.type) {
        case REGISTER_USER: {
            setToken(action);
            return {
                ...state,
                user: action.payload ? action.payload.user ? action.payload.user : null : null,
                isAuthenticated: true,
                error: null,
                loading: false,
                token: action.payload ? action.payload.token ? action.payload.token : "" : ""
            };
        }
        case LOAD_USER: {
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                error: null,
                user: action.payload ? action.payload.user ? action.payload.user : null : null
            };
        }
        case LOGIN_USER: {
            debugger;
            setToken(action);
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                error: null,
                token: action.payload ? action.payload.token ? action.payload.token : "" : ""
            };
        }
        case LOGOUT: {
            removeToken();
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                error: null,
                user: null,
                token: null
            };
        }
        case LOGIN_FAILED:
        case REGISTER_FAIL:
        case LOAD_USER_FAIL: {
            removeToken();
            return {
                ...state,
                isAuthenticated: false,
                token: null,
                user: null,
                loading: false,
                error: action.payload ? action.payload.error ? action.payload.error : "" : ""
            };
        }
        case CLEAR_ERRORS: {
            return {
                ...state,
                error: null,
                loading: false
            };
        }
        case UPDATE_LOADING: {
            return {
                ...state,
                loading: action.payload ? action.payload.loading ? action.payload.loading : false : false
            }
        }
        default:
            return state;
    }
};

const setToken = (action: AuthActionType) => {
    localStorage.setItem("token", action.payload ? action.payload.token ? action.payload.token : "" : "");
}

const removeToken = () => {
    localStorage.removeItem("token");
}

export default AuthReducer;