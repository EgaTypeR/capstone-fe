'use client'
import { RootState } from '@/store'
import axios from 'axios'
import Hls from 'hls.js'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { deleteNotificationByCamIds, deleteNotificationByEventIds } from '@/store/notificationSlice'
import { FormatDate } from './history/alertTable'
interface CCTVProps{
  name: string,
  camUrl: string,
  camId: string
}

export default function CctvCamBox({name, camUrl, camId}: CCTVProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isOffline, setIsOffline] = useState(false)
  const dispatch = useDispatch()
  

  const notification = useSelector((state: RootState) => 
    state.notification.notifications
      .filter((notification) => notification.camera_id === camId)
      .sort((a, b) => new Date(b.sent_at).getTime() - new Date(a.sent_at).getTime())
  );


  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
  
    if (Hls.isSupported()) {
      const hls = new Hls({
        lowLatencyMode: true, // For low latency
        liveSyncDurationCount: 3, // Lowering this to keep latency low (tweak as needed)
        liveMaxLatencyDurationCount: 5, // Set max latency tolerance to keep buffer short
        maxLiveSyncPlaybackRate: 1.5,
      });
  
      hls.loadSource(camUrl);
      hls.attachMedia(videoElement);
  
      // Play video once the manifest is parsed
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoElement.play();
      });
  
      // Error handling
      hls.on(Hls.Events.ERROR, (event, data) => {
        // Check if data.fatal is defined and its type
        // Handle fatal network or media errors
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              console.warn('Fatal network error encountered, attempting recovery');
              hls.startLoad(); // Retry loading if network error is recoverable
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              console.warn('Fatal media error encountered, attempting recovery');
              hls.recoverMediaError(); // Attempt media recovery
              break;
            default:
              console.error('Unrecoverable error, stream may be offline');
              setIsOffline(true); // Display offline state to user
              hls.destroy();
              break;
          }
        }
        hls.startLoad();
      });
      
      
  
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
// State to control the modal visibility
const [isModalOpen, setIsModalOpen] = useState(false);

// Function to toggle the modal
const toggleModal = () => setIsModalOpen(!isModalOpen);

const handleVerification = (event_id:string , cam_id: string) =>{
  const data = {
    verification : true
  }
  axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/client/update-alert/${event_id}`, data)
  .then((event)=>{
    dispatch(deleteNotificationByCamIds([cam_id]))
    console.log(event)
    toast.info("Verification Successful",{
      autoClose:2000
    })
  })
  .catch((err) => {
    console.log(err)
  })
}

const handleUverification = (event_id:string) =>{
  dispatch(deleteNotificationByEventIds([event_id]))
  toast.info("Confirmed Not Crime", {
    autoClose:2000
  })
}

return (
  <div className='flex flex-col justify-center w-full h-full relative'>
    <div className='flex bg-fablue w-full h-[23px] justify-between items-center'>
      <p className='text-center pl-4'>{name}</p>
      <div className='flex gap-1 justify-end items-center'>
        <p className='font-bold'>LIVE</p>
        <div className='bg-fatomato rounded-full h-3 w-3 flex justify-center'></div>
        <button
          className="text-white ml-2 mr-2"
          onClick={toggleModal}
        >
          {"[ ]"}
        </button>
      </div>
    </div>

    <div className='flex bg-black justify-center items-center aspect-video '>
      {isOffline ? (
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
      )}
    </div>

    {/* Color overlay for status */}
    {
      notification.length > 0 &&(
        notification[0].danger? (
          <div className="absolute inset-0 bg-fatomato bg-opacity-60 cursor-pointer" onClick={toggleModal}></div>
        ) : (
          <div className="absolute inset-0 bg-faorange bg-opacity-60" onClick={toggleModal}></div>
        )
      )
    }

    

    {/* Modal for larger CCTV view */}
    {isModalOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
        <div className=" bg-falightgray rounded-lg p-1 w-10/12 md:w-4/5 flex flex-col justify-center">
          <div className='flex justify-between items-center'>
            <p className='text-center pl-4 text-fablue font-bold'>{name}</p>
            <button
              className="text-fablue font-bold items-end w-8 h-8
              px-2 mx-1 mb-1 rounded-full hover:bg-fablue hover:bg-opacity-20"
              onClick={toggleModal}
            >
              ✖
            </button>        
          </div>
          {/* Large Video View */}
          <div className="flex bg-black justify-center items-center w-full h-full">
            {isOffline ? (
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
            )}
          </div>
          {
            notification.length > 0 &&(<div className='flex gap-2 justify-end items-center mt-2 mx-4 mb-1'>
              {
                notification[0]?.danger 
                ? (<div className='text-fatomato font-bold'>Danger detected at</div>)
                : (<div className='text-faorange font-bold'>Warning detected at</div>)
              }
              <div className='text-fablue font-bold mr-10'>
                {FormatDate(notification[0].sent_at).time}
              </div>
              <button
                className='border-gray-800 hover:bg-gray-300 p-2 border-2 rounded-lg text-gray-800 duration-200'
                onClick={() => {
                  handleUverification(notification[0].event_id)
                }}
              >
                Not Street Crime
              </button>
              <button
                className='bg-red-700 hover:bg-red-800 border-red-700 hover:border-red-800 p-2 rounded-lg border-2 text-falightgray duration-200'
                onClick={() => handleVerification(notification[0].event_id, notification[0].camera_id)}
              >
                Street Crime
              </button>
            </div>)
          }
        </div>
      </div>
    )}
  </div>
);
}