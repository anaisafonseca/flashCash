import { Request, Response } from 'express';
import { Users } from '../models/users';
import { hash } from 'bcryptjs';

// {
//     name: String,
//     email: String,
//     password: String,
//     amount: {
//         deposits: Number,
//         debits: Number,
//         total: Number
//     }
// }

export async function createUser(request: Request,response: Response) {
    try{
        const { name,email,password } = request.body;

        const existingUser = await Users.findOne({email});
        if(existingUser){
            return response.status(400).json({message: 'User already exists.'})
        }
        if(!password || password.length < 6) {
            return response.status(400).json({message: 'Password must be at least 6 characters.'})
        }

        const passwordHash = await hash(password, 8);
        
        const user = await Users.create({name,email,password: passwordHash});
        user.save();
        delete user.password;

        return response.status(201).json(user);

    } catch(error) {
        console.error(error);
        return response.status(500).json(error);
    }
}

export async function editUser(request: Request,response: Response) {
    try{
        const { amount } = request.body;
        const id = response.locals.userId;

        const user = await Users.findOneAndUpdate({_id:id}, {amount:amount}, {new: true});

        return response.status(200).json(user);

    } catch(error) {
        console.error(error);
        return response.status(500).json(error);
    }
}

export async function getUser(request: Request, response: Response) {
    try{
        const userId = response.locals.userId;
        
        const user = await Users.findOne({_id:userId});
        if(!user){
            return response.send('User not found.');
        }

        return response.json(user);

    }catch(error){
        console.log(error);
        return response.status(500).json(error);
    }
}