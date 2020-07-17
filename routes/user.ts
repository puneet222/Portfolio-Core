import { Response } from "express";

const express = require('express');
const router = express.Router();


// @route       GET api/user
// @desc        Get users
// @access      Private

router.get('/', (req: Request, res: Response) => {
    res.send("Get user")
});

// @route       POST api/user
// @desc        Add users
// @access      Private

router.post('/', (req: Request, res: Response) => {
    res.send("Add user")
});

module.exports = router;