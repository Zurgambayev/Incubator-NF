import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


interface AuthProps {
    onAuth: (token: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onAuth }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://dummyjson.com/auth/login', {
                username,
                password,
            });
            const token = response.data.token;
            localStorage.setItem('token', token);
            onAuth(token);
            navigate('/');  
        } catch (error) {
            console.error('Error during authentication', error);
            alert("wrong password");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default Auth;
