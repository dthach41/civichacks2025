import React from 'react';
import react_img from '../../assets/react.svg';

export default function JobCard({title, description}) {
    return (
        <div className="max-w-72 rounded overflow-hidden shadow-lg p-4 bg-white">
            <div className="flex justify-center mb-4">
                <img className="w-16 h-16" src={react_img} alt="Company Logo" />
            </div>
            <h2 className="text-xl font-bold text-center mb-2">{title}</h2>
            <p className="text-gray-700 text-base text-center">
                {description}
            </p>
        </div>
    );
}