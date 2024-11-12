"use client"
import React, { useEffect, useState } from 'react'
import CctvCamBox from '../components/cctvCam'
import axios from 'axios'
import { CameraInfo } from '../components/history/alertTable'
import WebRTCPlayer from '../components/cctv/rtcCam'

const Page: React.FC = () => {

  // const hlsUrlExample = 'https://stream-akamai.castr.com/5b9352dbda7b8c769937e459/live_2361c920455111ea85db6911fe397b9e/index.fmp4.m3u8'

  const [cameras, setCameras] = useState<CameraInfo[]>()
  useEffect(()=>{
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/client/cameras`)
    .then((response) => {
      const {data} = response.data
      setCameras(data)
    })
    .catch((err) =>{
      console.log(err)
    })
  }, [])
  

  return (
    <div className='flex bg-falightgray min-h-screen '>
      <div className='mt-14 pt-1'>
        <div className='flex flex-wrap justify-center gap-2 px-3 py-2'>
          {cameras &&
            (cameras.map((camera)=>(
              <div key={camera._id} className={`h-fit mb-0 min-w-96 ${
                cameras.length === 1
                  ? 'w-[75%]'
                  : cameras.length === 2
                  ? 'w-[45%]'
                  : 'w-full md:w-[45%] lg:w-[30%]'
              }`}>
                <CctvCamBox
                  name={camera.camera_name} 
                  camUrl={camera.camera_url}
                  camId={camera._id}
                />
              </div>
            )))
          }
          <WebRTCPlayer/>
        </div>
      </div>
    </div>
  )
}

export default Page;