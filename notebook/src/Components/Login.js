import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import { Link } from 'react-router-dom'
const Login = (props) => {
    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const [loading, setLoading] = useState(true)
    
    document.title=`${props.title} | NoteKaro`
    console.log(loading);
    let navigate = useNavigate()
    const host = "http://localhost:5000"
    const handleSubmit = async (e) => {
        e.preventDefault()
        // API Call
        props.setProgress(10);
        setLoading(true) 
        const response = await fetch(`${host}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        props.setProgress(30);
        const json = await response.json()
        console.log(json);
        props.setProgress(70);
        if (json.success) {
            //save the jwt and redirect
            localStorage.setItem('authtoken', json.authtoken)
            props.showalert("Successfully Login","success")
            navigate('/')
        }
        else {
            props.showalert("Invalid Credentials!","danger")
        }
        setLoading(false)
        props.setProgress(100);
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <>
        <h1 align="center" style={{color:'#dc3545',fontSize:'50px',textDecoration:'underline'}}>Login</h1>
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',height:'50vh'}}>
            <form onSubmit={handleSubmit}>
                <div className="mb-3" style={{color:'white'}}>
                <i className="fa-regular fa-envelope mx-2"></i>
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" placeholder='Enter your Email' className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3" style={{color:'white'}}>
                <i className="fa-solid fa-lock mx-2"></i>
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" placeholder='Enter your Password' className="form-control" value={credentials.password} onChange={onChange} name='password' id="exampleInputPassword1" />
                </div>
                <button type="submit" className="btn btn container btn-danger" style={{color:'white'}}>Submit</button>
                <div className='container' style={{color:'white'}}>Not a memeber? <Link to="/signup" style={{textDecoration:'underline',color:'white'}}>SignUp here!</Link></div>
            </form>
        </div>
        </>
    )
}

export default Login
