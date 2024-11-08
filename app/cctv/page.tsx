import React from 'react'
import CctvCamBox from '../components/cctvCam'

export default function page() {

  // const hlsUrlExample = 'https://stream-akamai.castr.com/5b9352dbda7b8c769937e459/live_2361c920455111ea85db6911fe397b9e/index.fmp4.m3u8'
  
  const cctvFeeds = [
    { id: "00000000000000000000c251", name: "CCTV Camera 2", feedUrl: 'https://stream.forceai.tech/hls/stream.m3u8' },
  ];

  return (
    <div className='flex bg-falightgray min-h-screen '>
      <div className='mt-14 pt-1'>
        <div className='flex flex-wrap justify-center gap-2 px-3 py-2'>
          {
            cctvFeeds.map((camera)=>(
              <div key={camera.id} className={`h-fit mb-0 min-w-96 ${
                cctvFeeds.length === 1
                  ? 'w-[75%]'
                  : cctvFeeds.length === 2
                  ? 'w-[45%]'
                  : 'w-full md:w-[45%] lg:w-[30%]'
              }`}>
                <CctvCamBox
                  name={camera.name} 
                  camUrl={camera.feedUrl}
                  camId={camera.id}
                />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
