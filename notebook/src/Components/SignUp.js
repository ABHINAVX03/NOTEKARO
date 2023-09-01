import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignUp = (props) => {
    const [credentials, setCredentials] = useState({ name: '', email: '', password: '', cpassword: '' });
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    document.title = `${props.title} | NoteKaro`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password } = credentials;
        const cpass = document.getElementById('cpassword').value;
        const pass = document.getElementById('password').value;
        if (cpass === pass) {
            // API Call 
            props.setProgress(10);
            setLoading(true);
            const response = await fetch('http://localhost:5000/api/auth/createuser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password }),
            });
            props.setProgress(30);
            const json = await response.json();
            props.setProgress(70);

            if (json.success) {
                localStorage.setItem('authtoken', json.authtoken);
                navigate('/');
                props.showalert('Successfully Created your Account', 'success');
            } else {
                props.showalert('Something Went Wrong!', 'danger');
            }
            setLoading(false);
            props.setProgress(100);
        } else {
            props.showalert('Check Your password', 'danger');
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <>
            <h1 align="center" style={{ color: '#dc3545', fontSize: '50px', textDecoration: 'underline' }}>Sign Up</h1>
            <div className='container text-light' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
                <form onSubmit={handleSubmit} style={{ maxWidth: '400px', width: '100%' }}>
                    <div className="mb-3">
                        <i className="fa-solid fa-user mx-2"></i>
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="name" className="form-control" placeholder='Enter your Name' required value={credentials.name} onChange={onChange} id="name" name="name" />
                    </div>
                    <div className="mb-3">
                        <i className="fa-regular fa-envelope mx-2"></i>
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input type="email" className="form-control" placeholder='Enter you Email Address' required value={credentials.email} onChange={onChange} id="email" name="email" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <i className="fa-solid fa-lock mx-2"></i>
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" placeholder='Enter Your password' required value={credentials.password} onChange={onChange} name='password' minLength={5} id="password" />
                    </div>
                    <div className="mb-3">
                        <i className="fa-solid fa-lock mx-2"></i>
                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" placeholder='Confirm Your Password' required value={credentials.cpassword} onChange={onChange} name='cpassword' minLength={5} id="cpassword" />
                    </div>
                    <button type="submit" className="btn btn-danger container">Submit</button>
                    <div className='container' style={{ color: 'white', textAlign: 'center', marginTop: '10px' }}>Already a member? <Link to="/login" style={{ textDecoration: 'underline', color: 'white' }}>Login here!</Link></div>
                </form>
            </div>
        </>
    );
};

export default SignUp;
