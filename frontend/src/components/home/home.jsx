import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import JobCard from "../shared-components/job-card";
import axios from 'axios';

const JobCarousel = () => {
    
    const [favoriteJobs, setFavoriteJobs] = useState(() => {
        // Initialize from localStorage if available
        const saved = localStorage.getItem('favoriteJobs');
        return saved ? JSON.parse(saved) : [];
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState(null);

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

    const fetchJobs = async () => {
      console.log('fetchJobs function called');
      try {


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
  }, []); // Re-fetch when filters change

    // Save favorites to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('favoriteJobs', JSON.stringify(favoriteJobs));
    }, [favoriteJobs]);

    const handleFavorite = (jobId) => {
        const job = recommendedJobs.find(j => j.id === jobId);
        if (job) {
            if (favoriteJobs.some(j => j.id === jobId)) {
                // Remove from favorites
                setFavoriteJobs(favoriteJobs.filter(j => j.id !== jobId));
            } else {
                // Add to favorites
                setFavoriteJobs([...favoriteJobs, job]);
            }
        }
    };

    const responsive = {
        superLargeDesktop: {
          breakpoint: { max: 4000, min: 1024 },
          items: 3,
          partialVisibilityGutter: 40
        },
        desktop: {
          breakpoint: { max: 1024, min: 768 },
          items: 2,
          partialVisibilityGutter: 30
        },
        tablet: {
          breakpoint: { max: 768, min: 464 },
          items: 1,
          partialVisibilityGutter: 20
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          partialVisibilityGutter: 10
        },
    };

    return (
      <>
        <div className="my-6 max-w-6xl mx-auto">
          <h1 className="text-2xl font-semibold text-center mb-4">Recommended Jobs</h1>
          <Carousel
            className="py-4"
            responsive={responsive}
            infinite={true}
            autoPlay={false}
            keyBoardControl={true}
            showDots={false}
            removeArrowOnDeviceType={["tablet", "mobile"]}
            itemClass="px-2 flex justify-center w-[85%]"
          >
            {jobs.map((job) => {
  const companyName = job.company_object?.name || 'No Company';

  return (
    <JobCard
      key={job.id}
      id={job.id}
      title={job.job_title}
      img={job.company_object?.logo}
      company={companyName}
      onFavorite={handleFavorite}
      isFavorited={favoriteJobs.some(j => j.id === job.id)}
      alt={`${companyName} logo`}
    />
  );
})}
          </Carousel>
          <hr className="h-0.5 my-8 bg-gray-200 border-0 dark:bg-gray-500"></hr>
        </div>
        <div className="my-6 max-w-6xl mx-auto">
          <h2 className="text-2xl font-semibold text-center mb-4">Your Jobs</h2>
          {favoriteJobs.length > 0 ? (
            <Carousel
              className="py-4"
              responsive={responsive}
              infinite={true}
              autoPlay={false}
              keyBoardControl={true}
              showDots={false}
              removeArrowOnDeviceType={["tablet", "mobile"]}
              itemClass="px-2 flex justify-center w-[85%]"
            >
              {favoriteJobs.map((job) => (
                <JobCard
                  key={job.id}
                  id={job.id}
                  title={job.title}
                  description="Job Description"
                  onFavorite={handleFavorite}
                  isFavorited={true}
                />
              ))}
            </Carousel>
          ) : (
            <p className="text-center text-gray-500">No favorite jobs yet. Star some jobs above to add them here!</p>
          )}
        </div>
      </>
    );
};

export default JobCarousel;