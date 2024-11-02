import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import "../../styles/Navbar.css";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
    const navigate = useNavigate();

    const [isDevice, setIsDevice] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/');
    };

    return (
        <nav>
            <div className="logo">
                <p>Travel</p>
            </div>
            <div>
                <ul
                    className={isDevice ? "navlinks-device" : "navlinks"}
                    onClick={() => setIsDevice(false)}
                >
                    <li>
                        <Link to="/">Home</Link>
                        {isAuthenticated ? (
                            <>
                                <Link to="/profile">Profile</Link>
                                <Link to="/ride">Ride</Link>
                                <button className='logout' onClick={handleLogout}>Logout</button>
                            </>
                        ) : (
                            <>
                                <Link to="/register">Register</Link>
                                <Link to="/login">Login</Link>
                            </>
                        )}
                    </li>
                </ul>
            </div>
            <button
                className="responsive" onClick={() => setIsDevice(!isDevice)}>            
                {isDevice ? (<i className="fas fa-times"></i>) : (<i className="fas fa-bars"></i>)}        
                     </button>
        </nav>
    );
};

export default Navbar;

