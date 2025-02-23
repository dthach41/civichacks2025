import React, { useState } from 'react';

export default function Jobs() {
    // Add state for salary
    const [salary, setSalary] = useState(100000); // Default value of 100k
    const [isSliding, setIsSliding] = useState(false);

    return (
        <div className="flex">
            {/* Left Sidebar */}
            <div className="w-64 bg-gray-50 p-6 min-h-screen border-r">
                <h2 className="text-xl font-semibold mb-6">Filters</h2>
                
                {/* Job Type */}
                <div className="mb-6">
                    <h3 className="font-medium mb-3">Job Type</h3>
                    <div className="space-y-2">
                        <label className="flex items-center">
                            <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                            <span className="ml-2">Full-time</span>
                        </label>
                        <label className="flex items-center">
                            <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                            <span className="ml-2">Part-time</span>
                        </label>
                        <label className="flex items-center">
                            <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                            <span className="ml-2">Contract</span>
                        </label>
                    </div>
                </div>

                {/* Experience Level */}
                <div className="mb-6">
                    <h3 className="font-medium mb-3">Experience Level</h3>
                    <div className="space-y-2">
                        <label className="flex items-center">
                            <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                            <span className="ml-2">Entry Level</span>
                        </label>
                        <label className="flex items-center">
                            <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                            <span className="ml-2">Mid Level</span>
                        </label>
                        <label className="flex items-center">
                            <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                            <span className="ml-2">Senior</span>
                        </label>
                    </div>
                </div>

                {/* Salary Range */}
                <div className="mb-6">
                    <h3 className="font-medium mb-3">Salary Range</h3>
                    <div className="relative">
                        <input 
                            type="range" 
                            min="0" 
                            max="200000" 
                            value={salary}
                            onChange={(e) => setSalary(e.target.value)}
                            onMouseDown={() => setIsSliding(true)}
                            onMouseUp={() => setIsSliding(false)}
                            onMouseLeave={() => setIsSliding(false)}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        {isSliding && (
                            <div 
                                className="absolute -top-8 transform -translate-x-1/2 bg-black text-white px-2 py-1 rounded text-sm"
                                style={{ left: `${(salary / 200000) * 100}%` }}
                            >
                                ${(salary / 1000).toFixed(0)}k
                            </div>
                        )}
                    </div>
                    <div className="flex justify-between text-sm text-gray-600 mt-1">
                        <span>$0</span>
                        <span>$200k</span>
                    </div>
                </div>

                {/* Location */}
                <div className="mb-6">
                    <h3 className="font-medium mb-3">Location</h3>
                    <div className="space-y-2">
                        <label className="flex items-center">
                            <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                            <span className="ml-2">Remote</span>
                        </label>
                        <label className="flex items-center">
                            <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                            <span className="ml-2">On-site</span>
                        </label>
                        <label className="flex items-center">
                            <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                            <span className="ml-2">Hybrid</span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
                <div className="flex items-center mt-16 ml-4">
                    <h1 className="text-3xl font-bold my-4">Jobs</h1>
                </div>
            </div>
        </div>
    )
}