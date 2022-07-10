import express from 'express';
import mongoose from 'mongoose';
import { router } from './routes';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

mongoose.connect(
    process.env.URL_DB
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("Connected to database.");
});

app.use(cors({
    origin: '*'
}));

app.use(express.json());
app.use(router);

export { app };