import { compare } from 'bcryptjs';
import { Request, Response } from "express";
import { IncomingHttpHeaders } from 'http';
import jwt from 'jsonwebtoken';
import { Users } from '../models/users';

interface Auth {
    refresh_token: string;
}

interface CustomRequest extends Request {
    headers: IncomingHttpHeaders & Auth
}

export async function login(request: Request, response: Response) {
    try {
        const { email, password } = request.body;

        const user = await Users.findOne({email});

        if(!user){
            return response.status(400).json({message: 'User does not exist.'});
        }

        if(!await compare(password, String(user.password))) {
            return response.status(400).json({message: 'Incorrect password.'});
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: '1 day' });
        const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: '7 days' });

        return response.status(200).json({user, token, refreshToken});

    } catch(error) {
        console.error(error);
        return response.status(500).json(error);
    }
}

export async function refreshTokens(request: CustomRequest, response: Response) {
    try {
        const { refresh_token } = request.headers;

        if(!refresh_token){
            response.status(401).json({message: 'Refresh token is required.'});
        }

        const refreshTokenVerification = jwt.verify(refresh_token, process.env.JWT_KEY) as {id: string};

        if(refreshTokenVerification) {
            const token = jwt.sign({ id: refreshTokenVerification.id }, process.env.JWT_KEY, { expiresIn: '1 day' });
            const refreshToken = jwt.sign({ id: refreshTokenVerification.id }, process.env.JWT_KEY, { expiresIn: '7 days' });

            return response.status(200).json({token, refreshToken});
        }

        return response.status(401).json({message: 'Unauthorized.'})

    } catch(error) {
        console.error(error);
        return response.status(500).json(error);
    }
}