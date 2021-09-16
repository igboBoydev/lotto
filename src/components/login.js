import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '../context/context';

const Login = () => {
    let { addUser, isSubmitted, isLoggedIn, isRgistered, loggingIn } = useGlobalContext();
    const [userLogin, setUserLogin] = useState({ email: '', password: '' });
    const [showLogin, setShowLogin] = useState(false)

    const handleLogin = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserLogin({ ...userLogin, [name]: value })
    }
   
    const handleSubmit = (e) => {
        e.preventDefault()
        if (userLogin.email && userLogin.password) {
            const grantAccess = { id: new Date().getTime().toString(), ...userLogin }
            loggingIn(grantAccess)
        } else {
            return;
        }
        setUserLogin('')
        console.log('hello world')
    }


    return (
         <div className="nav-form">
            <form onSubmit={handleSubmit} >
                <section className="email">
                    <label htmlFor="email">Email</label>
                    <input type="email" id='email' onChange={handleLogin} placeholder='Email' name='email' value={userLogin.email} />
                </section>
                    <section className="password">
                        <label htmlFor="password">Password</label>
                        <input type="text" id='password' onChange={handleLogin} placeholder='Password' name='password' value={userLogin.password} />
                    </section>
                    <button>Login</button>
            </form>
        </div> 
    )
}

export default Login
