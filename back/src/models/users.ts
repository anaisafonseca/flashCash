import mongoose from 'mongoose';
import { defaultValue, required } from '../utils/mongooseSchema';

const usersSchema = new mongoose.Schema({
    name: required(String),
    email: required(String),
    password: required(String),
    amount: {
        deposits: defaultValue(Number),
        debits: defaultValue(Number),
        total: defaultValue(Number)
    }
});
const Users = mongoose.model('User', usersSchema);

export { Users };
