import './TodoApp.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HeaderComponent from './HeaderComponent'
import LoginComponent from './LoginComponent'
import WelcomeComponent from './WelcomeComponent'
import ListTodosComponent from './ListTodosComponent'
import LogoutComponent from './LogoutComponent'
import FooterComponent from './FooterComponent'

import ErrorComponent from './ErrorComponent'
import AuthProvider from './security/AuthContext'




export default function TodoApp() {
    return (
        <div className="TodoApp">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent/>
                    <Routes>
                        <Route path='login' element={<LoginComponent/>}/>
                        <Route path='welcome/:username' element={<WelcomeComponent/>}/>
                        <Route path='todos' element={<ListTodosComponent/>}/>
                        <Route path='logout' element={<LogoutComponent/>}/>

                        <Route path='*' element={<ErrorComponent/>}/>
                    </Routes>
                    <FooterComponent/>
                </BrowserRouter>
           </AuthProvider>
        </div>
    )
}