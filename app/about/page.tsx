"use client"
import React from 'react'

export default function page() {
  return (
    <div>
      <div className="bg-[url('/assets/bg-about.png')] bg-cover bg-center min-h-screen flex items-center justify-center">
        <div className='relative bg-white bg-opacity-50 h-56 w-full flex'>
          <div className='w-2/5'> 
          </div>
          <div className='flex items-center'>
          <p className='text-black text-4xl'>An innovative <strong>Early Warning System </strong> <br/> designed to enhance police response <br /> time during street crime incidents. </p>
          </div>
          <div className='bg-white w-52 h-52 rounded-[40px] absolute left-36 -top-10 flex items-center justify-center'>
            <p className='text-black text-xl'>For Logo <br /> and name </p>
          </div>
        </div>
      </div>
    </div>
  )
}
