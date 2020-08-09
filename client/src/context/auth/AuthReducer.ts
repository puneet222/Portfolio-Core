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
import { AuthState, AuthActionType } from "./interface";

const AuthReducer = (state: AuthState, action: AuthActionType): AuthState => {
    switch (action.type) {
        case REGISTER_USER: {
            debugger;
            setToken(action);
            return {
                ...state,
                isAuthenticated: true,
                error: null,
                loading: false
            };
        }
        case LOAD_USER: {
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                error: null,
                user: action.payload ? action.payload.user : null
            };
        }
        case LOGIN_USER: {
            setToken(action);
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                error: null
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
                error: null
            };
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