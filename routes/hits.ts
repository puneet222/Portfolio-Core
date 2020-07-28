import express, { Router, Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR, UPDATE_SUCCESS } from "../appConstants";
import Hits, { IHits } from "../models/Hits";
import AuthMiddleware from "../middleware/auth";
import { HitsType } from './routes.interface';
import HitsService from '../services/hitsService';

export const hitsRouter: Router = express.Router();

// @route       GET api/hits
// @desc        Get Hits
// @access      public

hitsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const hits: Array<IHits> = await HitsService.getHits();
        res.json(hits);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

// @route       POST api/hits
// @desc        Create/Update(Increment) Hits
// @access      public

hitsRouter.post('/', async (req: Request, res: Response) => {
    try {
        await HitsService.updateHits();
        res.json({ msg: UPDATE_SUCCESS });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});


// @route       DELETE api/hits
// @desc        Delete Hits
// @access      private

hitsRouter.delete('/', AuthMiddleware, async (req: Request, res: Response) => {
    try {
        const { _id } = req.body;
        await HitsService.deleteHits(_id);
        res.json({ deleted: _id });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});
