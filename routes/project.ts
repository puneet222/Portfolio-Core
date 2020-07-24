import { INTERNAL_SERVER_ERROR, UPDATE_SUCCESS } from "../appConstants";
import { IProject } from "../models/Project";

const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');

// @route       GET api/project
// @desc        Get Projects
// @access      public

router.get('/', async (req: Request, res: any) => {
    try {
        const projects: any = await Project.find({});
        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

// @route       POST api/project
// @desc        Create Project
// @access      private

router.post('/', auth, async (req: any, res: any) => {
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
        } = <any>req.body;

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

router.put('/', auth, async (req: Request, res: any) => {
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
        } = <any>req.body;

        const newData = {
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

router.delete('/', auth, async (req: any, res: any) => {
    try {
        const { _id } = req.body;
        await Project.deleteOne({ _id });
        res.json({ deleted: _id });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

module.exports = router;