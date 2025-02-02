import React, { useEffect } from 'react';
import {useRef} from "react";
import Quill from "quill";
import { JobCategories, JobLocations } from '../assets/assets';
import { useForm } from 'react-hook-form';

const AddJob = () => {
  const [title, setTitle] = React.useState("");
  const [location, setLocation] = React.useState("Bangalore");
  const [category, setCategory] = React.useState("Programming");
  const [level, setLevel] = React.useState("Beginner Level");
  const [salary, setSalary] = React.useState(0);
  const editorRef = React.useRef(null);
  const quillRef = React.useRef(null);
  const {
    register, // Registers input fields
    handleSubmit, // Handles form submission
    formState: { errors }, // Tracks form errors
  } = useForm();

  const onSubmit = (data) => {
    console.log(data,'hi data'); // Logs form data
  };

  useEffect(() => {
    if (quillRef.current == null) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
     
      });
    }
  }, []);
  return (
    <form onSubmit={handleSubmit(onSubmit)} className='container p-4 flex flex-col w-full items-start gap-3'>
      <div className='w-full'>
        <p className='mb-2'>Job Title</p>
        <input
          type="text"
          placeholder='Enter Job Title'
          className='max-w-lg w-full px-3 py-2 border-2 border-gray-200 rounded'
          // use the register function to register the input field
          id='title'
          {...register("title",{required:"Job title is required"})}
        />
        {errors.title && <p className='text-red-400 text-sm'>{errors.title.message}</p>}
      </div>
      <div className='w-full max-w-lg'>
        <p className='my-2'>Job Description</p>
        <div  ref={editorRef}></div>
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
          <div>
            <p className='mb-2'>Job Category</p>
            <select className='w-full border-2 border-gray-300 px-3 py-2 rounded' value={category} onChange={(e) => setCategory(e.target.value)}>
              {
                JobCategories.map((category) => (
                  <option value={category}>{category}</option>
                ))
              }
            </select>
          </div>

          <div>
            <p className='mb-2'>Job Location</p>
            <select className='w-full border-2 border-gray-300 px-3 py-2 rounded' value={location} onChange={(e) => setLocation(e.target.value)}>
              {
                JobLocations.map((location) => (
                  <option value={location}>{location}</option>
                ))
              }
            </select>
          </div>


          <div>
            <p className='mb-2'>Job Level</p>
            <select className='w-full border-2 border-gray-300 px-3 py-2 rounded' value={level} onChange={(e) => setLevel(e.target.value)}>
             <option value="Beginner Level">Beginner Level</option>
             <option value="Intermediate Level">Intermediate Level</option>
             <option value={"Advanced Level"}>Advanced Level</option>
            </select>
          </div>
      </div>

      <div>
        <p className='mb-2'>Job Salary</p>
        <input min={0} className='w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[120px]' type="number" placeholder='2500' value={salary} onChange={(e) => setSalary(e.target.value)} />
      </div>
      <button className='w-28 py-3 mt-4 bg-black text-white rounded cursor-pointer'>Add</button>
    </form>
  )
}

export default AddJob