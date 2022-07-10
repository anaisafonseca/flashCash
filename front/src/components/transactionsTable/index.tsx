import { useState } from 'react';
import trash from '../../assets/delete.svg';
import edit from '../../assets/edit.svg';
import { useTransactions } from '../../hooks/useTransactions';
import { MiniLoader } from '../miniLoader';
import { Container } from './styles';


export function TransactionsTable() {
    const { transactions, deleteTransaction, toggleNewTransation, editAmount, tableLoading } = useTransactions();


    return (
        <Container>
            {tableLoading ? <MiniLoader/> :
                transactions.length === 0 ? <span>Não há transações cadastradas. :(</span> :
                    <table>
                        <thead>
                            <tr>
                                <th>Título</th>
                                <th>Valor</th>
                                <th>Categoria</th>
                                <th>Data</th>
                            </tr>
                        </thead>

                        <tbody>
                            {transactions?.map(transaction => (
                                <tr key={transaction._id}>
                                    <td>{transaction.title}</td>
                                    <td className={transaction.type}>
                                        {new Intl.NumberFormat('pt-BR', {
                                            style: 'currency',
                                            currency: 'BRL'
                                        }).format(transaction.amount)}
                                    </td>
                                    <td>{transaction.category}</td>
                                    <td className='dateColumn'>
                                        {new Intl.DateTimeFormat('pt-BR')
                                        .format(new Date(transaction.date))}
                                    </td>
                                    <td className='iconColumn'>
                                        <button 
                                            type="button"
                                            onClick={() => toggleNewTransation(transaction)}
                                        >
                                            <img src={edit} alt='Editar transação'/>
                                        </button>
                                        <button 
                                            type="button"
                                            onClick={() => {
                                                deleteTransaction(transaction._id);
                                                editAmount(null, null, transaction.amount, transaction.type);
                                            }}
                                        >
                                            <img src={trash} alt='Apagar transação'/>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            }
        </Container>
    );
}