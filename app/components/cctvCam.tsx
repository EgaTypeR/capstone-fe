'use client'
import Hls, { Events, ErrorData } from 'hls.js'
import React, { useEffect, useRef, useState } from 'react'
interface CCTVProps{
  name: string,
  camUrl: string
}

export default function CctvCamBox({name, camUrl}: CCTVProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isOffline, setIsOffline] = useState(false)

  useEffect(()=>{
    const videoElement = videoRef.current
    if (!videoElement) return;

    if(Hls.isSupported()){
      const hls = new Hls({
        lowLatencyMode: true,
        liveMaxLatencyDuration: 8,
        liveSyncDuration: 4,
        maxBufferLength: 30,    
        maxMaxBufferLength: 60, 
        maxBufferSize: 60 * 1000 * 1000,
        maxBufferHole: 0.5,
      })
      hls.loadSource(camUrl)
      hls.attachMedia(videoElement)
      hls.on(Hls.Events.MANIFEST_PARSED, ()=>{
        videoElement.play()
      })

      hls.on(Events.ERROR, (event, data: ErrorData) => {
        if (data.fatal) {
              console.error('Network error encountered, stream may be offline');
              setIsOffline(true); // Set offline status
          }
      });
      return () => {
        hls.destroy();  // Cleanup when component is unmounted
      };
    } else if(videoElement.canPlayType('application/vnd.apple.mpegurl')){
      videoElement.src = camUrl
      videoElement.addEventListener('loadmetadata', ()=>{
        videoElement.play()
      })
    }
  }, [camUrl])
  return (
    <div className='flex flex-col h-[296px] w-[480px]'>
      <div className='flex bg-fablue w-full h-[23px] justify-between items-center px-4'>
        <p className='flex justify-center items-center'>{name}</p>
        <div className='flex gap-1 justify-end items-center'>
          <p className='font-bold'>LIVE</p>
          <div className='bg-fatomato rounded-full h-3 w-3 flex justify-center'></div>
        </div>
      </div>
      <div className='flex bg-black justify-center items-center aspect-video '>
        
        
        {
          isOffline? (
            <div className='p-4'>
              <h2 className="text-lg font-semibold">{name}</h2>
              <p className="text-red-500">Camera is offline</p>
            </div>
          ) : (
            <video 
              ref={videoRef}
              className='video-js vjs-default-skin w-full h-full'
              controls
              autoPlay
              muted
            >
            </video>
          )
        }
      </div>
    </div>
  )
}
