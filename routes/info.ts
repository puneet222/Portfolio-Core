import { INTERNAL_SERVER_ERROR, UPDATE_SUCCESS } from "../appConstants";
import { IInfo } from "../models/Info";

const express = require('express');
const router = express.Router();
const Info = require('../models/Info');
const auth = require('../middleware/auth');

// @route       GET api/info
// @desc        Get Infos
// @access      public

router.get('/', async (req: Request, res: any) => {
    try {
        const infos: any = await Info.find({}).sort({ date: -1 });
        res.json(infos);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

// @route       POST api/info
// @desc        Create Info
// @access      private

router.post('/', auth, async (req: any, res: any) => {
    try {
        const {
            email,
            name,
            phone,
            introduction,
            website,
            github,
            linkedIn,
            resume
        } = <any>req.body;

        const info: IInfo = new Info({
            email,
            name,
            phone,
            introduction,
            website,
            github,
            linkedIn,
            resume
        });
        await info.save();
        res.json(info);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

// @route       PUT api/info
// @desc        UPDATE Info
// @access      private

router.put('/', auth, async (req: Request, res: any) => {
    try {
        const {
            email,
            name,
            phone,
            introduction,
            website,
            github,
            linkedIn,
            resume,
            _id
        } = <any>req.body;

        const newData = {
            email,
            name,
            phone,
            introduction,
            website,
            github,
            linkedIn,
            resume
        }
        await Info.findOneAndUpdate({ _id }, newData, { upsert: true });
        res.json({ msg: UPDATE_SUCCESS });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

// @route       DELETE api/info
// @desc        Delete Info
// @access      private

router.delete('/', auth, async (req: any, res: any) => {
    try {
        const { _id } = req.body;
        await Info.deleteOne({ _id });
        res.json({ deleted: _id });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

module.exports = router;