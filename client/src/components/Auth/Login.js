import axios from 'axios';
import React, { useState } from 'react'

export default function Login() {

    const [state, setState] = useState({
        log: null,
        password: null
    });


    const login = (e) => {
        e.preventDefault();
        if (state.log !== null && state.password !== null) {
            axios({
                method: 'post',
                url: `${process.env.REACT_APP_API_URL}/api/auth/signin`,
                data: {
                    log: state.log,
                    password: state.password
                },
                withCredentials: true
            }).then((res) => {
                if (res.data.errors) {
                    // setNotificationDisplay(true);
                    // const Error = document.querySelector('.log-error');
                    // if (res.data.errors.username) return Error.innerHTML = res.data.errors.username;
                    // if (res.data.errors.password) return Error.innerHTML = res.data.errors.password;
                    // if (res.data.errors.ban) return Error.innerHTML = res.data.errors.ban;
                } else {
                    window.location = '/';
                }
            }).catch((err) => {
                console.log(err)
            })
        }
    } 

    return (
        <div className="login-container">
            <h2>Login Form</h2>
            <form> 
                <div className="field">
                    <span>Username or Email</span>
                    <input type="text" required name="log" id="log" onChange={(e) => setState({...state, log: e.target.value})} />
                </div>
                <div className="field">
                    <span>Password</span>
                    <input type="password" name="password" id="password" required onChange={(e) => setState({...state, password: e.target.value})} />
                </div>
                <input type="submit" value="Login !" onClick={login} />
            </form>

        </div>
    )
}
