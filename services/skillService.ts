import { SkillType } from "../routes/routes.interface";
import Skill, { ISkill } from "../models/Skill";

class SkillService {
    static getSkills() {
        try {
            return Skill.find({});
        } catch (error) {
            throw error;
        }
    }

    static createSkill(skillData: SkillType) {
        try {
            const skill: ISkill = new Skill(skillData);
            return skill.save();
        } catch (error) {
            throw error;
        }
    }

    static updateSkill(skillData: SkillType) {
        try {
            return Skill.findOneAndUpdate({ _id: skillData._id }, skillData, { upsert: true });
        } catch (error) {
            throw error;
        }
    }

    static deleteSkill(_id: string) {
        try {
            return Skill.deleteOne({ _id });
        } catch (error) {
            throw error;
        }
    }
}

export default SkillService;