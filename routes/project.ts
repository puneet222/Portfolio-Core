import express, { Router, Request, Response } from "express";
import { INTERNAL_SERVER_ERROR, UPDATE_SUCCESS } from "../appConstants";
import { IProject } from "../models/Project";
import AuthMiddleware from "../middleware/auth";
import { ProjectType, AuthRequest } from "./routes.interface";
import ProjectService from "../services/projectService";

export const projectRouter: Router = express.Router();

// @route       GET api/project
// @desc        Get Projects
// @access      private

projectRouter.get('/', AuthMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        let userId: string = req.user?.id ? req.user?.id : '';
        const projects: Array<IProject> = await ProjectService.getProjects(userId);
        return res.json(projects);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

// @route       POST api/project
// @desc        Create Project
// @access      private

projectRouter.post('/', AuthMiddleware, async (req: AuthRequest, res: Response) => {
    try {
        const projectData: ProjectType = req.body;
        projectData.user = req.user?.id;
        const project: IProject = await ProjectService.createProject(projectData);
        return res.json(project);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

// @route       PUT api/project
// @desc        UPDATE Project
// @access      private

projectRouter.put('/', AuthMiddleware, async (req: Request, res: Response) => {
    try {
        const newData: ProjectType = req.body;
        await ProjectService.updateProject(newData);
        return res.json({ msg: UPDATE_SUCCESS });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

// @route       DELETE api/project
// @desc        Delete Project
// @access      private

projectRouter.delete('/', AuthMiddleware, async (req: Request, res: Response) => {
    try {
        const { _id } = req.body;
        await ProjectService.deleteProject(_id);
        return res.json({ deleted: _id });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});
