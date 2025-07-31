import React,{useState, useRef, useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface customer{
    email:string,
    password:string
}

const Login=()=>{

    const[login_info, setLoginInfo] = useState<customer>();

    const nav=useNavigate();

    const valupd=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setLoginInfo({...login_info,[e.target?.name]:e.target?.value})
    }

    useEffect(()=>{
        if(sessionStorage.getItem('token')){
            nav('/account')
        }
    }, [nav])

    const login=(e)=>{
        e.preventDefault(); 
        axios.post('http://localhost:4000/mart/login',login_info)
        .then((res)=>{
            console.log(res)
            if(res?.data.success) {
                sessionStorage.setItem('token', res.data.token)
                sessionStorage.setItem('customer', JSON.stringify(res.data.data))
                axios.post('http://localhost:4000/mart/cart/'+ res.data?.data?._id)
                .then((res)=>{
                    console.log(res)
                    if(res?.data.success) {
                        sessionStorage.setItem('cart', JSON.stringify(res.data.data))
                        nav('/account')
                    }
                })
                .catch((err)=>{
                    console.log(err)
                })
                
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return(
        <>
                <div className="registration-container">
                    <div className="register-box">
                    <h2> LOGIN ACCOUNT</h2>
                    <form action="#" onSubmit={login} method="POST">

                        <div className="input-group">
                            <label >Email Address</label>
                            <input type="email" id="email" name="email" placeholder="your@email.com" onChange={valupd} required />
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <input type="password" id="password" name="password" placeholder="Choose a strong password" onChange={valupd} required />
                        </div>

                        <div className="input-group">
                            <button type="submit">Login</button>
                        </div>
                        
                        <p className="login-link">New User? <a href="/register">Sign Up here</a></p>
                    </form>
                    </div>
                </div>
        </>
    )
}

export default Login
