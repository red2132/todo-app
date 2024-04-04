import axios from "axios"

/**
 * 기본 url 설정
 */
export const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
)