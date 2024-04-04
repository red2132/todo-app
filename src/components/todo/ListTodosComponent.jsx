import { useState, useEffect } from "react"
import { retrieveAllTodosForUsernameApi, deleteTodoApi } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ListTodosComponent() {

    const [todos, setTodos] = useState([])
    const [message, setMessage] = useState(null)
    const username = useAuth().username // username 받아옴 
    const navigate = useNavigate()

    //데이터 로드시 todos 데이터 호출
    useEffect(() => 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refreshTodos(), [])

    /**
     * 리스트 데이터 호출
     */
    function refreshTodos() {
        retrieveAllTodosForUsernameApi(username)
        .then(response => setTodos(response.data))
        .catch(error => console.log(error))
    }
    /**
     * 리스트 데이터 삭제
     * @param {number} id 
     */
    function deleteTodo(id) {
        deleteTodoApi(username, id)
            .then(
                () => {
                    setMessage(`${id}번 게시물이 삭제되었습니다`)
                    refreshTodos()
                }
            )
            .catch(error => console.log(error))
    }
    /**
     * todo 수정 화면으로 이동
     * @param {number} id 
     */
    function updateTodo(id) {
        navigate(`/todo/${id}`)
    }
    /**
     * todo 추가 화면으로 이동
     */
    function addNewTodo() {
        navigate('/todo/-1')
    }
    return (
        <div className="container">
            <h1>해야할 일!</h1>
            {message && <div className="alert alert-warning">{message}</div>}
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>내용</th>
                            <th>완료 여부</th>
                            <th>목표 일자</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           todos.map(
                            todo => (
                                <tr key={todo.id}>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toString()}</td>
                                    <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>삭제</button></td>
                                    <td><button className="btn btn-info" onClick={() => updateTodo(todo.id)}>수정</button></td>
                                </tr>  
                            ) 
                           ) 
                        }                      
                    </tbody>
                </table>
            </div>
            <div className="btn btn-success m-5" onClick={addNewTodo}>할일 추가</div>
        </div>
    )
}