import { createContext, useEffect } from "react";
import React from "react";
import { jobsData } from "../assets/assets";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [SearchdFilter, setSearchdFilter] = React.useState({
    title:"",
    location:""
  });
  const [isSearched, setIsSearched] = React.useState(false);
  const [jobs, setJobs] = React.useState([]);
  const [showRecruiterLogin, setShowRecruiterLogin] = React.useState(false);

  useEffect(() => {
    const fetchJobs=async()=>{
      setJobs(jobsData);
    }
    fetchJobs();
  },[])
  const value = {
    SearchdFilter,
    setSearchdFilter,
    isSearched,
    setIsSearched,
    jobs,
    setJobs,
    showRecruiterLogin,
    setShowRecruiterLogin
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
