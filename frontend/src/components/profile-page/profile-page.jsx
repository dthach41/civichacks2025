import React from 'react';
import ProfileCard from '../shared-components/profile-card';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage() {
    const navigate = useNavigate()

    const user = {
        profilePicture: 'profile-picture-url-here',
        fullName: 'John Doe',
        email: 'john.doe@example.com',
        savedJobs: [
            { title: 'Software Engineer at Google', description: 'Develop and maintain software applications.' },
            { title: 'Frontend Developer at Facebook', description: 'Build and optimize user interfaces.' },
            { title: 'Backend Developer at Amazon', description: 'Design and implement server-side logic.' }
        ]
    };

    function onClickSignOut() {
        localStorage.removeItem("userId")
        navigate("/login")
    }

    return (
        <div className="flex flex-col items-center max-w-2xl mx-auto p-4">
            <div className="flex items-center mb-4">
                <img className="w-24 h-24 rounded-full mr-4" src={user.profilePicture} alt="Profile" />
                <div>
                    <h1 className="text-2xl font-bold">{user.fullName}</h1>
                    <p className="text-gray-600">{user.email}</p>
                    <button className="text-red-500" onClick={onClickSignOut}>Sign Out</button>
                </div>
            </div>
            <div>
                <h2 className="text-xl font-bold mb-2">Saved Jobs</h2>
                <ul className="list-none">
                    {user.savedJobs.map((job, index) => (
                        <li key={index} className="mb-4">
                            <ProfileCard title={job.title} description={job.description} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}