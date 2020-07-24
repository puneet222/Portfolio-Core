import { UNAUTHORIZED, NO_TOKEN_MESSAGE } from "../appConstants";
import express, { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
const config = require('config');

export interface User {
    id: string;
}
export interface MiddlewareRequest extends Request {
    user?: User;
}

const AuthMiddleware = (req: MiddlewareRequest, res: Response, next: express.NextFunction) => {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: NO_TOKEN_MESSAGE });
    }

    try {
        let decoded: any = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error(err.message);
        return res.status(401).json({ msg: UNAUTHORIZED });
    }
}

export default AuthMiddleware;
