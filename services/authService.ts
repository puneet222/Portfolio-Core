
import * as bcrypt from 'bcryptjs';
import User from "../models/User";
import { AuthResponse, UserType } from '../routes/routes.interface';

class AuthService {
    static getUserById(id: string) {
        try {
            return User.findById(id).select('-password');
        } catch (error) {
            throw error;
        }
    }

    static getUserByEmail(email: string) {
        try {
            return User.findOne({ email });
        } catch (error) {
            throw error;
        }
    }

    static async authenticateUser(email: string, password: string) {
        try {
            let user: UserType | null = await AuthService.getUserByEmail(email);

            let authResponse: AuthResponse = { isAuthenticated: false }

            if (!user) {
                return authResponse;
            }

            let isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return authResponse
            }

            authResponse.isAuthenticated = true;
            authResponse.user = user;

            return authResponse;
        } catch (error) {
            throw error;
        }
    }

    static getResponseObject(isAuthenticated: boolean, token: string) {
        return {
            isAuthenticated,
            token
        }
    }
}

export default AuthService;