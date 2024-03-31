import { createContext, useContext, useState } from "react";

//로그인 여부에 쓰일 context 생성
export const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({children}) {
    // 허가된 사용자인지 확인 여부
    const [isAuthenticated, setAuthenticated] =useState(false)

    /**
     * 로그인 기능
     * @param {string} username 
     * @param {string} password 
     * @returns {boolean} 로그인 성공여부
     */
    function login(username,password) {
        //로그인 성공시
        if(username === 'in28minutes' && password ==='dummy') {
            setAuthenticated(true) // 인증 여부
            return true
        //로그인 실패시
        } else {
            setAuthenticated(false) // 인증 여부
            return false
        }
    }

    /**
     * 로그아웃 기능 
     */
    function logout() {
        setAuthenticated(false)
    }
    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}
