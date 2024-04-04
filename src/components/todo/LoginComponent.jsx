import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "./security/AuthContext"

export default function LoginComponent() {
    
    const [username, setUsername] = useState('in28minutes')         //username 변수
    const [password, setPassword] = useState('dummy')               //password 변수
    const [showErrorMessage, setShowErrorMessage] = useState(false) // errormessage 출력여부 변수

    const navigate = useNavigate() // 화면이동 변수

    const authContext = useAuth() // 로그인 여부 변수

    /**
     * 로그인 버튼 클릭시 함수
     */
    async function handleSubmit() {
        if(await authContext.login(username, password)) {
            navigate(`/welcome/${username}`) // 해당 유저 welcome 페이지로 이동
        } else {
            setShowErrorMessage(true) // 실패 메시지 출력 여부
        }
    }
    /**
     * username 저장 함수
     * @param {*} event 
     */
    const saveUsername = event => {
        setUsername(event.target.value);
      };
    
      /**
       * password 저장 함수
       * @param {*} event 
       */
      const saveUserPw = event => {
        setPassword(event.target.value);
      };
    return (
        <div className="Login">
            <h1>로그인 하세요!</h1>
            {showErrorMessage && <div className='errorMessage'>로그인에 실패했습니다. ID와 비밀번호를 확인해 주세요</div>}
            <div className="LoginForm">
                <div>
                    <label>ID</label>
                    <input type="text" name="username" defaultValue={username} onChange={saveUsername}/>
                </div>
                <div>
                    <label>비밀번호</label>
                    <input type="password" name="password" defaultValue={password} onChange={saveUserPw}/>
                </div>
                <div>
                    <button type="button" name="login" onClick={handleSubmit}>로그인</button>
                </div>
            </div>
        </div>
    )
}