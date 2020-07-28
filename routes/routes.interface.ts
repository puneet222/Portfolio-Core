import { Request } from 'express';

export interface User {
    id: string;
}
export interface AuthRequest extends Request {
    user?: User;
}

export interface JWTPayload {
    user: User;
}

export interface CertificateType {
    name: string;
    link: string;
    imageLink?: string;
    source: string;
    issueDate: Date;
    validTill?: Date;
    _id?: string;
}

export interface HitsType {
    hits: number;
}

export interface InfoType {
    email: string;
    name: string;
    phone: string;
    introduction: string;
    website: string;
    github: string;
    linkedIn: string;
    resume: string;
    _id?: string;
}

export interface JobType {
    company: string;
    role: string;
    startDate: Date;
    endDate?: Date;
    workInfo: string;
    techStack: Array<string>;
    imageLink?: string;
    _id?: string;
}

export interface ProjectType {
    name: string;
    info: string;
    tech: Array<string>;
    images: Array<string>;
    link?: string;
    githubLink: string;
    fromDate?: Date;
    toDate?: Date;
    _id?: string;
}

export interface SkillType {
    name: string;
    proficiency: number;
    imageLink: string;
    _id: string;
}