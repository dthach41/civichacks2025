import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Jobs() {
    // Add state for salary
    const [salary, setSalary] = useState(100000); // Default value of 100k
    const [isSliding, setIsSliding] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchJobs = async () => {
        setLoading(true);
        setError(null);
        try {
            // Check if we have cached data
            const cachedData = localStorage.getItem('jobsData');
            const cachedTimestamp = localStorage.getItem('jobsTimestamp');
            
            // Use cached data if it's less than 5 minutes old and valid JSON
            if (cachedData && cachedTimestamp) {
                try {
                    const age = Date.now() - parseInt(cachedTimestamp);
                    if (age < 5 * 60 * 1000) { // 5 minutes
                        const parsedData = JSON.parse(cachedData);
                        if (parsedData) {
                            setJobs(parsedData);
                            setLoading(false);
                            return;
                        }
                    }
                } catch (e) {
                    console.warn('Failed to parse cached data:', e);
                    localStorage.removeItem('jobsData');
                    localStorage.removeItem('jobsTimestamp');
                }
            }

            const options = {
                method: 'POST',
                url: 'https://api.theirstack.com/v1/jobs/search',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_THEIRSTACK_API_KEY}`,
                    'Access-Control-Allow-Origin': '*'
                },
                data: {
                    page: 0,
                    limit: 10,
                    posted_at_max_age_days: 15,
                    order_by: [
                        {
                            desc: true,
                            field: "date_posted"
                        }
                    ],
                    job_country_code_or: ["US"],
                    include_total_results: false,
                    blur_company_data: false
                }
            };

            console.log('Making request with options:', {
                ...options,
                headers: { ...options.headers, Authorization: '[HIDDEN]' }
            });

            const response = await axios.request(options);
            console.log('API Response:', response.data);
            
            if (response.data && response.data.data) {
                // Cache the response
                localStorage.setItem('jobsData', JSON.stringify(response.data.data));
                localStorage.setItem('jobsTimestamp', Date.now().toString());
                
                setJobs(response.data.data);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.error('Full error:', error);
            if (error.response) {
                console.error('Error response:', error.response);
                console.error('Error response data:', error.response.data);
            }
            if (error.response?.status === 401) {
                setError('Authentication failed. Please check API key.');
            } else if (error.response?.status === 429) {
                const cachedData = localStorage.getItem('jobsData');
                if (cachedData) {
                    try {
                        setJobs(JSON.parse(cachedData));
                        setError('Using cached data - please try again later');
                    } catch (e) {
                        setError('Rate limit exceeded. Please try again later.');
                    }
                } else {
                    setError('Rate limit exceeded. Please try again later.');
                }
            } else {
                setError(`Failed to fetch jobs: ${error.message}`);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []); // Only fetch on initial mount

    return (
        <div className="flex">
            {/* Left Sidebar */}
            <div className="w-64 bg-gray-50 p-6 min-h-screen border-r">
                <h2 className="text-xl font-semibold mb-6">Filters</h2>
                
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
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 overflow-hidden">
                <div className="flex items-center mb-6">
                    <h1 className="text-3xl font-bold">Jobs</h1>
                </div>

                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                )}
                
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                        {error}
                    </div>
                )}
                
                <div className="overflow-y-auto h-[calc(100vh-12rem)] space-y-4">
                    {jobs.map((job, index) => {
                        
                        return (
                            <div 
                                key={job?.id || index} 
                                className="bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow space-y-4"
                            >
                                <div className="flex items-start gap-4">
                                    {job.company_object?.logo && job.company_object.logo.startsWith('http') && (
                                        <div className="w-16 h-16 relative">
                                            <img 
                                                src={job.company_object.logo} 
                                                alt={`${job.company || 'Company'} logo`}
                                                className="w-16 h-16 object-contain rounded bg-gray-50"
                                                onError={(e) => {
                                                    // Replace with fallback content instead of hiding
                                                    const parent = e.target.parentElement;
                                                    if (parent) {
                                                        // Create fallback content - company initial in a circle
                                                        parent.innerHTML = `
                                                            <div class="w-16 h-16 rounded bg-gray-100 flex items-center justify-center">
                                                                <span class="text-2xl font-semibold text-gray-500">
                                                                    ${(job.company || '?').charAt(0).toUpperCase()}
                                                                </span>
                                                            </div>
                                                        `;
                                                    }
                                                }}
                                            />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <h2 className="text-xl font-semibold text-gray-900">
                                            {job?.job_title || 'No Title'}
                                        </h2>
                                        <div className="text-gray-600 text-lg">
                                            {job?.company || 'No Company'}
                                        </div>
                                    </div>
                                </div>

                                <div className="prose prose-sm max-w-none text-gray-600">
                                    {job?.description ? (
                                        <div 
                                            className="line-clamp-3"
                                            dangerouslySetInnerHTML={{ __html: job.description }}
                                        />
                                    ) : (
                                        <p className="italic">No description available</p>
                                    )}
                                </div>

                                {job?.apply_url && (
                                    <div className="flex justify-end pt-4 border-t">
                                        <button 
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                            onClick={() => window.open(job.apply_url, '_blank')}
                                        >
                                            Apply Now
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}

                    {(!jobs || jobs.length === 0) && !loading && !error && (
                        <div className="text-center text-gray-500 mt-8">
                            No jobs found
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}