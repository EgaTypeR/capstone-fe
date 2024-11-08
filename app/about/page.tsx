import React from 'react'
import Image from 'next/image'

export default function page() {
  return (
    <div>
    <div className="bg-[url('/assets/bg-about.png')] bg-cover bg-center min-h-screen flex items-center justify-center">
      <div className="bg-white bg-opacity-50 w-full flex flex-col md:flex-row justify-evenly p-5 md:py-10 md:px-0">
        <div className="flex justify-center items-center">
          <div className="w-[100%] md:w-4/5 max-w-[501px] flex justify-center"> {/* Responsive container */}
            <Image
              src={'/assets/force-ai-logo.png'}
              alt='force-ai-logo'
              width={501}
              height={213}
              className="object-contain w-1/2 md:w-full h-auto"
            />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-black text-2xl md:text-4xl">
            An innovative <strong>Early Warning System</strong> <br /> 
            designed to enhance police response <br /> 
            time during street crime incidents.
          </p>
        </div>
      </div>
    </div>
  </div>  
  )
}
