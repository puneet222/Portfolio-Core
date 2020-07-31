import { Request } from 'express';

export interface UserType {
    id?: string;
    name?: string;
    email: string;
    password: string;
}
export interface AuthRequest extends Request {
    user?: UserType;
}

export interface JWTPayload {
    user: {
        id: string
    };
}

export interface AuthResponse {
    isAuthenticated: boolean;
    user?: UserType;
}

export interface CertificateType {
    user?: string;
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
    user?: string;
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