import axios from 'axios';
import React, { useState, useEffect } from 'react'

export default function Login() {

    const [state, setState] = useState({
        username: null,
        email: null,
        password: null
    });

    useEffect(() => {
      console.log(state)
    }, [state])
    


    const register = (e) => {
        e.preventDefault();
        if (state.email !== null && state.password !== null && state.username !== null) {
            console.log('oui')
            axios({
                method: 'post',
                url: `${process.env.REACT_APP_API_URL}/api/auth/signup`,
                data: {
                    username: state.username,
                    email: state.email,
                    password: state.password
                },
                withCredentials: true
            }).then((res) => {
                console.log(res);
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

            })
        }
    } 

    return (
        <div className="login-container">
            <h2>SingUp Form</h2>
            <form> 
                <div className="field">
                    <span>Username</span>
                    <input type="text" required name="username" id="username" onChange={(e) => setState({...state,username: e.target.value})} />
                </div>
                <div className="field">
                    <span>Email</span>
                    <input type="email" required name="email" id="email" onChange={(e) => setState({...state,email: e.target.value})} />
                </div>
                <div className="field">
                    <span>Password</span>
                    <input type="password" name="password" id="password" required onChange={(e) => setState({...state,password: e.target.value})} />
                </div>
                <input type="submit" value="SignUp !" onClick={register} />
            </form>

        </div>
    )
}
