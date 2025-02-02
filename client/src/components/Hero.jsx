import React, { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Hero = () => {
    const {setSearchdFilter,setIsSearched,SearchdFilter}=useContext(AppContext);
    const titleRef=useRef(null);
    const locationRef=useRef(null);
    console.log(SearchdFilter); 

    const onSearch=(e)=>{
        e.preventDefault();
        setSearchdFilter({title:titleRef.current.value,location:locationRef.current.value});
        setIsSearched(true);
    }
  return (
    <div className="container 2xl:px-20 my-10 mx-auto">
      <div className="bg-gradient-to-r from-purple-800 to-purple-950 text-white py-16 text-center mx-2 rounded-xl">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-4">Over 10,000+ jobs to apply</h2>
        <p className="mb-8 max-w-xl mx-auto text-sm  px-5 text-gray-300">
          Your Next Big Career Move Starts Right Here - Explore the Best Job Opportunities and Take the First Step Toward Your Future!
        </p>
        <div className="flex items-center justify-between bg-white rounded text-gray-600 max-w-xl mx-4 pl-4 sm:mx-auto">
          <div className="flex items-center">
            <img src={assets.search_icon} alt="" className="h-4 sm:h-5" />
            <input type="text" placeholder="Search for Jobs" className="max-sm:text-xs p-4 outline-none rounded w-full " ref={titleRef}/>
          </div>

          <div className="flex items-center">
            <img src={assets.location_icon} alt="" className="h-4 sm:h-5" />
            <input type="text" placeholder="Location" className="max-sm:text-xs p-4 outline-none rounded w-full " ref={locationRef} />
          </div>
          <button className="bg-blue-600 px-6 py-2 rounded text-white m-1 cursor-pointer " onClick={onSearch}>Search</button>
        </div>
      </div>

      <div className="border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md flex">
        <div className="flex items-center gap-10 lg:gap-16 flex-wrap">
          <p className="font-medium">Trusted by</p>
          <img className="h-6" src={assets.microsoft_logo} alt="" />
          <img className="h-6" src={assets.walmart_logo} alt="" />
          <img className="h-6" src={assets.accenture_logo} alt="" />
          <img className="h-6" src={assets.samsung_logo} alt="" />
          <img className="h-6" src={assets.amazon_logo} alt="" />
          <img className="h-6" src={assets.adobe_logo} alt="" />
        </div>
      </div> 
    </div>
  );
};

export default Hero;
