import React from 'react'
import CctvCamBox from '../components/cctvCam'

export default function page() {

  const hlsUrlExample = 'https://stream-akamai.castr.com/5b9352dbda7b8c769937e459/live_2361c920455111ea85db6911fe397b9e/index.fmp4.m3u8'
  
  const cctvFeeds = [
    // { id: 1, name: "CCTV Camera 1", feedUrl: hlsUrlExample },
    // { id: 1, name: "CCTV Camera 1", feedUrl: hlsUrlExample },
    { id: 2, name: "CCTV Camera 2", feedUrl: 'https://4c67-114-125-79-216.ngrok-free.app/hls/output.m3u8' },
    // { id: 3, name: "CCTV Camera 3", feedUrl: '' },
    // { id: 4, name: "CCTV Camera 4", feedUrl: '' },
    // { id: 5, name: "CCTV Camera 4", feedUrl: '' },
    // { id: 6, name: "CCTV Camera 4", feedUrl: '' },
    // { id: 7, name: "CCTV Camera 4", feedUrl: '' },
    // { id: 8, name: "CCTV Camera 4", feedUrl: '' },
    // { id: 9, name: "CCTV Camera 4", feedUrl: '' },
  ];

  return (
    <div className='flex bg-falightgray min-h-screen '>
      <div className='mt-14 pt-1'>
        <div className='flex flex-wrap justify-center gap-2 px-3 py-2'>
          {
            cctvFeeds.map((camera)=>(
              <div key={camera.id} className={`h-fit mb-0 ${
                cctvFeeds.length === 1
                  ? 'w-[75%]'
                  : cctvFeeds.length === 2
                  ? 'w-[45%]'
                  : 'w-full md:w-[45%] lg:w-[30%]'
              }`}>
                <CctvCamBox
                  key={camera.id}
                  name={camera.name} 
                  camUrl={camera.feedUrl}
                />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
