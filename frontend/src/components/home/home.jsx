import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import JobCard from "../shared-components/job-card";

const jobs = [
    { id: 1, title: "Software Engineer" },
    { id: 2, title: "Data Scientist" },
    { id: 3, title: "UI/UX Designer" },
    { id: 4, title: "Product Manager" },
    { id: 5, title: "DevOps Engineer" },
  ];

const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 3,
      partialVisibilityGutter: 20
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
      partialVisibilityGutter: 15
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 1,
      partialVisibilityGutter: 10
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 5
    },
  };

const JobCarousel = ({ title }) => {
    return (
      <div className="my-6 max-w-6xl mx-auto">
        <h2 className="text-lg font-semibold text-center mb-4">{title}</h2>
        <Carousel className="py-4"
          responsive={responsive}
          infinite={true}
          autoPlay={false}
          keyBoardControl={true}
          showDots={false}
          removeArrowOnDeviceType={["tablet", "mobile"]}
          itemClass="px-2 flex justify-center w-[90%]"
        >
          {jobs.map((job) => (
            <JobCard key={job.id} title={job.title} description="Job Description" />
          ))}
        </Carousel>
      </div>
    );
  };
  
  export default JobCarousel;

// export default function Home() {
//     return(
//         <>
//         <h1 className="text-green-500">Recommended Jobs</h1>
//         <JobCard title="test job" description="job description"/>

//         <hr className="h-1 my-8 bg-gray-200 border-0 dark:bg-gray-500"></hr>
//         <h1 className="text-green-500">Recommended Jobs</h1>
//         </>
//     )
// }


