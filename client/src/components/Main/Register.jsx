import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../api';
import '../../styles/Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        phone: '',
        dob: '',
        email: '',
        password: '',
        role: 'passenger'
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const { name, age, phone, dob, email, password, role } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        try {
            const res = await register(formData);
            if (res && res.data) {
                localStorage.setItem('token', res.data.token);
                navigate('/login');
            } else {
                setError('Unexpected response from the server');
            }
        } catch (err) {
            if (err.response && err.response.data && err.response.data.msg) {
                setError(err.response.data.msg);
            } else {
                setError('An error occurred while registering');
            }
        }
    };

    return (
        <div> 
            {error && <p>{error}</p>}
            <div className="register">

               
                <form onSubmit={onSubmit}>
                    <h2>Sign Up</h2>
                    <div className='register-detail'>
                        <input type="text" name="name" value={name} onChange={onChange} placeholder="Name" required /></div>
                    <div className='register-detail'>
                        <input type="text" name="phone" value={phone} onChange={onChange} placeholder="Phone Number" required /></div>
                    <div className='register-detail'>
                        <input type="date" name="dob" value={dob} onChange={onChange} placeholder="Date of Birth" required /></div>
                    <div className='register-detail'>
                        <input type="number" name="age" value={age} onChange={onChange} placeholder="Age" required /></div>
                    <div className='register-detail'>
                        <input type="email" name="email" value={email} onChange={onChange} placeholder="Email" required /></div>
                    <div className='register-detail'>
                        <input type="password" name="password" value={password} onChange={onChange} placeholder="Password" required />
                        <select name="role" value={role} onChange={onChange}>
                            <option value="passenger">Passenger</option>
                            <option value="driver">Driver</option>
                        </select></div>
                    <div className='submit'>
                        <button type="submit">Register</button>
                    </div>
                    <div className="member">
                        Already registered? <a href="/login">Login here</a>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;

