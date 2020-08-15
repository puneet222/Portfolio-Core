import { AuthState, User, AuthActionType } from "../../context/auth/interface";
import { REGISTER_USER, LOAD_USER, LOGIN_USER, LOGOUT, CLEAR_ERRORS, UPDATE_LOADING, LOGIN_FAILED, REGISTER_FAIL, LOAD_USER_FAIL } from "../../context/types";
import AuthReducer from "../../context/auth/AuthReducer";

const initialState: AuthState = {
    user: null,
    error: null,
    isAuthenticated: false,
    loading: false,
    token: null
}

const user: User = {
    name: "Puneet",
    email: "puneet@gmail.com",
    _id: "xyz"
}

const token: string = "abc";

let authStateWithData: AuthState = {
    user: user,
    error: null,
    isAuthenticated: true,
    loading: false,
    token: token
}

describe('It should Test complete Auth Reducer', () => {

    it("should register new User", () => {
        let expectedState: AuthState = authStateWithData;
        let action: AuthActionType = {
            type: REGISTER_USER,
            payload: {
                token,
                user
            }
        }
        expect(AuthReducer(initialState, action)).toEqual(expectedState);
    });

    it("should load User", () => {
        let expectedState: AuthState = authStateWithData;
        let action: AuthActionType = {
            type: LOAD_USER,
            payload: {
                user
            }
        }
        let updatedInitialState = { ...initialState, token }
        expect(AuthReducer(updatedInitialState, action)).toEqual(expectedState);
    });

    it("should login the User", () => {
        let expectedState: AuthState = { ...authStateWithData, user: null };
        let action: AuthActionType = {
            type: LOGIN_USER,
            payload: {
                token
            }
        }
        expect(AuthReducer(initialState, action)).toEqual(expectedState);
    });

    it("should logout the User", () => {
        let expectedState: AuthState = initialState;
        let action: AuthActionType = {
            type: LOGOUT
        }
        expect(AuthReducer(authStateWithData, action)).toEqual(expectedState);
    });

    it("should clear Errors", () => {
        let updatedInitialState: AuthState = { ...initialState };
        updatedInitialState.error = "Invalid Credentials";
        let action: AuthActionType = {
            type: CLEAR_ERRORS
        }
        expect(AuthReducer(updatedInitialState, action)).toEqual(initialState);
    });

    it("should update the Loading state", () => {
        let action: AuthActionType = {
            type: UPDATE_LOADING,
            payload: {
                loading: true
            }
        };
        let expectedState: AuthState = { ...initialState, loading: true };
        expect(AuthReducer(initialState, action)).toEqual(expectedState);
    });

    it("should fail the Login attempt", () => {
        let error: string = "Invalid Credentials";
        let expectedState: AuthState = { ...initialState, error };
        let action: AuthActionType = {
            type: LOGIN_FAILED,
            payload: {
                error
            }
        }
        expect(AuthReducer(initialState, action)).toEqual(expectedState);
    });

    it("should fail the Register attempt of the user", () => {
        let error: string = "User already exits";
        let expectedState: AuthState = { ...initialState, error };
        let action: AuthActionType = {
            type: REGISTER_FAIL,
            payload: {
                error
            }
        };
        expect(AuthReducer(initialState, action)).toEqual(expectedState);
    });

    it("should fail to load the user", () => {
        let error: string = "Error occurred while loading the user";
        let expectedState: AuthState = { ...initialState, error };
        let updatedInitialState = { ...authStateWithData };
        let action: AuthActionType = {
            type: LOAD_USER_FAIL,
            payload: {
                error
            }
        };
        expect(AuthReducer(updatedInitialState, action)).toEqual(expectedState);
    });

});