import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useAuth } from './hooks/useAuth';
import { Home } from './pages/Home'
import { Login } from './pages/Login/Login'
import { User } from "./models/user";
import { SignUp } from './pages/SignUp/SignUp';

export function AppRoutes() {
    const { user } = useAuth();
    const location = useLocation();
    
    function RequireAuth({ children, user }: { children: JSX.Element; user?: User }) {
        if (!user) {
          return <Navigate to="/login" state={{from: location}} replace/>;
        }
        
        return children;
      }

    return (
        <Routes>
            <Route>
                <Route path='/login' element={<Login/>}/>
                <Route path='/signup' element={<SignUp/>}/>
                <Route path='/' element={<RequireAuth user={user}><Home/></RequireAuth>}/>
            </Route>
        </Routes>
    )
}