import express, { Router, Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR, UPDATE_SUCCESS } from "../appConstants";
import Job, { IJob } from "../models/Job";
import AuthMiddleware from "../middleware/auth";
import { JobType } from './routes.interface';

export const jobRouter: Router = express.Router();

// @route       GET api/job
// @desc        Get Jobs
// @access      public

jobRouter.get('/', async (req: Request, res: Response) => {
    try {
        const jobs: Array<IJob> = await Job.find({});
        res.json(jobs);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

// @route       POST api/job
// @desc        Create Job
// @access      private

jobRouter.post('/', AuthMiddleware, async (req: Request, res: Response) => {
    try {
        const {
            company,
            role,
            startDate,
            endDate,
            workInfo,
            techStack,
            imageLink
        } = req.body;

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

jobRouter.put('/', AuthMiddleware, async (req: Request, res: Response) => {
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
        } = req.body;

        const newData: JobType = {
            company,
            role,
            startDate,
            endDate,
            workInfo,
            techStack,
            imageLink
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

jobRouter.delete('/', AuthMiddleware, async (req: Request, res: Response) => {
    try {
        const { _id } = req.body;
        await Job.deleteOne({ _id });
        res.json({ deleted: _id });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});
