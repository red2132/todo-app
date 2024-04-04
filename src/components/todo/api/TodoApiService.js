import { apiClient } from "./ApiClient"

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

/**
 * todo 수정
 * @param {string} username 
 * @param {number} id 
 * @param {object} todo 
 * @returns 
 */
export const updateTodoApi = (username, id, todo) =>
    apiClient.put(`/users/${username}/todos/${id}`, todo)

/**
 * todo 추가
 * @param {string} username 
 * @param {object} todo 
 * @returns 
 */
export const createTodoApi = (username, todo) =>
    apiClient.post(`/users/${username}/todos`, todo)