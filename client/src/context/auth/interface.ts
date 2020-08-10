import { Store } from "antd/lib/form/interface";

export interface User {
    name: string;
    email: string;
    password?: string;
    _id?: string;
}
export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    token: string | null;
    error: string | null;
    loading: boolean;
}

export interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    token: string | null;
    error: string | null;
    loading: boolean;
    registerUser?: (data: any) => Promise<void>;
    authenticateUser?: (data: any) => Promise<void>;
    logout?: () => void;
    clearErrors?: () => void;
}

export interface AuthActionType {
    type: string;
    payload?: {
        user?: any;
        token?: string;
        error?: string;
    }
}

export const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    token: localStorage.getItem("token"),
    error: null,
    loading: false
};

export interface RegisterUserDataType extends Store {
    name: string;
    email: string;
    password: string;
    password2: string;
}