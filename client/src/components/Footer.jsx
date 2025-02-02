import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='container px-4 2xl:px-20 mx-auto flex items-center justify-between mt-20 py-3'>
        <img width={160} src={assets.logo} alt="" className='pr-4' />
        <p className='flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden'>All right reserved. Copyright @job-portal</p>
        <div className='flex gap-2.5 items-center'>
            <img width={38} src={assets.facebook_icon} alt="" />
            <img width={38} src={assets.twitter_icon} alt="" />
            <img width={38} src={assets.instagram_icon} alt="" />
        </div>
    </div>
  )
}

export default Footer