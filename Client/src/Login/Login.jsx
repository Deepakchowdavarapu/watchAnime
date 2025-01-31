import React, { useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'

export default function Login() {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const Auth = localStorage.getItem('authToken')
        if(Auth){
            console.log(Auth)
            navigate('/')
        }
    },[])

    const handleLogin = async() => {
        try{
            const response = await axios.post('http://localhost:5775/login',{email,password})
            const user = JSON.stringify(response.data.userData)
            localStorage.setItem('authToken',user)
            console.log(response)
            navigate('/')
        }catch(err){
            console.log(`error: `,err)
        }
    };

    return (
    <div className='login'>
        <div className='container' id='/login'>


            <h1>Login to <span className='span-watch'>watch</span><span className='span-anime'>anime</span></h1>
            <div className="form">
                <div className="email">
                    <p>Email</p>
                    <input type="text" size={30} value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <br />
                <div className="password">
                    <p>Password</p>
                    <input type="password" size={30} value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <br />
                <div className='login-button' onClick={handleLogin}>Login</div>
            </div>
           
            <h3>Do not have an account?   <Link to='/register'>Register</Link></h3>
        </div>
    </div>
    );
}
