import logo from '../../assets/logo.svg';
import { useTransactions } from '../../hooks/useTransactions';
import { Container, Content, Logout, RegisterTransaction } from './styles';
import logoutIcon from '../../assets/logout.svg'
import { useAuth } from '../../hooks/useAuth';


export function Header() {
    const { toggleNewTransation } = useTransactions();
    const { logout } = useAuth();


    return (
        <Container>
            <Content>
                <img src={logo} alt="flash cash"/>
                <div>
                    <RegisterTransaction type="button" onClick={() => toggleNewTransation()}>
                        Nova transação
                    </RegisterTransaction>
                    <Logout title='Sair' type='button' onClick={logout}>
                        <img src={logoutIcon} alt=''/>
                    </Logout>
                </div>
            </Content>
        </Container>
    );
}