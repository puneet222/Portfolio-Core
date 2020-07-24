import express, { Response, Request, Router } from 'express';
import { check, validationResult } from 'express-validator';
import config from 'config';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { INVALID_EMAIL_MESSAGE, EMAIL, PASSWORD, NO_PASSWORD_MESSAGE, INVALID_CREDENTIALS, INTERNAL_SERVER_ERROR } from "../appConstants";
import User, { IUser } from "../models/User";
import AuthMiddleware from "../middleware/auth";

export const authRouter: Router = express.Router();

export interface JWTPayload {
    user: Object;
}

// @route       GET api/auth
// @desc        Get logged in User
// @access      Private

authRouter.get('/', AuthMiddleware, async (req: any, res: Response) => {
    try {
        const user: IUser | null = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

// @route       POST api/auth
// @desc        Auth user get token
// @access      Public

authRouter.post('/', [
    check(EMAIL, INVALID_EMAIL_MESSAGE).isEmail(),
    check(PASSWORD, NO_PASSWORD_MESSAGE).exists()
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = <any>req.body;

    try {
        let user: IUser | null = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: INVALID_CREDENTIALS })
        }

        let isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: INVALID_CREDENTIALS });
        }

        const payload: JWTPayload = {
            user: {
                id: <String>user.id
            }
        };

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 36000
        }, (err: any, token: any) => {
            if (err) throw err;
            res.json({ token })
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});
