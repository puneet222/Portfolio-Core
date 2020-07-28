import express, { Router, Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR, UPDATE_SUCCESS } from "../appConstants";
import { IInfo } from "../models/Info";
import AuthMiddleware from "../middleware/auth";
import { InfoType } from './routes.interface';
import InfoService from '../services/infoService';

export const infoRouter: Router = express.Router();

// @route       GET api/info
// @desc        Get Infos
// @access      public

infoRouter.get('/', async (req: Request, res: Response) => {
    try {
        const infos: Array<IInfo> = await InfoService.getInfos();
        res.json(infos);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

// @route       POST api/info
// @desc        Create Info
// @access      private

infoRouter.post('/', AuthMiddleware, async (req: Request, res: Response) => {
    try {
        const infoData: InfoType = req.body;
        const info: IInfo = await InfoService.createInfo(infoData);
        res.json(info);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

// @route       PUT api/info
// @desc        UPDATE Info
// @access      private

infoRouter.put('/', AuthMiddleware, async (req: Request, res: Response) => {
    try {
        const infoData: InfoType = req.body; // implicit object destructuring
        await InfoService.updateInfo(infoData);
        res.json({ msg: UPDATE_SUCCESS });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

// @route       DELETE api/info
// @desc        Delete Info
// @access      private

infoRouter.delete('/', AuthMiddleware, async (req: Request, res: Response) => {
    try {
        const { _id } = req.body;
        await InfoService.deleteInfo(_id);
        res.json({ deleted: _id });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});
