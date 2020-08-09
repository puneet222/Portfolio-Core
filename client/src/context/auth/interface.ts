import { Store } from "antd/lib/form/interface";

export interface AuthState {
    user: any;
    isAuthenticated: boolean;
    token: string | null;
    error: string | null;
    loading: boolean;
}

export interface AuthContextType {
    user: any;
    isAuthenticated: boolean;
    token: string | null;
    error: string | null;
    loading: boolean;
    registerUser?: (data: any) => Promise<void>;
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
    loading: true
};

export interface RegisterUserDataType extends Store {
    name: string;
    email: string;
    password: string;
    password2: string;
}