import React from 'react'
import { assets } from '../assets/assets'

const AppDownload = () => {
  return (
    <div className='container px-4 2xl:px-20  mx-auto my-20'>
        <div className='relative bg-gradient-to-r from-violet-50 to-purple-50  py-30 text-center  rounded-lg  sm:px-24 lg:px-32'>
            <div>
                <h1 className='text-2xl lg:text-4xl font-bold mb-8 max-w-md'>Download Mobile App For Better Experience</h1>
                <div className='flex gap-4 items-center text-center mx-auto'>
                    <a className='h-12 max-sm:mx-auto' href="#"><img className='inline-block' src={assets.play_store} alt="" /></a>
                    <a className='h-12 max-sm:mx-auto' href="#"><img className='inline-block' src={assets.app_store} alt="" /></a>
                </div>
            </div>
            <img src={assets.app_main_img} alt="" className='absolute right-0 bottom-0 w-80 mr-32 max-lg:hidden' />
        </div>
    </div>
  )
}

export default AppDownload