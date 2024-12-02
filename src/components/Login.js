import React, { useState } from 'react';
import api from './api'; 
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/users/login', { email, password });
            localStorage.setItem('token', response.data.token);
            navigate('/employees');
        } catch (err) {
            alert('Invalid credentials');
        }
    };

    
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f9',
        fontFamily: 'Arial, sans-serif',
    };

    const formContainerStyle = {
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '300px',
        textAlign: 'center',
    };

    const headingStyle = {
        fontSize: '24px',
        fontWeight: '600',
        color: '#333',
        marginBottom: '20px',
    };

    const inputStyle = {
        width: '100%',
        padding: '12px',
        marginBottom: '15px',
        borderRadius: '4px',
        border: '1px solid #ddd',
        fontSize: '16px',
    };

    const buttonStyle = {
        width: '100%',
        padding: '12px',
        backgroundColor: '#4CAF50',
        color: '#fff',
        borderRadius: '4px',
        border: 'none',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };

    const buttonHoverStyle = {
        backgroundColor: '#45a049',
    };

    return (
        <div style={containerStyle}>
            <div style={formContainerStyle}>
                <h2 style={headingStyle}>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={inputStyle}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={inputStyle}
                    />
                    <button
                        type="submit"
                        style={buttonStyle}
                        onMouseEnter={(e) => e.target.style.backgroundColor = buttonHoverStyle.backgroundColor}
                        onMouseLeave={(e) => e.target.style.backgroundColor = buttonStyle.backgroundColor}
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
