import { AuthState, User, AuthActionType } from "../../context/auth/interface";
import { REGISTER_USER, LOAD_USER, LOGIN_USER, LOGOUT } from "../../context/types";
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

});