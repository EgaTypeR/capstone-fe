import React from 'react'
import CctvCamBox from '../components/cctvCam'

export default function page() {

  const hlsUrlExample = 'https://stream-akamai.castr.com/5b9352dbda7b8c769937e459/live_2361c920455111ea85db6911fe397b9e/index.fmp4.m3u8'
  const cctvFeeds = [
    { id: 1, name: "CCTV Camera 1", feedUrl: hlsUrlExample },
    { id: 2, name: "CCTV Camera 2", feedUrl: '' },
    { id: 3, name: "CCTV Camera 3", feedUrl: '' },
    { id: 4, name: "CCTV Camera 4", feedUrl: '' },
    { id: 5, name: "CCTV Camera 4", feedUrl: '' },
    { id: 6, name: "CCTV Camera 4", feedUrl: '' },
    { id: 7, name: "CCTV Camera 4", feedUrl: '' },
    { id: 8, name: "CCTV Camera 4", feedUrl: '' },
    { id: 9, name: "CCTV Camera 4", feedUrl: '' },
  ];

  return (
    <div className='flex bg-falightgray min-h-screen justify-center'>
      <div className='grid grid-cols-1 gap-0 px-0 md:grid-cols-3'>
        {
          cctvFeeds.map((camera)=>(
            <CctvCamBox 
            key={camera.id}
            name={camera.name} 
            camUrl={camera.feedUrl}
            />
          ))
        }
      </div>
    </div>
  )
}
