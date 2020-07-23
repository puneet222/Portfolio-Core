import { INTERNAL_SERVER_ERROR, UPDATE_SUCCESS } from "../appConstants";
import { ISkill } from "../models/Skill";

const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');
const auth = require('../middleware/auth');

// @route       GET api/skill
// @desc        Get Skills
// @access      public

router.get('/', async (req: Request, res: any) => {
    try {
        const skills: any = await Skill.find({});
        res.json(skills);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

// @route       POST api/skill
// @desc        Create Skill
// @access      private

router.post('/', auth, async (req: any, res: any) => {
    try {
        const {
            name,
            proficiency,
            imageLink
        } = <any>req.body;

        const skill: ISkill = new Skill({
            name,
            proficiency,
            imageLink
        });
        await skill.save();
        res.json(skill);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

// @route       PUT api/skill
// @desc        UPDATE Skill
// @access      private

router.put('/', auth, async (req: Request, res: any) => {
    try {
        const {
            name,
            proficiency,
            imageLink,
            _id
        } = <any>req.body;

        const newData = {
            name,
            proficiency,
            imageLink
        }
        await Skill.findOneAndUpdate({ _id }, newData, { upsert: true });
        res.json({ msg: UPDATE_SUCCESS });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

// @route       DELETE api/skill
// @desc        Delete Skill
// @access      private

router.delete('/', auth, async (req: any, res: any) => {
    try {
        const { _id } = req.body;
        await Skill.deleteOne({ _id });
        res.json({ deleted: _id });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: INTERNAL_SERVER_ERROR });
    }
});

module.exports = router;