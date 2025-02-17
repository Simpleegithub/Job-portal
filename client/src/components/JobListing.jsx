import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { assets, JobCategories, JobLocations } from "../assets/assets";
import JobCard from "./JobCard";

const JobListing = () => {
  const { SearchdFilter, isSearched, setSearchdFilter, setIsSearched, jobs } = useContext(AppContext);
  const [showFilter, setShowFilter] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedCategory, setSelectedCategory] = React.useState([]);
  const [selectedlocations, setSelectedlocations] = React.useState([]);
  const [filteredJobs, setFilteredJobs] = React.useState(jobs);
  console.log(filteredJobs,'hi filter jobs');

  const handleCategoryChange = (category) => {
    setSelectedCategory((prev)=>prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category]);
  }

  const handleLocationChange = (location) => {
    setSelectedlocations((prev)=>prev.includes(location) ? prev.filter((item) => item !== location) : [...prev, location]);
  }


  useEffect(() => {

    const matchesCategory=job=>selectedCategory.length===0 || selectedCategory.includes(job.category);
    const matchesLocation=job=>selectedlocations.length===0 || selectedlocations.includes(job.location);
    const matchesTitle=job=>SearchdFilter.title.length===0 || job.title.toLowerCase().includes(SearchdFilter.title.toLowerCase());
    const matchesSearchLocation=job=>SearchdFilter.location.length===0 || job.location.toLowerCase().includes(SearchdFilter.location.toLowerCase());
    const newFilteredJobs=jobs.filter(job=>matchesCategory(job) && matchesLocation(job) && matchesTitle(job) && matchesSearchLocation(job));
    setFilteredJobs(newFilteredJobs);
    setCurrentPage(1);

  
  }, [selectedCategory,selectedlocations,SearchdFilter,jobs]);


  return (
    <div className="container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8">
      {/* sidebar  */}
      <div className="w-full lg:w-1/4 bg-white px-4">
        {/* Search filter from hero component  */}
        {isSearched && (isSearched?.title !== "" || isSearched?.location !== "") && (
          <>
            <h3 className="font-medium text-lg mb-4">Current Search</h3>
            <div className="mb-4 text-gray-600">
              {SearchdFilter.title && (
                <span className="inline-flex items-center gap-2.5 bg-blue-50  border border-blue-200 px-4 py-1.5 rounded">
                  {SearchdFilter.title}{" "}
                  <img
                    onClick={() => {
                      setSearchdFilter((prev) => ({ ...prev, title: "" }));
                    }}
                    className="cursor-pointer"
                    src={assets.cross_icon}
                    alt=""
                  />
                </span>
              )}

              {SearchdFilter.location && (
                <span className="inline-flex items-center gap-2.5 bg-red-50  border border-red-200 px-4 py-1.5 rounded ml-2">
                  {SearchdFilter.location}{" "}
                  <img
                    onClick={() => {
                      setSearchdFilter((prev) => ({ ...prev, location: "" }));
                    }}
                    className="cursor-pointer"
                    src={assets.cross_icon}
                    alt=""
                  />{" "}
                </span>
              )}
            </div>
          </>
        )}

        <button onClick={() => setShowFilter(!showFilter)} className="px-6 py-1.5 rounded border border-gray-400 lg:hidden">
          {showFilter ? "Close" : "Filters"}
        </button>

        {/* category filter  */}
        <div className={showFilter ? "block" : "hidden"}>
          <h4 className="font-medium text-lg py-4">Search by Categories</h4>
          <ul className="space-y-4 text-gray-600">
            {JobCategories.map((category, index) => (
              <li className="flex gap-3 items-center" key={index}>
                <input type="checkbox" className="scale-125" onChange={()=>handleCategoryChange(category)} checked={selectedCategory.includes(category)}/>
                {category}
              </li>
            ))}
          </ul>
        </div>

        {/* Location filter  */}
        <div className={showFilter ? "block" : "hidden"}>
          <h4 className="font-medium text-lg py-4 pt-14">Search by Locations</h4>
          <ul className="space-y-4 text-gray-600">
            {JobLocations.map((location, index) => (
              <li className="flex gap-3 items-center" key={index}>
                <input type="checkbox" className="scale-125" onChange={()=>handleLocationChange(location)} checked={selectedlocations.includes(location)} />
                {location}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Job listing  */}
      <section className="w-full lg:w-3/4 text-gray-800 max-lg:px-4">
        <h3 className="font-medium text-3xl py-2" id="job-list">
          Latest Jobs
        </h3>
        <p className="mb-8">Get your desired job from top companies</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredJobs.slice((currentPage - 1) * 6, currentPage * 6).map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>

        {/* Pagination  */}
        <div className="">
          {filteredJobs.length > 0 && (
            <div className="flex items-center justify-center mt-10 space-x-2">
              <a href="#">
                <img onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} src={assets.left_arrow_icon} alt="" />
              </a>
              {Array.from({ length: Math.ceil(filteredJobs.length / 6) }).map((_, index) => (
                <a href="#job-list">
                  <button onClick={() => setCurrentPage(index + 1)} className={`cursor-pointer w-10 h-10 flex items-center justify-center rounded border border-gray-300 ${currentPage === index + 1 ? "bg-blue-100 text-blue-500" : "text-gray-500"}`}>{index + 1}</button>
                </a>
              ))}
              <a href="#">
                <img  onClick={() => setCurrentPage(Math.min(currentPage + 1, Math.ceil(filteredJobs.length / 6)))} src={assets.right_arrow_icon} alt="" />
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default JobListing;
