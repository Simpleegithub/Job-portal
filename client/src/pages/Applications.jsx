import React from "react";
import Navbar from "../components/Navbar";
import { assets, jobsApplied } from "../assets/assets";
import moment from "moment";
import Footer from "../components/Footer";

const Applications = () => {
  const [isEdit, setisEdit] = React.useState(false);
  const [resume, setResume] = React.useState(null);
  console.log(resume);
  return (
    <>
      <Navbar />
      <div className="container px-4 min-h-[65vh] 2xl:px-20 mx-auto my-10 ">
        <h2 className="text-xl font-semibold">Your Resume</h2>
        <div className="flex gap-2 mb-6 mt-3">
          {isEdit ? (
            <>
              <label className="flex items-center gap-2" htmlFor="resumeUpload">
                <p className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg mr-2">Select Resume</p>
                <input id="resumeUpload" accept="application/pdf" onChange={(e) => setResume(e.target.files[0])} type="file" hidden />
                <img src={assets.profile_upload_icon} alt="" />
              </label>
              <button onClick={() => setisEdit(false)} className="bg-green-100 border border-green-400 px-4 py-2 rounded-lg">Save</button>
            </>
          ) : (
            <div className="flex gap-2">
              <a className="bg-blue-100 text-blue-600 px-4 py-2 rounded-lg" href="">
                Resume
              </a>
              <button onClick={() => setisEdit(true)} className="text-gray-400 border border-gray-300 px-4 py-2 rounded-lg">
                Edit
              </button>
            </div>
          )}
        </div>
        <h2 className="text-xl font-semibold mb-4">Jobs Applied</h2>
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr>
              <th className="px-4 py-3 border-b border-gray-300 text-left">Company</th>
              <th className="px-4 py-3 border-b border-gray-300 text-left">Job Title</th>
              <th className="px-4 py-3 border-b border-gray-300 text-left max-sm:hidden ">Location</th>
              <th className="px-4 py-3 border-b border-gray-300 text-left max-sm:hidden ">Date</th>
              <th className="px-4 py-3 border-b border-gray-300 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {
              jobsApplied.map((job) => (
                <tr key={job._id} className="max-sm:border-b border-gray-300">
                  <td className="py-3 px-4 flex items-center gap-2 sm:border-b sm:border-gray-300 max-sm:mt-2">
                    <img className="w-8 h-8" src={job.logo} alt="" />
                    {job.company}
                  </td>
                  <td className="py-3 px-4 sm:border-b sm:border-gray-300">{job.title}</td>
                  <td className="py-3 px-4 sm:border-b sm:border-gray-300 max-sm:hidden ">{job.location}</td>
                  <td className="py-3 px-4 sm:border-b sm:border-gray-300 max-sm:hidden ">{moment(job.date).format("MMM DD, YYYY")}</td>
                  <td className="py-3 px-4 sm:border-b sm:border-gray-300 ">
                    <span className={`px-4 py-1.5 rounded ${job.status === "Pending" ? "bg-yellow-100 text-yellow-600" : job.status === "Rejected" ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}>
                    {job.status}
                    </span>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <Footer/>
    </>
  );
};

export default Applications;
