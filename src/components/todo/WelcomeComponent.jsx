import { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { retrieveHelloWorldPathVariable } from "./api/HelloWorldApiService"

export default function WelcomeComponent() {
    const {username} =useParams

    const [message, setMessage] = useState(null)

    /**
     * helloWorld 호출 함수
     */
    function callHelloWorldRestApi() {

        retrieveHelloWorldPathVariable('Ranga')
            .then((response) => successfulResponse(response)) // 성공시 성공 메시지 호출
            .catch((error) => errorResponse(error)) // 실패시 실패 메시지 호출
            .finally(()=> console.log('cleanup'))
    }
    /**
     * 성공 메시지 출력 함수
     * @param {*} response 
     */
    function successfulResponse(response) {
        console.log(response)
        setMessage(response.data.message)
    }
    /**
     * 에러 메세지 출력 함수
     * @param {*} error 
     */
    function errorResponse(error) {
        console.log(error)
    }

    return (
        <div className="Welcome">
            <h1>Welcome {username}</h1>
            <div>
                Manange Your Todos - <Link to="/todos">Go Here</Link>
            </div>
            <div>
                <button className="btn btn-success m-5" onClick={callHelloWorldRestApi}>
                    Call Hello World
                </button>
            </div>
            <div className="text-info">
                {message}
            </div>
        </div>
    )
}