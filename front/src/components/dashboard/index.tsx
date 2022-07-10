import { useEffect } from 'react';
import { useTransactions } from '../../hooks/useTransactions';
import { AmountCards } from '../amountCards';
import { TransactionsTable } from '../transactionsTable';
import { Container } from './styles';

export function Dashboard() {
    const { getTransactions } = useTransactions();

    useEffect(() => {
        getTransactions();
    },[getTransactions])


    return (
        <Container>
            <AmountCards/>
            <TransactionsTable/>
        </Container>
    );
}