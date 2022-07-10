import jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import { IncomingHttpHeaders } from 'http';

interface Auth {
    Authorization: string;
}

interface CustomRequest extends Request {
    headers: IncomingHttpHeaders & Auth
}

export function isAuthorized(req: CustomRequest, res: Response, next: NextFunction) {
    try {
        const { authorization } = req.headers;
    
        const tokenVerification = jwt.verify(authorization, process.env.JWT_KEY) as {id: string};
    
        if(!tokenVerification) {
            res.status(401).json({message: 'You shall not pass'});
        }
        if(tokenVerification) {
            res.locals.userId = tokenVerification.id;
        }
    
        return next();
    } catch(error) {
        console.error(error);
        res.status(401).json({message: 'You shall not pass'});
    }
}