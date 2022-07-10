export interface Transaction {
    _id: string;
    title: string;
    amount: number;
    type: string;
    category: string;
    user: string;
    date: string;
}

export interface TransactionInput {
    _id?: string;
    title: string;
    amount: number;
    type: string;
    category: string;
    user?: string;
}