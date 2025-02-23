import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import JobCard from "../shared-components/job-card";

const JobCarousel = () => {
    const [recommendedJobs, setRecommendedJobs] = useState([
        { id: 1, title: "Software Engineer" },
        { id: 2, title: "Data Scientist" },
        { id: 3, title: "UI/UX Designer" },
        { id: 4, title: "Product Manager" },
        { id: 5, title: "DevOps Engineer" },
    ]);
    
    const [favoriteJobs, setFavoriteJobs] = useState(() => {
        // Initialize from localStorage if available
        const saved = localStorage.getItem('favoriteJobs');
        return saved ? JSON.parse(saved) : [];
    });

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
            {recommendedJobs.map((job) => (
              <JobCard
                key={job.id}
                id={job.id}
                title={job.title}
                description="Job Description"
                onFavorite={handleFavorite}
                isFavorited={favoriteJobs.some(j => j.id === job.id)}
              />
            ))}
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