import React from 'react';

export default function JobCard() {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 bg-white">
            <div className="flex justify-center mb-4">
                <img className="w-16 h-16" src="logo-url-here" alt="Company Logo" />
            </div>
            <h2 className="text-xl font-bold text-center mb-2">Job Title Here</h2>
            <p className="text-gray-700 text-base text-center">
                This is a brief description of the job. It provides an overview of the role and responsibilities.
            </p>
        </div>
    );
}