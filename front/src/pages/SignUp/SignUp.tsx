import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";
import { Container, Form } from "./styles";

export function SignUp() {
    const { signup } = useAuth();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    function handleSignUp(event: FormEvent) {
        event.preventDefault();
        signup(name,email,password);
    }

    return (
        <Container>
            <Form onSubmit={handleSignUp}>
                <h2>Cadastro</h2>

                <input 
                    placeholder='nome'
                    name='name'
                    value={name}
                    onChange={event => setName(event.target.value)}
                />

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
                {(password !== '') && (password.length < 6) ? 
                    <p style={{marginBottom: '0.5rem'}}>A senha deve ter no mínimo 6 caracteres.</p> : 
                    null
                }

                <input 
                    placeholder='confirmar senha'
                    type='password'
                    value={confirmPassword}
                    onChange={event => setConfirmPassword(event.target.value)}
                />
                {(password !== confirmPassword) && (confirmPassword !== '') ? 
                    <p>As senhas estão diferentes.</p> : 
                    <div style={{marginTop: '1.5rem'}}></div>
                }

                <button
                    type='submit'
                    disabled={name === '' || email === '' || password === '' || confirmPassword === '' || password !== confirmPassword}
                >
                    Cadastrar
                </button>
            </Form>
        </Container>
    )
}