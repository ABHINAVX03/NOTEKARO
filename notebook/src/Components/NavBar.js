import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function NavBar(props) {
    let navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authtoken');
        props.showalert('Logged out successfully', 'success');
        navigate('/login');
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <div
                            style={{
                                fontFamily: 'fantasy',
                                fontWeight: 'bold',
                                color: 'rgb(220, 53, 69)',
                                width: 'auto',
                            }}
                        >
                            NoteKaro
                        </div>
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {!localStorage.getItem('authtoken') ? (
                                <div></div>
                            ) : (
                                <li className="nav-item mx-3">
                                    <Link
                                        className="nav-link"
                                        aria-current="page"
                                        to="/"
                                        style={{ color: 'white', textDecoration: 'underline' }}
                                    >
                                        Home
                                    </Link>
                                </li>
                            )}
                            <li className="nav-item mx-3">
                                <Link className="nav-link" style={{ color: 'white', textDecoration: 'underline' }} to="/about">
                                    About
                                </Link>
                            </li>
                            <li className="nav-item mx-3">
                                <Link className="nav-link" style={{ color: 'white', textDecoration: 'underline' }} to="/contact">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>

                        {!localStorage.getItem('authtoken') ? (
                            <div></div>
                        ) : (
                            <button onClick={handleLogout} className="btn btn-danger">
                                Logout
                            </button>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
}
