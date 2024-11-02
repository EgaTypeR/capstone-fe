'use client'
import Hls, { Events, ErrorData } from 'hls.js'
import React, { useEffect, useRef, useState } from 'react'
interface CCTVProps{
  name: string,
  camUrl: string
}

const status = 'none'

export default function CctvCamBox({name, camUrl}: CCTVProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isOffline, setIsOffline] = useState(false)

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
  
    if (Hls.isSupported()) {
      const hls = new Hls({
        xhrSetup: (xhr, url) => {
          // Add custom headers here
          xhr.setRequestHeader("ngrok-skip-browser-warning", "69420");
        },
        lowLatencyMode: true, // Uncomment if you want low latency for live streams
      });
  
      hls.loadSource(camUrl);
      hls.attachMedia(videoElement);
  
      // Play video once the manifest is parsed
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoElement.play();
      });
  
      // Error handling
      // hls.on(Hls.Events.ERROR, (event, data) => {
      //   // Check if data.fatal is defined and its type
      //   // if (data.fatal !== undefined) {
      //   //   console.error('Network error encountered, stream may be offline:', data);
      //   //   console.error(`Error type: ${data.type}, details: ${data.details}, fatal: ${data.fatal}`);
      //   //   setIsOffline(true);
      //   // }
      //   hls.startLoad();
      // });
      
      
  
      // Cleanup on component unmount
      return () => {
        hls.destroy();
      };
    } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
      // For Safari or other compatible browsers
      videoElement.src = camUrl;
      videoElement.addEventListener('loadedmetadata', () => {
        videoElement.play();
      });
    }
  }, [camUrl]);
  
  return (
    <div className='flex flex-col justify-center w-full h-full relative'>
      <div className='flex bg-fablue w-full h-[23px] justify-between items-center px-4'>
        <p className='text-center'>{name}</p>
        <div className='flex gap-1 justify-end items-center'>
          <p className='font-bold'>LIVE</p>
          <div className='bg-fatomato rounded-full h-3 w-3 flex justify-center'></div>
        </div>
      </div>
      <div className='flex bg-black justify-center items-center aspect-video '>
        {
          isOffline? (
            <div className='p-4 w-full h-full'>
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
      {
        (status.toLowerCase() == 'danger') 
        ? <div className="absolute inset-0 bg-fatomato bg-opacity-60"></div>
        : (status.toLowerCase() == 'warning'
        ? <div className="absolute inset-0 bg-faorange bg-opacity-60"></div>
        : <></>
      )
      }
    </div>
  )
}
