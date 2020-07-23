import { Response } from "express";
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

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// @route       GET api/user
// @desc        Get users
// @access      Private

router.get('/', (req: Request, res: Response) => {
    res.send(req.body);
});

// @route       POST api/user
// @desc        Add users
// @access      Private

router.post('/', [
    check(NAME, NO_NAME_MESSAGE).not().isEmpty(),
    check(EMAIL, INVALID_EMAIL_MESSAGE).isEmail(),
    check(PASSWORD, INVALID_PASSWORD_MESSAGE).isLength({ min: 6 })
],
    async (req: Request, res: Response) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { name, email, password } = <any>req.body;

        try {
            let user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({ msg: USER_EXISTS });
            }

            user = new User({
                name,
                email,
                password
            });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: <String>user.id
                }
            };

            jwt.sign(payload, config.get('jwtSecret'), {
                expiresIn: 3600000
            }, (err: Error, token: String) => {
                if (err) throw err;
                res.json({ token })
            }
            );

        } catch (error) {
            res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
        }
    });

module.exports = router;