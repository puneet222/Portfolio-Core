import { Response } from "express";

const express = require('express');
const router = express.Router();

// @route       GET api/auth
// @desc        Get logged in User
// @access      Private

router.get('/', (req: Request, res: Response) => {
    res.send("Get Logged in user")
});

// @route       POST api/auth
// @desc        Auth user get token
// @access      Public

router.post('/', (req: Request, res: Response) => {
    res.send("Auth user")
});

module.exports = router;