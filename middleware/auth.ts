import { UNAUTHORIZED, NO_TOKEN_MESSAGE } from "../appConstants";

const jwt = require('jsonwebtoken');
const config = require('config');

const AuthMiddleware = (req: any, res: any, next: any) => {
    // Get token from header
    const token = req.header('x-auth-token');

    // Check if not token
    if (!token) {
        return res.status(401).json({ msg: NO_TOKEN_MESSAGE });
    }

    try {
        let decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error(err.message);
        return res.status(401).json({ msg: UNAUTHORIZED });
    }
}

module.exports = AuthMiddleware;