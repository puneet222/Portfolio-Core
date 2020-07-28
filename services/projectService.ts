import { ProjectType } from "../routes/routes.interface";
import Project, { IProject } from "../models/Project";

class ProjectService {
    static getProjects() {
        try {
            return Project.find({});
        } catch (error) {
            throw error;
        }
    }

    static createProject(projectData: ProjectType) {
        try {
            const project: IProject = new Project(projectData);
            return project.save();
        } catch (error) {
            throw error;
        }
    }

    static updateProject(projectData: ProjectType) {
        try {
            return Project.findOneAndUpdate({ _id: projectData._id }, projectData, { upsert: true });
        } catch (error) {
            throw error;
        }
    }

    static deleteProject(_id: string) {
        try {
            return Project.deleteOne({ _id });
        } catch (error) {
            throw error;
        }
    }
}

export default ProjectService;