import React, { useEffect, useState } from 'react';
import ProfileCard from '../shared-components/profile-card';
import { useNavigate } from 'react-router-dom';
import defaultAvatar from '../../assets/default-avatar.svg';
import { getUserById } from '../../api/auth-api';

export default function ProfilePage() {
    const navigate = useNavigate()

    const [user, setUser] = useState()

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const userId = localStorage.getItem("userId");
          console.log(userId);
    
          const user = await getUserById(userId);
          console.log(user)
          setUser(user)

    
    
        } catch (error) {
          console.error("Error fetching user:", error);
          
        }
      };
    
      fetchUser();
    }, []);

    function onClickSignOut() {
        localStorage.removeItem("userId")
        navigate("/login")
    }

   return (
    <div className="flex flex-col items-center max-w-2xl mx-auto p-4">
        {user ? (
            <>
                <div className="flex items-center mb-4">
                    <img 
                        className="w-24 h-24 rounded-full mr-4 object-cover bg-gray-100"
                        src={defaultAvatar}
                        alt={`${user.name}'s profile`}
                        onError={(e) => {
                            e.target.src = defaultAvatar;
                        }}
                    />
                    <div>
                        <h1 className="text-2xl font-bold">{user.name}</h1>
                        <p className="text-gray-600">{user.email}</p>
                        <button className="text-red-500" onClick={onClickSignOut}>Sign Out</button>
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-2">Saved Jobs</h2>
                    <ul className="list-none">
                        {user.savedJobs?.map((job, index) => (
                            <li key={index} className="mb-4">
                                <ProfileCard title={job.title} description={job.description} />
                            </li>
                        ))}
                    </ul>
                </div>
            </>
        ) : (
            <p>Loading...</p>
        )}
    </div>
);

}