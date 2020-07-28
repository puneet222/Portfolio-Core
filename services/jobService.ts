import { JobType } from "../routes/routes.interface";
import Job, { IJob } from "../models/Job";

class JobService {
    static getJobs() {
        try {
            return Job.find({});
        } catch (error) {
            throw error
        }
    }

    static createJob(jobData: JobType) {
        try {
            const job: IJob = new Job(jobData);
            return job.save();
        } catch (error) {
            throw error;
        }
    }

    static updateJob(jobData: JobType) {
        try {
            return Job.findOneAndUpdate({ _id: jobData._id }, jobData, { upsert: true });
        } catch (error) {
            throw error;
        }
    }

    static deleteJob(_id: string) {
        try {
            return Job.deleteOne({ _id });
        } catch (error) {
            throw error;
        }
    }
}

export default JobService;