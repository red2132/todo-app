import axios from "axios";

/**
 * 기본 url 설정
 */
const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
)
/**
 * user의 todos 검색
 * @param {string} username 
 * @returns todos 배열
 */
export const retrieveAllTodosForUsernameApi = (username) =>
    apiClient.get(`/users/${username}/todos`)

/**
 * todo 상세 내용 검색
 * @param {string} username 
 * @param {number} id 
 * @returns 
 */
export const retrieveTodoApi = (username, id) =>
    apiClient.get(`/users/${username}/todos/${id}`)

/**
 * todo 삭제
 * @param {string} username 
 * @param {number} id 
 * @returns 
 */
export const deleteTodoApi = (username, id) =>
    apiClient.delete(`/users/${username}/todos/${id}`)