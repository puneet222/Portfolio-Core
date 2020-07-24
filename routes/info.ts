import express, { Router, Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR, UPDATE_SUCCESS } from "../appConstants";
import Info, { IInfo } from "../models/Info";

export const infoRouter: Router = express.Router();

const auth = require('../middleware/auth');

// @route       GET api/info
// @desc        Get Infos
// @access      public

infoRouter.get('/', async (req: Request, res: Response) => {
    try {
        const infos: Array<IInfo> = await Info.find({}).sort({ date: -1 });
        res.json(infos);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

// @route       POST api/info
// @desc        Create Info
// @access      private

infoRouter.post('/', auth, async (req: Request, res: Response) => {
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
        } = req.body;

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

infoRouter.put('/', auth, async (req: Request, res: Response) => {
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
        } = req.body;

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

infoRouter.delete('/', auth, async (req: Request, res: Response) => {
    try {
        const { _id } = req.body;
        await Info.deleteOne({ _id });
        res.json({ deleted: _id });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});
