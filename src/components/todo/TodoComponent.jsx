import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "./security/AuthContext";
import { createTodoApi, retrieveTodoApi, updateTodoApi } from "./api/TodoApiService";
import { useEffect, useState } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";
import moment from "moment";

export default function TodoComponent() {
    const {id} = useParams()
    const [description, setDescription] = useState('')
    const [targetDate, setTargetDate] = useState('')
    const username = useAuth().username

    const navigate = useNavigate() // redirect용 변수

    //id가 바뀔 때마다 세부사항 새로 고침
    useEffect(() => 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    retrieveTodos(), [id])

    /**
     * 세부 정보 호출 함수
     */
    function retrieveTodos() {
        if(id !== '-1') { // todo 추가 화면일 시 todo 데이터 로드 안 함
            retrieveTodoApi(username, id)
            .then(response => {
                setDescription(response.data.description)
                setTargetDate(response.data.targetDate)
            })
            .catch(error => console.log(error))
        }
    }
    /**
     * 수정 내용 제출 함수
     * @param {object} values 
     */
    function onSubmit(values) {
        const todo = {
            id: id,
            username: username,
            description: values.description,
            targetDate: values.targetDate,
            done: false
        }
        if(id === '-1') {
            createTodoApi(username, todo)
            .then(response => {
                navigate('/todos')
            })
            .catch(error => console.log(error))    
        } else {
            updateTodoApi(username, id, todo)
            .then(response => {
                navigate('/todos')
            })
            .catch(error => console.log(error))    
        }
    }

    /**
     * 내용 검증 함수
     * @param {object} values 
     * @returns 
     */
    function validate(values) {
        let errors = {}
        if(values.description.length <5) {
            errors.description = "5글자 이상 입력하세요"
        }

        if(values.targetDate === null || values.targetDate === ''
            || !moment(values.targetDate).isValid) {
            errors.targetDate = "목표 날짜를 입력하세요"
        }
        return errors
    }
    return (
        <div className="container">
            <h1>할일 세부 정보</h1>
            <div>
                <Formik initialValues={{description, targetDate}}
                        enableReinitialize={true}
                        onSubmit={onSubmit}
                        validate={validate}
                        validateOnChange={false}
                        validateOnBlur={false}
                >
                    {
                        (props) => (
                            <Form>
                                <ErrorMessage
                                    name="description"
                                    component="div"
                                    className="alert alert-warning"
                                />

                                <ErrorMessage
                                    name="targetDate"
                                    component="div"
                                    className="alert alert-warning"
                                />

                                <fieldset className="form-group">
                                    <label>내용</label>
                                    <Field type="text" className="form-control" name="description"/>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>목표 날짜</label>
                                    <Field type="date" className="form-control" name="targetDate"/>
                                </fieldset>
                                <div>
                                    <button className="btn btn-info" type="submit">저장</button>
                                </div>
                            </Form>
                        )
                    }
                </Formik>
            </div>
        </div>
    )
}