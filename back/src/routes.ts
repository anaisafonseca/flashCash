import { Router } from "express";
import { createUser, editUser, getUser } from "./controllers/userController";
import { createTransaction, deleteTransaction, editTransaction, getTransactions } from "./controllers/transactionController";
import { isAuthorized } from './middleware/auth'
import { login, refreshTokens } from "./controllers/authController";

const router = Router();

router.get('/refreshTokens', refreshTokens);

router.post('/login', login);
router.post('/createUser', createUser);

router.put('/editUser', isAuthorized, editUser);
router.get('/getUser', isAuthorized, getUser);

router.post('/createTransaction', isAuthorized, createTransaction);
router.put('/editTransaction', isAuthorized, editTransaction);
router.delete('/deleteTransaction/:id', isAuthorized, deleteTransaction);
router.get('/getTransactions', isAuthorized, getTransactions);


export { router };