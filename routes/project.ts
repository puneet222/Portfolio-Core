import express, { Router, Request, Response } from "express";
import { INTERNAL_SERVER_ERROR, UPDATE_SUCCESS } from "../appConstants";
import Project, { IProject } from "../models/Project";
import AuthMiddleware from "../middleware/auth";
import { ProjectType } from "./routes.interface";

export const projectRouter: Router = express.Router();

// @route       GET api/project
// @desc        Get Projects
// @access      public

projectRouter.get('/', async (req: Request, res: Response) => {
    try {
        const projects: Array<IProject> = await Project.find({});
        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

// @route       POST api/project
// @desc        Create Project
// @access      private

projectRouter.post('/', AuthMiddleware, async (req: Request, res: Response) => {
    try {
        const {
            name,
            info,
            tech,
            images,
            link,
            githubLink,
            fromDate,
            toDate
        } = req.body;

        const project: IProject = new Project({
            name,
            info,
            tech,
            images,
            link,
            githubLink,
            fromDate,
            toDate
        });
        await project.save();
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

// @route       PUT api/project
// @desc        UPDATE Project
// @access      private

projectRouter.put('/', AuthMiddleware, async (req: Request, res: Response) => {
    try {
        const {
            name,
            info,
            tech,
            images,
            link,
            githubLink,
            fromDate,
            toDate,
            _id
        } = req.body;

        const newData: ProjectType = {
            name,
            info,
            tech,
            images,
            link,
            githubLink,
            fromDate,
            toDate
        }
        await Project.findOneAndUpdate({ _id }, newData, { upsert: true });
        res.json({ msg: UPDATE_SUCCESS });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

// @route       DELETE api/project
// @desc        Delete Project
// @access      private

projectRouter.delete('/', AuthMiddleware, async (req: Request, res: Response) => {
    try {
        const { _id } = req.body;
        await Project.deleteOne({ _id });
        res.json({ deleted: _id });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});
