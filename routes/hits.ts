import { INTERNAL_SERVER_ERROR, UPDATE_SUCCESS } from "../appConstants";
import { IHits } from "../models/Hits";

const express = require('express');
const router = express.Router();
const Hits = require('../models/Hits');
const auth = require('../middleware/auth');

// @route       GET api/hits
// @desc        Get Hits
// @access      public

router.get('/', async (req: Request, res: any) => {
    try {
        const hits: any = await Hits.find({});
        res.json(hits);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

// @route       POST api/hits
// @desc        Create Hits
// @access      private

router.post('/', auth, async (req: any, res: any) => {
    try {
        const hitsData: any = await Hits.find({});
        let hits: IHits = new Hits({ hits: 1 });;
        if (hitsData.length > 0) {
            let updatedHits = hitsData[0]["hits"] + 1;
            let _id = hitsData[0]["_id"];
            let newData = {
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

router.delete('/', auth, async (req: any, res: any) => {
    try {
        const { _id } = req.body;
        await Hits.deleteOne({ _id });
        res.json({ deleted: _id });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

module.exports = router;