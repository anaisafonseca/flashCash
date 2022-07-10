import debit from '../../assets/debit.svg';
import deposit from '../../assets/deposit.svg';
import total from '../../assets/total.svg';
import { useAuth } from '../../hooks/useAuth';
import { MiniLoader } from '../miniLoader';
import { Container } from './styles';

export function AmountCards() {
    const { user } = useAuth();


    
    return (
        <Container>
                <div>
                    <header>
                        <p>Entradas</p>
                        <img src={deposit} alt='Entradas'/>
                    </header>
                    <strong>
                        {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(user?.amount.deposits || 0.0)}
                    </strong>
                </div>
                <div>
                    <header>
                        <p>Saídas</p>
                        <img src={debit} alt='Saídas'/>
                    </header>
                    <strong>
                        -{new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(user?.amount.debits || 0.0)}
                    </strong>
                </div>
                <div className='highlightBackground'>
                    <header>
                        <p>Total</p>
                        <img src={total} alt='Total'/>
                    </header>
                    <strong>
                        {new Intl.NumberFormat('pt-BR', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(user?.amount.total || 0.0)}
                    </strong>
                </div>
        </Container>
    );
}