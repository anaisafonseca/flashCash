import { Request, Response } from 'express';
import { Transactions } from '../models/transactions';
import { Users } from '../models/users';

// const transactionsSchema = new mongoose.Schema({
//     title: String,
//     amount: Number,
//     type: String,
//     category: String,
//     date: Date,
//     user: ObjectId,
// });

export async function createTransaction(request: Request,response: Response) {
    try{
        const { title,amount,type,category } = request.body;
        const user = response.locals.userId;
        const date = new Date();
        
        const transaction = await Transactions.create({title,amount,type,category,date,user});
        transaction.save();

        return response.status(201).json(transaction);

    } catch(error) {
        console.error(error);
        return response.status(500).json(error);
    }
}

export async function editTransaction(request: Request,response: Response) {
    try{
        const data = request.body;

        const transaction = await Transactions.findOneAndUpdate({_id:data._id}, data, {new: true});

        return response.status(200).json(transaction);

    } catch(error) {
        console.error(error);
        return response.status(500).json(error);
    }
}

export async function deleteTransaction(request: Request,response: Response) {
    try{
        const { id } = request.params;
        
        await Transactions.findByIdAndDelete({_id:id});

        return response.status(200).send('Deleted successfully.');

    } catch(error) {
        console.error(error);
        return response.status(500).json(error);
    }
}

export async function getTransactions(request: Request, response: Response) {
    try{
        const userId = response.locals.userId;
        
        const user = await Users.findOne({_id:userId});
        if(!user){
            return response.send('User not found.');
        }
        const transactions = await Transactions.find({user:userId}).sort({date: -1});

        return response.json(transactions);

    }catch(error){
        console.log(error);
        return response.status(500).json(error);
    }
}