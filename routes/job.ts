import express, { Router, Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR, UPDATE_SUCCESS } from "../appConstants";
import { IJob } from "../models/Job";
import AuthMiddleware from "../middleware/auth";
import { JobType, AuthRequest } from './routes.interface';
import JobService from '../services/jobService';

export const jobRouter: Router = express.Router();

// @route       GET api/job
// @desc        Get Jobs
// @access      private

jobRouter.get('/', AuthMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        let userId: string = req.user?.id ? req.user?.id : '';
        const jobs: Array<IJob> = await JobService.getJobs(userId);
        res.json(jobs);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

// @route       POST api/job
// @desc        Create Job
// @access      private

jobRouter.post('/', AuthMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const jobData: JobType = req.body;
        jobData.user = req.user?.id;
        const job: IJob = await JobService.createJob(jobData);
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
        const newData: JobType = req.body;
        await JobService.updateJob(newData);
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
        await JobService.deleteJob(_id);
        res.json({ deleted: _id });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});
