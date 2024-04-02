import axios from "axios";

/**
 * 기본 url 설정
 */
const apiClient = axios.create(
    {
        baseURL: 'http://localhost:8080'
    }
)

export const retrieveHelloWorldBean = () =>
    apiClient.get('/hello-world')

export const retrieveHelloWorldPathVariable = (name) =>
    apiClient.get(`/hello-world/path-variable/${name}`)