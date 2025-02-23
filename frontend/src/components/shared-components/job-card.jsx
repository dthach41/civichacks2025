import React from 'react';
import react_img from '../../assets/react.svg';

export default function JobCard({title, description}) {
    return (
        <div className="rounded overflow-hidden shadow-lg p-6 bg-white w-full max-w-md">
            <div className="flex justify-center mb-6">
                <img className="w-24 h-24" src={react_img} alt="Company Logo" />
            </div>
            <h2 className="text-2xl font-bold text-center mb-4">{title}</h2>
            <p className="text-gray-700 text-lg text-center">
                {description}
            </p>
        </div>
    );
}