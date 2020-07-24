import express, { Router, Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR, UPDATE_SUCCESS } from "../appConstants";
import Hits, { IHits } from "../models/Hits";
import AuthMiddleware from "../middleware/auth";

export const hitsRouter: Router = express.Router();

// @route       GET api/hits
// @desc        Get Hits
// @access      public

hitsRouter.get('/', async (req: Request, res: Response) => {
    try {
        const hits: Array<IHits> = await Hits.find({});
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
        const hitsData: Array<IHits> = await Hits.find({});
        let hits: IHits = new Hits({ hits: 1 });;
        if (hitsData.length > 0) {
            let updatedHits: IHits['hits'] = hitsData[0]["hits"] + 1;
            let _id: string = hitsData[0]["_id"];
            let newData: Object = {
                hits: updatedHits
            }
            await Hits.findOneAndUpdate({ _id }, newData, { upsert: true });
            res.json({ msg: UPDATE_SUCCESS });
        } else {
            await hits.save();
            res.json(hits);
        }
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
        await Hits.deleteOne({ _id });
        res.json({ deleted: _id });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});
