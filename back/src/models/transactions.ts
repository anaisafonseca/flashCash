import mongoose from "mongoose";
import { required } from '../utils/mongooseSchema'

const transactionsSchema = new mongoose.Schema({
    title: required(String),
    amount: required(Number),
    type: required(String),
    category: required(String),
    date: required(Date),
    user: required(mongoose.Types.ObjectId),
});
const Transactions = mongoose.model('Transaction', transactionsSchema);

export { Transactions };