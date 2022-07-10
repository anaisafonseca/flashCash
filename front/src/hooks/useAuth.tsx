import axios from "axios";
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader } from "../components/loader";
import { User } from "../models/user";


interface AuthProviderProps {
    children: ReactNode;
}

interface AuthContextData {
    user?: User;
    login: (email:string, password:string) => void;
    logout: () => void;
    signup: (name: string, email:string, password:string) => void;
}

interface LoginResponse {
    user: User;
    token: string;
    refreshToken: string;
}


const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user,setUser] = useState<User>();
    const navigate = useNavigate();
    const [ loading, setLoading ] = useState(true);

    const getUser = useCallback(async () => {
        try {
            if(!user) {
                const { data } = await axios.get<User>('/getUser')
                setUser(data);
            }

        } finally {
            setLoading(false);
        }
    }, [])

    useEffect(() => {
        getUser();
    }, [getUser]);
    
    async function login(email:string, password:string) {
        const { data } = await axios.post<LoginResponse>('/login', {
            email: email,
            password: password
        })

        if(data) {
            localStorage.setItem('token', data.token)
            localStorage.setItem('refresh_token', data.refreshToken)

            setUser(data.user);
            navigate('/');
        }
    }
    
    async function logout() {
        localStorage.clear();
        setUser(undefined);
    }

    async function signup(name: string, email:string, password:string) {
        const { data } = await axios.post('/createUser', {
            name: name,
            email: email,
            password: password
        })

        if(data) {
            toast.success('Cadastrado com sucesso!')
            navigate('login');
        }
    }


    return (
        <AuthContext.Provider value={{ user, login, logout, signup }}>
            {loading ? <Loader/> : children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}