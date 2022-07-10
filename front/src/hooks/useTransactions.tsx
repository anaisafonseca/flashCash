import axios from "axios";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CreateOrEditTransaction } from "../components/createOrEditTransaction";
import { Loader } from "../components/loader";
import { TransactionInput, Transaction } from "../models/transactions";
import { User } from "../models/user";
import { useAuth } from "./useAuth";


interface TransactionsProviderProps {
    children: ReactNode;
}

interface TransactionsContextData {
    transactions: Transaction[];
    createTransaction: (transaction: TransactionInput) => void;
    deleteTransaction: (id: string) => void;
    editTransaction: (transaction: TransactionInput) => void;
    toggleNewTransation: (transaction?: TransactionInput) => void;
    editAmount: (
        newValue?: number|null, 
        newType?: string|null, 
        oldValue?: number|null, 
        oldType?: string|null
    ) => void;
    setLoading: (boolean: boolean) => void;
    tableLoading: boolean;
    getTransactions: () => void;
}


const TransactionsContext = createContext<TransactionsContextData>({} as TransactionsContextData);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [modalTransaction, setModalTransaction] = useState<TransactionInput>();
    const [isNewTransactionOpen, setIsNewTransactionOpen] = useState(false);
    const { user } = useAuth();
    const [ loading, setLoading ] = useState(false);
    const [ tableLoading, setTableLoading ] = useState(true);

    function toggleNewTransation(transaction?: TransactionInput) {
        if(!isNewTransactionOpen && transaction) {
            setModalTransaction(transaction);
        } else {
            setModalTransaction(undefined);
        }
        setIsNewTransactionOpen(!isNewTransactionOpen);
    }

    const getTransactions = useCallback(async () => {
        try {
            const { data } = await axios.get<Transaction[]>('/getTransactions');
            setTransactions([...data]) ;
    
        } finally {
            setTableLoading(false);
        }
    },[])

    async function createTransaction(transactionInput: TransactionInput) {
        try {
            setTableLoading(true);
            const response = await axios.post('/createTransaction', {
                ...transactionInput,
                date: new Date(),
                user: user?._id
            });
    
            const transaction = response.data;
    
            setTransactions([
                transaction,
                ...transactions
            ]);
    
            editAmount(transactionInput.amount, transactionInput.type, null, null)
            toast.success('Cadastrada com sucesso!');

        } finally {
            setTableLoading(false);
        }
    }

    async function deleteTransaction(id: string) {
        try {
            setTableLoading(true);
            await axios.delete(`/deleteTransaction/${id}`);
    
            setTransactions(transactions.filter(({_id}) => id !== _id));
            toast.success('Excluída com sucesso!');
        } finally {
            setTableLoading(false);
        }
    }

    async function editTransaction(transactionInput: TransactionInput) {
        try {
            setTableLoading(true);
            await axios.put('/editTransaction', transactionInput);
    
            const oldTransaction = transactions.find(({_id}) => _id === transactionInput._id);
    
            if(oldTransaction) {
                const transactionIndex = transactions.indexOf(oldTransaction);
                transactions[transactionIndex] = {...oldTransaction, ...transactionInput};
            }
            
            setTransactions([...transactions]);
    
            toast.success('Editada com sucesso!');
            editAmount(transactionInput.amount, transactionInput.type, oldTransaction?.amount, oldTransaction?.type)

        } finally {
            setTableLoading(false);
        }
    }

    async function editAmount(newValue?: number|null, newType?: string|null, oldValue?: number|null, oldType?: string|null) {
        try {
            setLoading(true);
            if(user) {
                if(oldValue && newValue) {  // edição
                    if(oldType === newType) {
                        if(newType === 'deposit') {
                            user.amount.deposits -= oldValue;
                            user.amount.deposits += newValue;
                        } else {
                            user.amount.debits -= oldValue;
                            user.amount.debits += newValue;
                        }
                    } else {
                        if(newType === 'deposit') {
                            user.amount.debits -= oldValue;
                            user.amount.deposits += newValue;
                        } else {
                            user.amount.deposits -= oldValue;
                            user.amount.debits += newValue;
                        }   
                    }
                } else if(oldValue && !newValue) {  // exclusão
                    if(oldType === 'deposit') {
                        user.amount.deposits -= oldValue;
                    } else {
                        user.amount.debits -= oldValue;
                    }
                } else if(!oldValue && newValue) {  // inclusão
                    if(newType === 'deposit') {
                        user.amount.deposits += newValue;
                    } else {
                        user.amount.debits += newValue;
                    }
                }
                user.amount.total = user.amount.deposits - user.amount.debits;
                
                await axios.put('/editUser', {
                    amount: user.amount
                });
            }

        } finally {
            setLoading(false);
        }

    }


    return (
        <TransactionsContext.Provider 
            value={{ 
                transactions, 
                createTransaction, 
                deleteTransaction, 
                editTransaction, 
                toggleNewTransation, 
                editAmount, 
                setLoading,
                tableLoading,
                getTransactions
            }}
        >
            <>
                {loading ? <Loader/> : children}
                <CreateOrEditTransaction 
                    isOpen={isNewTransactionOpen}
                    onRequestClose={() => toggleNewTransation()}
                    isEditing={!!modalTransaction}
                    transaction={modalTransaction}
                />
            </>
        </TransactionsContext.Provider>
    )
}

export function useTransactions() {
    return useContext(TransactionsContext);
}