import express, { Request, Response, Router } from 'express';
import * as bcrypt from 'bcryptjs';
import * as config from 'config';
import * as jwt from 'jsonwebtoken';
import { check, validationResult, Result, ValidationError } from 'express-validator';
import {
    INVALID_EMAIL_MESSAGE,
    INVALID_PASSWORD_MESSAGE,
    USER_EXISTS,
    INTERNAL_SERVER_ERROR,
    NO_NAME_MESSAGE,
    NAME,
    EMAIL,
    PASSWORD
} from "../appConstants";
import User, { IUser } from '../models/User';
import AuthMiddleware from '../middleware/auth';

export const userRouter: Router = express.Router();

// @route       GET api/user
// @desc        Get users
// @access      Private

userRouter.get('/', AuthMiddleware, async (req: Request, res: Response) => {
    try {
        const users: Array<IUser> = await User.find({});
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

// @route       POST api/user
// @desc        Add users
// @access      Private

userRouter.post('/', [
    check(NAME, NO_NAME_MESSAGE).not().isEmpty(),
    check(EMAIL, INVALID_EMAIL_MESSAGE).isEmail(),
    check(PASSWORD, INVALID_PASSWORD_MESSAGE).isLength({ min: 6 })
],
    async (req: Request, res: Response) => {
        const errors: Result<ValidationError> = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { name, email, password } = req.body;

        try {
            let user: IUser | null = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ msg: USER_EXISTS });
            }

            user = new User({
                name,
                email,
                password
            });

            const salt: string = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload: Object = {
                user: {
                    id: <String>user.id
                }
            };

            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: 3600000
            }, (err, token) => {
                if (err) throw err;
                res.json({ token })
            }
            );

        } catch (error) {
            console.error(error.message);
            res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
        }
    });
