import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { Container, Form, SignUp } from "./styles";

export function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function handleLogin(event: FormEvent) {
        event.preventDefault();
        login(email,password);
    }

    return (
        <Container>
            <Form onSubmit={handleLogin}>
                <h2>Login</h2>

                <input 
                    placeholder='email'
                    type='email'
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />

                <input 
                    placeholder='senha'
                    type='password'
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />

                <button
                    type='submit'
                    disabled={email === '' || password === ''}
                >
                    Entrar
                </button>

                <SignUp onClick={() => navigate('/signup')}>
                    <p>Cadastrar-se</p>
                </SignUp>
                
            </Form>
        </Container>
    )
}