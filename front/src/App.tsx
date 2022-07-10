import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import configAxios from '../src/services/api';
import { AppRoutes } from './AppRoutes';
import { AuthProvider } from './hooks/useAuth';
import { TransactionsProvider } from "./hooks/useTransactions";
import { GlobalStyle } from "./styles/global";


export function App() {
  configAxios();

  
  return (
    <StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <TransactionsProvider>
            <ToastContainer/>
            <AppRoutes/>
            <GlobalStyle/>
          </TransactionsProvider>
        </AuthProvider>
      </BrowserRouter>
    </StrictMode>
  );
}

