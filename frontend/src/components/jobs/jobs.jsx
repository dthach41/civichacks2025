import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { getUserById } from '../../api/auth-api';

export default function Jobs() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);
    
    // Update initial filters state
    const [filters, setFilters] = useState({
        remote: false,
        seniority: [],
        minSalary: 0,
        maxSalary: 300000,
        selectedLocations: ['US'],    // only store selected locations
        technologies: [],
        postedDays: 15,
        jobTitles: [],
    });

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

    const navigate = useNavigate();

    useEffect(() => {
      const fetchUser = async () => {
        try {
          const userId = localStorage.getItem("userId");
          console.log(userId);
          if (!userId) return setLoading(false); // Stop loading if no userId
    
          const user = await getUserById(userId);
          console.log(user.jobSeeking);
    
          setFilters((prevFilters) => ({
            ...prevFilters,
            jobTitles: [user.jobSeeking.toLowerCase()], // Update filters before rendering
          }));
    
          setLoading(false); // Mark as loaded after filters are set
        } catch (error) {
          console.error("Error fetching user:", error);
          setLoading(false);
        }
      };
    
      fetchUser();
    }, []);

    const handleFilterChange = (filterName, value) => {
        setFilters(prev => ({
            ...prev,
            [filterName]: value
        }));
    };

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
                    job_title_or: filters.jobTitles,
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

    const handleAnalyze = (description) => {
        navigate('/analyzer', { 
            state: { 
                jobDescription: description,
                autoAnalyze: true  // Flag to indicate this came from jobs page
            }
        });
    };

    const JobModal = ({ job, onClose, onAnalyze }) => {
        const companyName = job?.company || 'No Company';
        
        // Convert HTML to Markdown-friendly format
        const cleanDescription = job?.description?.replace(/<br\s*\/?>/g, '\n')
            .replace(/<\/p>/g, '\n\n')
            .replace(/<[^>]*>/g, '')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .trim();
        
        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-lg w-full max-w-6xl h-[90vh] relative p-8 flex flex-col">
                    {/* Close button */}
                    <button 
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        ×
                    </button>

                    {/* Header section */}
                    <div className="flex items-start gap-6 mb-6">
                        {job.company_object?.logo?.startsWith('http') ? (
                            <img 
                                src={job.company_object.logo} 
                                alt={`${companyName} logo`}
                                className="w-24 h-24 object-contain rounded bg-gray-50"
                            />
                        ) : (
                            <div className="w-24 h-24 rounded bg-gray-100 flex items-center justify-center">
                                <span className="text-3xl font-semibold text-gray-500">
                                    {companyName.charAt(0).toUpperCase()}
                                </span>
                            </div>
                        )}
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-2">
                                {job?.job_title || 'No Title'}
                            </h2>
                            <div className="text-xl text-gray-600">
                                {companyName}
                            </div>
                        </div>
                    </div>

                    {/* Description - Now with Markdown */}
                    <div className="flex-1 overflow-y-auto mb-6 pr-2">
                        <div className="prose max-w-none">
                            {cleanDescription ? (
                                <ReactMarkdown>{cleanDescription}</ReactMarkdown>
                            ) : (
                                <p className="italic">No description available</p>
                            )}
                        </div>
                    </div>

                    {/* Footer actions */}
                    <div className="flex justify-end gap-4 pt-4 border-t">
                        <button 
                            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            onClick={() => onAnalyze(cleanDescription)}
                        >
                            Analyze Skills
                        </button>
                        {job?.url && (
                            <button 
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                onClick={() => window.open(job.url, '_blank')}
                            >
                                Apply Now
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    // Update the job cards to use markdown for previews
    const JobCard = ({ job, onClick }) => {
        const companyName = job?.company || 'No Company';
        const cleanDescription = job?.description?.replace(/<br\s*\/?>/g, '\n')
            .replace(/<\/p>/g, '\n\n')
            .replace(/<[^>]*>/g, '')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .trim();

        return (
            <div 
                className="bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow space-y-4 cursor-pointer"
                onClick={onClick}
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
                    {cleanDescription ? (
                        <div className="line-clamp-3">
                            <ReactMarkdown>{cleanDescription}</ReactMarkdown>
                        </div>
                    ) : (
                        <p className="italic">No description available</p>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="flex">
            <div className="w-64 p-4 border-r">
                {/* Filters sidebar */}
                <div className="space-y-6">
                    <div>
                        <h3 className="font-semibold mb-2">Search Job Titles</h3>
                        <input
                            type="text"
                            placeholder="e.g. Senior Developer"
                            className="w-full p-2 border rounded"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && e.target.value.trim()) {
                                    handleFilterChange('jobTitles', [...filters.jobTitles, e.target.value.trim()]);
                                    e.target.value = '';
                                }
                            }}
                        />
                        {filters.jobTitles.length > 0 && (
                            <div className="mt-2 space-y-1">
                                {filters.jobTitles.map((title, index) => (
                                    <div key={index} className="flex items-center gap-2 bg-gray-100 p-1 rounded">
                                        <span className="text-sm">{title}</span>
                                        <button
                                            onClick={() => handleFilterChange('jobTitles', 
                                                filters.jobTitles.filter((_, i) => i !== index)
                                            )}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            ×
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

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
                        <div className="space-y-2">
                            <input
                                type="range"
                                min="0"
                                max="300000"
                                step="10000"
                                value={filters.minSalary}
                                onChange={(e) => handleFilterChange('minSalary', parseInt(e.target.value))}
                                className="w-full"
                            />
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
                    {jobs.map((job, index) => (
                        <JobCard
                            key={job?.id || index}
                            job={job}
                            onClick={() => setSelectedJob(job)}
                        />
                    ))}

                    {(!jobs || jobs.length === 0) && !loading && !error && (
                        <div className="text-center text-gray-500 mt-8">
                            No jobs found
                        </div>
                    )}

                    {selectedJob && (
                        <JobModal 
                            job={selectedJob} 
                            onClose={() => setSelectedJob(null)}
                            onAnalyze={handleAnalyze}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}