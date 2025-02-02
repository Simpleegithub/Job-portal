import React from 'react';
import { manageJobsData } from '../assets/assets';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

const ManageJobs = () => {
  const navigate = useNavigate();
  return (
    <div className='container mx-auto p-4'>
      <div className='w-full max-w-[800px] bg-white border border-gray-200 rounded max-sm:text-sm'>
        <table className="w-full">
          <thead>
            <tr className='border-b'>
              <th className='py-2 px-4 text-left'>#</th>
              <th className='py-2 px-4 text-left'>Job Title</th>
              <th className='py-2 px-4 text-left max-sm:hidden'>Date</th>
              <th className='py-2 px-4 text-left max-sm:hidden'>Location</th>
              <th className='py-2 px-4 text-left'>Applicants</th>
              <th className='py-2 px-4 text-left'>Visible</th>
            </tr>
          </thead>
          <tbody>
            {
              manageJobsData.map((job, index) => (
                <tr key={index} className='text-gray-700 '>
                  <td className='py-2 px-4 border-b text-center'>{index + 1}</td>
                  <td className='py-2 px-4 border-b'>{job.title}</td>
                  <td className='py-2 px-4 border-b max-sm:hidden'>{moment(job.date).format('ll')}</td>
                  <td className='py-2 px-4 border-b max-sm:hidden'>{job.location}</td>
                  <td className='py-2 px-4 border-b'>{job.applicants}</td>
                  <td className='py-2 px-4 border-b'>
                    <input type="checkbox" className="cursor-pointer" />
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
      <div className='mt-4 flex justify-end max-w-[800px]'>
        <button onClick={() => navigate('/dashboard/add-job')} className='bg-black text-white px-4 py-2  rounded'>Add new Job</button>
      </div>
    </div>
  );
}

export default ManageJobs;
