import { createContext, useContext, useState } from "react";
import { apiClient } from "../api/ApiClient";
import { executeJwtAuthenticationService } from "../api/AuthenticationApiService";

//로그인 여부에 쓰일 context 생성
export const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({children}) {

    const [isAuthenticated, setAuthenticated] =useState(false)// 허가된 사용자인지 확인 여부
    const [username, setUsername] = useState(null) // username
    const [token, setToken] = useState(null) // 토큰

    /**
     * 로그인 기능
     * @param {string} username 
     * @param {string} password 
     * @returns {boolean} 로그인 성공여부
     */
    async function login(username, password) {    
        try {
            // 생성한 토큰을 인증 서버로 보냄
            const response = await executeJwtAuthenticationService(username, password)
            //로그인 성공시
            if(response.status===200) {
                const jwtToken = 'Bearer ' + response.data.token
                setAuthenticated(true) // 인증 여부
                setUsername(username) // 유저이름 세팅
                setToken(jwtToken)
                
                // 모든 apiClient에 인증 헤더 추가
                apiClient.interceptors.request.use(
                    (config) => {
                        config.headers.Authorization = jwtToken
                        return config
                    }
                )
                return true
            //로그인 실패시
            } else {
                logout()
                return false
            }
        } catch(error) {
            //로그인 실패시
            logout()
            return false
        }
    }
    // async function login(username,password) {

    //     //ID와 비번 Base64 인코딩 -> 토큰 생성
    //     const basicToken = 'Basic ' + window.btoa(username + ":" + password)
        
    //     try {
    //         // 생성한 토큰을 인증 서버로 보냄
    //         const response = await executeBasicAuthenticationService(basicToken)
    //         //로그인 성공시
    //         if(response.status===200) {
    //             setAuthenticated(true) // 인증 여부
    //             setUsername(username) // 유저이름 세팅
    //             setToken(basicToken)
                
    //             // 모든 apiClient에 인증 헤더 추가
    //             apiClient.interceptors.request.use(
    //                 (config) => {
    //                     config.headers.Authorization = basicToken
    //                     return config
    //                 }
    //             )
    //             return true
    //         //로그인 실패시
    //         } else {
    //             logout()
    //             return false
    //         }
    //     } catch(error) {
    //         //로그인 실패시
    //         logout()
    //         return false
    //     }
    // }

    /**
     * 로그아웃 기능 
     */
    function logout() {
        setAuthenticated(false) // 인증 여부
        setUsername(null)
        setToken(null)
    }
    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, username, token}}>
            {children}
        </AuthContext.Provider>
    )
}
