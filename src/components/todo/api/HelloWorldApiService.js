import { apiClient } from "./ApiClient"

export const retrieveHelloWorldBean = () =>
    apiClient.get('/hello-world')

export const retrieveHelloWorldPathVariable = (name, token) =>
    apiClient.get(`/hello-world/path-variable/${name}`)