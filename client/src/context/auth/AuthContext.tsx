import { createContext } from "react";
import { initialState, AuthContextType } from "./interface";

const AuthContext: React.Context<AuthContextType> = createContext<AuthContextType>(initialState);

export default AuthContext;