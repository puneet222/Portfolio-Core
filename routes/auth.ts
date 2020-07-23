import { Response, Request } from "express";
import { INVALID_EMAIL_MESSAGE, EMAIL, PASSWORD, NO_PASSWORD_MESSAGE, INVALID_CREDENTIALS, INTERNAL_SERVER_ERROR } from "../appConstants";
import { IUser } from "../models/User";
import { Error } from "mongoose";

const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../models/User');

// @route       GET api/auth
// @desc        Get logged in User
// @access      Private

router.get('/', (req: Request, res: Response) => {
    res.send("Get Logged in user")
});

// @route       POST api/auth
// @desc        Auth user get token
// @access      Public

router.post('/', [
    check(EMAIL, INVALID_EMAIL_MESSAGE).isEmail(),
    check(PASSWORD, NO_PASSWORD_MESSAGE).exists()
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
    const { email, password } = <any>req.body;

    try {
        let user: IUser = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: INVALID_CREDENTIALS })
        }

        let isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: INVALID_CREDENTIALS });
        }

        const payload = {
            user: {
                id: <String>user.id
            }
        };

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 36000
        }, (err: Error, token: String) => {
            if (err) throw err;
            res.json({ token })
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

module.exports = router;