import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../api';
import '../../styles/Login.css';

const Login = ({ setIsAuthenticated }) => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await login(formData);
            localStorage.setItem('token', res.data.token);
            setIsAuthenticated(true);
            navigate('/profile');
        } catch (err) {
            setError(err.response.data.msg);
        }
    };

    return (
        <div>
            {error && <p>{error}</p>}
            <div className="login">
                <form onSubmit={onSubmit}>
                    <h2>Login</h2>
                    <div className="login-detail">
                        <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required /></div>
                    <div className="login-detail">
                        <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required /></div>
                    <div className="submit">
                        <button type="submit">Login</button></div>
                    <div className="signup">
                        Don't have an account?  <a href="/register">Register here</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

