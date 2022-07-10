export interface User {
    _id: string;
    name: String;
    email: String;
    password: String;
    amount: {
        deposits: number;
        debits: number;
        total: number;
    }
}