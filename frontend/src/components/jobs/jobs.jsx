import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Jobs() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [jobs, setJobs] = useState([]);
    
    // Update initial filters state
    const [filters, setFilters] = useState({
        remote: false,
        seniority: [],
        minSalary: 0,
        maxSalary: 300000,
        selectedLocations: ['US'],    // only store selected locations
        technologies: [],
        postedDays: 15,
    });

    const [showTooltip, setShowTooltip] = useState(false);

    const seniorityOptions = [
        { value: 'c_level', label: 'C-Level' },
        { value: 'staff', label: 'Staff' },
        { value: 'senior', label: 'Senior' },
        { value: 'junior', label: 'Junior' },
        { value: 'mid_level', label: 'Mid Level' }
    ];

    const countryOptions = [
        { value: 'US', label: 'United States' },
        { value: 'CA', label: 'Canada' },
        { value: 'GB', label: 'United Kingdom' },
        { value: 'ES', label: 'Spain' },
        { value: 'FR', label: 'France' },
        { value: 'DE', label: 'Germany' },
        { value: 'AU', label: 'Australia' }  
    ];

    const postedDateOptions = [
        { value: 7, label: 'Last 7 days' },
        { value: 15, label: 'Last 15 days' },
        { value: 30, label: 'Last 30 days' },
        { value: 90, label: 'Last 90 days' }
    ];

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
    };

    const handleSliderMouseDown = () => setShowTooltip(true);
    const handleSliderMouseUp = () => setShowTooltip(false);

    const fetchJobs = async () => {
        console.log('fetchJobs function called');
        setLoading(true);
        setError(null);
        try {
            // Calculate excluded countries as all countries not in selectedLocations
            const excludedCountries = countryOptions
                .map(option => option.value)
                .filter(country => !filters.selectedLocations.includes(country));

            const options = {
                method: 'POST',
                url: 'https://api.theirstack.com/v1/jobs/search',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${import.meta.env.VITE_THEIRSTACK_API_KEY}`
                },
                data: {
                    page: 0,
                    limit: 10,
                    posted_at_max_age_days: filters.postedDays,
                    order_by: [{ 
                        desc: true,
                        field: "date_posted" 
                    }],
                    job_country_code_or: filters.selectedLocations,
                    job_country_code_not: excludedCountries,
                    remote: filters.remote,
                    job_seniority_or: filters.seniority,
                    min_salary_usd: filters.minSalary,
                    max_salary_usd: filters.maxSalary,
                    job_technology_slug_or: filters.technologies,
                    include_total_results: false,
                    blur_company_data: false
                }
            };

            const response = await axios.request(options);
            console.log('API Response:', response.data);
            
            if (response.data && response.data.data) {
                setJobs(response.data.data);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
            // Log the full error response to see validation messages
            if (error.response?.data) {
                console.error('API Error Details:', error.response.data);
            }
            setError(
                error.response?.status === 401 ? 'Authentication failed. Please check API key.' :
                error.response?.status === 429 ? 'Rate limit exceeded. Please try again later.' :
                error.response?.data?.message || 'Failed to fetch jobs. Please try again later.'
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, [filters]); // Re-fetch when filters change

    return (
        <div className="flex">
            <div className="w-64 p-4 border-r">
                {/* Filters sidebar */}
                <div className="space-y-6">
                    <div>
                        <h3 className="font-semibold mb-2">Remote Work</h3>
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={filters.remote}
                                onChange={(e) => handleFilterChange('remote', e.target.checked)}
                                className="mr-2"
                            />
                            Remote Only
                        </label>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Seniority Level</h3>
                        <select
                            multiple
                            value={filters.seniority}
                            onChange={(e) => handleFilterChange('seniority', 
                                Array.from(e.target.selectedOptions, option => option.value))}
                            className="w-full p-2 border rounded h-40 bg-white shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        >
                            {seniorityOptions.map(option => (
                                <option 
                                    key={option.value} 
                                    value={option.value}
                                    className="py-1 px-2 hover:bg-blue-50"
                                >
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <p className="text-sm text-gray-500 mt-1">
                            Hold Ctrl/Cmd to select multiple
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Salary Range</h3>
                        <div className="space-y-2 relative">
                            <input
                                type="range"
                                min="0"
                                max="300000"
                                step="10000"
                                value={filters.minSalary}
                                onChange={(e) => handleFilterChange('minSalary', parseInt(e.target.value))}
                                onMouseDown={handleSliderMouseDown}
                                onMouseUp={handleSliderMouseUp}
                                onTouchStart={handleSliderMouseDown}
                                onTouchEnd={handleSliderMouseUp}
                                className="w-full"
                            />
                            {showTooltip && (
                                <div 
                                    className="absolute -top-8 left-0 bg-black text-white px-2 py-1 rounded text-sm transform -translate-x-1/2"
                                    style={{ 
                                        left: `${(filters.minSalary / 300000) * 100}%`,
                                    }}
                                >
                                    ${filters.minSalary.toLocaleString()}
                                </div>
                            )}
                            <div className="text-sm text-gray-600">
                                ${filters.minSalary.toLocaleString()} - ${filters.maxSalary.toLocaleString()}
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Job Locations</h3>
                        <select
                            multiple
                            value={filters.selectedLocations}
                            onChange={(e) => handleFilterChange('selectedLocations', 
                                Array.from(e.target.selectedOptions, option => option.value))}
                            className="w-full p-2 border rounded h-40 bg-white shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        >
                            {countryOptions.map(option => (
                                <option 
                                    key={option.value} 
                                    value={option.value}
                                    className="py-1 px-2 hover:bg-blue-50"
                                >
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <p className="text-sm text-gray-500 mt-1">
                            Hold Ctrl/Cmd to select multiple
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">Posted Within</h3>
                        <select
                            value={filters.postedDays}
                            onChange={(e) => handleFilterChange('postedDays', parseInt(e.target.value))}
                            className="w-full p-2 border rounded"
                        >
                            {postedDateOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="flex-1 p-8">
                <div className="mb-6 flex justify-between items-center">
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
                        const companyName = job?.company || 'No Company';
                        return (
                            <div 
                                key={job?.id || index} 
                                className="bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow space-y-4"
                            >
                                <div className="flex items-start gap-4">
                                    {job.company_object?.logo?.startsWith('http') && (
                                        <div className="w-16 h-16 relative">
                                            <img 
                                                src={job.company_object.logo} 
                                                alt={`${companyName} logo`}
                                                className="w-16 h-16 object-contain rounded bg-gray-50"
                                                onError={(e) => {
                                                    e.target.parentElement.innerHTML = `
                                                        <div class="w-16 h-16 rounded bg-gray-100 flex items-center justify-center">
                                                            <span class="text-2xl font-semibold text-gray-500">
                                                                ${companyName.charAt(0).toUpperCase()}
                                                            </span>
                                                        </div>
                                                    `;
                                                }}
                                            />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <h2 className="text-xl font-semibold text-gray-900">
                                            {job?.job_title || 'No Title'}
                                        </h2>
                                        <div className="text-gray-600 text-lg">
                                            {companyName}
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

                                {job?.url && (
                                    <div className="flex justify-end pt-4 border-t">
                                        <button 
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                            onClick={() => window.open(job.url, '_blank')}
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
    );
}