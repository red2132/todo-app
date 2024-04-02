import { useParams } from "react-router-dom"
import { useAuth } from "./security/AuthContext";
import { retrieveTodoApi } from "./api/TodoApiService";
import { useEffect, useState } from "react";
import { Field, Formik, Form, ErrorMessage } from "formik";

export default function TodoComponent() {
    const {id} = useParams()
    const [description, setDescription] = useState('')
    const [targetDate, setTargetDate] = useState('')
    const username = useAuth().username

    //id가 바뀔 때마다 세부사항 새로 고침
    useEffect(() =>retrieveTodos(), [id])

    /**
     * 세부 정보 호출 함수
     */
    function retrieveTodos() {
        retrieveTodoApi(username, id)
        .then(response => {
            setDescription(response.data.description)
            setTargetDate(response.data.targetDate)
        })
        .catch(error => console.log(error))
    }

    function onSubmit(values) {
        console.log(values)
    }

    function validate(values) {
        let errors = {}
        if(values.description.length <5) {
            errors.description = "5글자 이상 입력하세요"
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