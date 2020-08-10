import express, { Response, Request, Router } from 'express';
import { check, validationResult, Result, ValidationError } from 'express-validator';
import config from 'config';
import * as jwt from 'jsonwebtoken';
import { INVALID_EMAIL_MESSAGE, EMAIL, PASSWORD, NO_PASSWORD_MESSAGE, INVALID_CREDENTIALS, INTERNAL_SERVER_ERROR } from "../appConstants";
import { IUser } from "../models/User";
import AuthMiddleware from "../middleware/auth";
import { AuthRequest, JWTPayload, AuthResponse, UserType } from './routes.interface';
import AuthService from '../services/authService';
import * as _ from 'lodash';

export const authRouter: Router = express.Router();

// @route       GET api/auth
// @desc        Get logged in User
// @access      Private

authRouter.get('/', AuthMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const id: string = _.get(req.user, `[id]`, "");
        const user: IUser | null = await AuthService.getUserById(id);
        return res.json(user);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

// @route       POST api/auth
// @desc        Auth user get token
// @access      Public

authRouter.post('/', [
    check(EMAIL, INVALID_EMAIL_MESSAGE).isEmail(),
    check(PASSWORD, NO_PASSWORD_MESSAGE).exists()
], async (req: Request, res: Response) => {

    const errors: Result<ValidationError> = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = req.body;

    try {

        let auth: AuthResponse = await AuthService.authenticateUser(email, password);
        let user: UserType | undefined;
        if (auth) {
            if (!auth.isAuthenticated) {
                return res.status(400).json({ msg: INVALID_CREDENTIALS });
            } else {
                user = auth.user;
            }
        } else {
            return res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
        }

        if (user && user.id) {
            const payload: JWTPayload = {
                user: {
                    id: user.id
                }
            };
            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: 360000000
            }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            });
        } else {
            return res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
        }

    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});
