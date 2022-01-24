import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

const AuthPages = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {load, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email: '',
        password: ''
    })
    useEffect(() => {
        message(error)
        clearError()
    }, [message, load, error, clearError])
    useEffect(()=>{
        window.M.updateTextFields()
    },[])
    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
        } catch (e) {
        }

    }
    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token,data.userId)
        } catch (e) {
        }

    }

    const changeHandler = (e) => setForm((prev) => ({...prev, [e.target.name]: e.target.value}))
    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1>Short your links</h1>
                <div className="card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authentication</span>
                        <div className="input-field">
                            <input
                                value={form.email}
                                onChange={changeHandler}
                                name='email'
                                placeholder="Your Email"
                                id="email"
                                type="email"

                            />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="input-field">
                            <input
                                value={form.password}
                                onChange={changeHandler}
                                name='password'
                                placeholder="Your Password"
                                id="password"
                                type="password"/>
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <div className="card-action">
                        <button
                            onClick={loginHandler}
                            className='btn yellow darken-4'
                            style={{marginRight: 10}}> Sign in
                        </button>
                        <button
                            onClick={registerHandler}
                            className='btn grey lighten-1 black-text'> Sign up
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default AuthPages