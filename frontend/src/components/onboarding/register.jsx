import Button from '../shared-components/button';
import { register } from '../../api/auth-api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }
            const response = await register(name, email, password);
            console.log(response);
            navigate("/login")
            
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
                    <h1 className="text-2xl font-bold mb-4">Register</h1>
                    <div className="w-80">
                        <div className="mb-2">
                            <label className="block text-left w-full">Name: </label>
                            <input 
                                type="text" 
                                placeholder="Full Name" 
                                className="w-full border border-black px-2 py-1 rounded-md" 
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-left w-full">Email: </label>
                            <input type="text" placeholder="Email" className="w-full border border-black px-2 py-1 rounded-md" onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="mb-2">
                            <label className="block text-left w-full">Password: </label>
                            <input type="password" placeholder="Password" className="w-full border border-black px-2 py-1 rounded-md" onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div className="mb-6">
                            <label className="block text-left w-full">Confirm Password: </label>
                            <input 
                                type="password" 
                                placeholder="Confirm Password" 
                                className="w-full border border-black px-2 py-1 rounded-md" 
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>
                        {error && <div className="text-red-500 mb-4">{error}</div>}
                        <div className="flex justify-center gap-4">
                            <Button text="Register" onClick={() => handleRegister()} className="flex-1"/>
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