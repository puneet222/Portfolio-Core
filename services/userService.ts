import * as bcrypt from 'bcryptjs';
import { UserType } from "../routes/routes.interface";
import User, { IUser } from "../models/User";

class UserService {
    static getAllUsers() {
        try {
            return User.find({});
        } catch (error) {
            throw error;
        }
    }

    static getUserById(userId: string) {
        try {
            return User.find({ _id: userId }).select('-password');
        } catch (error) {
            throw error;
        }
    }

    static async createUser(userData: UserType) {
        try {
            const salt: string = await bcrypt.genSalt(10);

            userData.password = await bcrypt.hash(userData.password, salt);

            const user: IUser = new User(userData);

            return user.save();
        } catch (error) {
            throw error;
        }
    }

    static updateUser(userData: UserType) {
        try {

        } catch (error) {
            throw error;
        }
    }

    static deleteUser(_id: string) {
        try {
            return User.deleteOne({ _id })
        } catch (error) {
            throw error;
        }
    }

    static async getUser(userData: UserType) {
        try {
            return User.findOne({ email: userData.email });
        } catch (error) {
            throw error;
        }
    }
}

export default UserService;