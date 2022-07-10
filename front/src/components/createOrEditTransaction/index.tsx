import { FormEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import close from '../../assets/close.svg';
import debit from '../../assets/debit.svg';
import deposit from '../../assets/deposit.svg';
import { useTransactions } from '../../hooks/useTransactions';
import { TransactionInput, Transaction } from '../../models/transactions';
import { Container, TypeButton, TypesContainer } from './styles';

const emptyTransaction: TransactionInput = {
    title: '',
    amount: 0.0,
    type: 'deposit',
    category: ''
}

interface CreateOrEditTransactionProps {
    isOpen: boolean;
    onRequestClose: () => void;
    transaction?: Transaction | TransactionInput;
    isEditing?: boolean;
}

export function CreateOrEditTransaction({isOpen, onRequestClose, transaction=emptyTransaction, isEditing}: CreateOrEditTransactionProps) {
    const { editTransaction, createTransaction, editAmount } = useTransactions();

    const [title, setTitle] = useState(transaction.title);
    const [amount, setAmount] = useState(transaction.amount);
    const [type, setType] = useState(transaction.type);
    const [category, setCategory] = useState(transaction.category);

    useEffect(() => {
        setTitle(transaction.title);
        setAmount(transaction.amount);
        setType(transaction.type);
        setCategory(transaction.category);
    }, [transaction])


    function handleTransaction(event: FormEvent) {
        event.preventDefault();
        
        const newValues: Transaction | TransactionInput = {
            ...transaction,
            title,
            amount,
            type,
            category
        }

        try {
            if(isEditing && newValues?._id) {
                editTransaction(newValues);
            } else {
                createTransaction(newValues);
            }

            setTitle('');
            setAmount(0.0);
            setType('deposit');
            setCategory('');

        } catch(error) {
            toast.error('Erro ao editar cards');
        }

        onRequestClose();
    };

    return (
        <Modal 
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          overlayClassName='react-modal-overlay'
          className='react-modal-content'
        >
            <button 
                className='react-modal-close'
                type='button'
                onClick={onRequestClose}
            >
                <img src={close} alt='Fechar'/>
            </button>

            <Container onSubmit={handleTransaction}>
                <h2>{isEditing ? 'Editar transação' : 'Cadastrar Transação'}</h2>

                <input
                    placeholder='Título*'
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />

                <input
                    placeholder='Valor*'
                    type='number'
                    step='any'
                    value={amount === 0.0 ? undefined : amount}
                    onChange={event => setAmount(Number(event.target.value))}
                />

                <TypesContainer>
                    <TypeButton 
                        type='button'
                        onClick={() => setType('deposit')}
                        isActive={type === 'deposit'}
                        activeColor='green'
                    >
                        <img src={deposit} alt='Entrada'/>
                        <span>Entrada</span>
                    </TypeButton>

                    <TypeButton 
                        type='button'
                        onClick={() => setType('debit')}
                        isActive={type === 'debit'}
                        activeColor='red'
                    >
                        <img src={debit} alt='Saída'/>
                        <span>Saída</span>
                    </TypeButton> 
                </TypesContainer>

                <input
                    placeholder='Categoria*'
                    value={category}
                    onChange={event => setCategory(event.target.value)}
                />

                <p>*Todos os campos são obrigatórios</p>

                <button
                    type='submit'
                    disabled={title === '' || amount <= 0.0 || category === ''}
                >
                    {isEditing ? 'Editar transação' : 'Cadastrar Transação'}
                </button>

            </Container>
        </Modal>
    );
}