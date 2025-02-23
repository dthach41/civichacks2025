import Button from '../shared-components/button';
import { login } from '../../api/auth-api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ setIsAuthenticated }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await login(email, password);
            console.log(response);
            localStorage.setItem('userId', response.user._id);
            console.log(localStorage.getItem('userId'));
            navigate("/home")
            
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
            setError(errorMessage);
            console.error(errorMessage);
        }
    }
    
    return (
        <div className="flex h-screen">
            {/* Left half - Login Form */}
            <div className="w-1/2 flex flex-col items-center justify-center bg-gray-50">
                <div className="border-2 border-gray-300 rounded-lg p-8 shadow-md">
                    <h1 className="text-2xl font-bold mb-4">Login</h1>
                    <div className="w-80">
                        <div className="mb-2">
                            <label className="block text-left w-full">Email: </label>
                            <input type="text" placeholder="Email" className="w-full border border-black px-2 py-1 rounded-md" onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="mb-6">
                            <label className="block text-left w-full">Password: </label>
                            <input type="password" placeholder="Password" className="w-full border border-black px-2 py-1 rounded-md" onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="flex flex-col space-y-4 justify-center">
                            <Button text="Login" onClick={() => {handleLogin()}} className="w-full"/>
                            <Button text="Register" onClick={() => {navigate("/register")}} className="w-full"/>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right half - Image */}
            <div className="w-1/2">
                <img 
                    src="/public/laptop.avif" 
                    alt="Login" 
                    className="h-full w-full object-cover"
                />
            </div>
        </div>
    )
} 