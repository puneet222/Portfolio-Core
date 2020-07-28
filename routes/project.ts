import express, { Router, Request, Response } from "express";
import { INTERNAL_SERVER_ERROR, UPDATE_SUCCESS } from "../appConstants";
import Project, { IProject } from "../models/Project";
import AuthMiddleware from "../middleware/auth";
import { ProjectType } from "./routes.interface";
import ProjectService from "../services/projectService";

export const projectRouter: Router = express.Router();

// @route       GET api/project
// @desc        Get Projects
// @access      public

projectRouter.get('/', async (req: Request, res: Response) => {
    try {
        const projects: Array<IProject> = await ProjectService.getProjects();
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
        const projectData: ProjectType = req.body;
        const project: IProject = await ProjectService.createProject(projectData);
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
        const newData: ProjectType = req.body;
        await ProjectService.updateProject(newData);
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
        await ProjectService.deleteProject(_id);
        res.json({ deleted: _id });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});
