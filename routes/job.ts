import { INTERNAL_SERVER_ERROR, UPDATE_SUCCESS } from "../appConstants";
import { IJob } from "../models/Job";

const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const auth = require('../middleware/auth');

// @route       GET api/job
// @desc        Get Jobs
// @access      public

router.get('/', async (req: Request, res: any) => {
    try {
        const jobs: any = await Job.find({});
        res.json(jobs);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

// @route       POST api/job
// @desc        Create Job
// @access      private

router.post('/', auth, async (req: any, res: any) => {
    try {
        const {
            company,
            role,
            startDate,
            endDate,
            workInfo,
            techStack,
            imageLink
        } = <any>req.body;

        const job: IJob = new Job({
            company,
            role,
            startDate,
            endDate,
            workInfo,
            techStack,
            imageLink
        });
        await job.save();
        res.json(job);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

// @route       PUT api/job
// @desc        UPDATE Job
// @access      private

router.put('/', auth, async (req: Request, res: any) => {
    try {
        const {
            company,
            role,
            startDate,
            endDate,
            workInfo,
            techStack,
            imageLink,
            _id
        } = <any>req.body;

        const newData = {
            company,
            role,
            startDate,
            endDate,
            workInfo,
            techStack,
            imageLink,
        }
        await Job.findOneAndUpdate({ _id }, newData, { upsert: true });
        res.json({ msg: UPDATE_SUCCESS });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

// @route       DELETE api/job
// @desc        Delete Job
// @access      private

router.delete('/', auth, async (req: any, res: any) => {
    try {
        const { _id } = req.body;
        await Job.deleteOne({ _id });
        res.json({ deleted: _id });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

module.exports = router;