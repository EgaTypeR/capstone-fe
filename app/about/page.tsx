import React from 'react'
import Image from 'next/image'

export default function page() {
  return (
    <div>
      <div className="bg-[url('/assets/bg-about.webp')] bg-cover bg-center min-h-screen ">
      <div className='absolute w-full h-full bg-black bg-opacity-60 flex items-center justify-center'>
        <Image
          src={'/assets/camera.webp'}
          alt='force-ai-setup'
          width={461*0.75}
          height={769*0.75}
          className='absolute bottom-0 left-0 z-10'
        />
      
        <div className="bg-falightgray bg-opacity-20 flex flex-col md:flex-row justify-center px-5 md:py-10 md:px-10 rounded-3xl">
          
          {/* Image Section */}
          <div className="flex justify-center items-center">
            <Image
              src={'/assets/force-ai-logo.webp'}
              alt='force-ai-logo'
              width={494*0.9}
              height={215*0.9}
              className="object-contain w-1/2 md:w-full h-auto"
            />
          </div>

          {/* Vertical Divider */}
          <div className="w-1 bg-falightgray mx-4 md:mx-8"></div>

          {/* Text Section */}
          <div className="flex justify-center items-center">
            <p className="text-falightgray text-2xl md:text-4xl">
              An innovative <strong>Early Warning System</strong> <br /> 
              designed to enhance police response <br /> 
              time during street crime incidents.
            </p>
          </div>

        </div>
      </div>
      </div>
    </div>
    
  )
}
