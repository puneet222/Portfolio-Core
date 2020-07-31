import express, { Router, Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR, UPDATE_SUCCESS } from "../appConstants";
import { IHits } from "../models/Hits";
import AuthMiddleware from "../middleware/auth";
import HitsService from '../services/hitsService';
import { AuthRequest } from './routes.interface';

export const hitsRouter: Router = express.Router();

// @route       GET api/hits
// @desc        Get Hits
// @access      private

hitsRouter.get('/', AuthMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        let userId: string = req.user?.id ? req.user?.id : '';
        const hits: Array<IHits> = await HitsService.getHits(userId);
        res.json(hits);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

// @route       POST api/hits
// @desc        Create/Update(Increment) Hits
// @access      private

hitsRouter.post('/', AuthMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        let userId: string = req.user?.id ? req.user?.id : '';
        await HitsService.updateHits(userId);
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
