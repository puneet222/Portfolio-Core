import express, { Router, Request, Response } from "express";
import { INTERNAL_SERVER_ERROR, UPDATE_SUCCESS } from "../appConstants";
import Skill, { ISkill } from "../models/Skill";
import AuthMiddleware from "../middleware/auth";
import { SkillType } from "./routes.interface";
import SkillService from "../services/skillService";

export const skillRouter: Router = express.Router();

// @route       GET api/skill
// @desc        Get Skills
// @access      public

skillRouter.get('/', async (req: Request, res: Response) => {
    try {
        const skills: Array<ISkill> = await SkillService.getSkills();
        res.json(skills);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

// @route       POST api/skill
// @desc        Create Skill
// @access      private

skillRouter.post('/', AuthMiddleware, async (req: Request, res: Response) => {
    try {
        const skillData: SkillType = req.body;
        const skill: ISkill = await SkillService.createSkill(skillData);
        res.json(skill);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

// @route       PUT api/skill
// @desc        UPDATE Skill
// @access      private

skillRouter.put('/', AuthMiddleware, async (req: Request, res: Response) => {
    try {
        const newData: SkillType = req.body;
        await SkillService.updateSkill(newData);
        res.json({ msg: UPDATE_SUCCESS });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

// @route       DELETE api/skill
// @desc        Delete Skill
// @access      private

skillRouter.delete('/', AuthMiddleware, async (req: Request, res: Response) => {
    try {
        const { _id } = req.body;
        await SkillService.deleteSkill(_id);
        res.json({ deleted: _id });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});
