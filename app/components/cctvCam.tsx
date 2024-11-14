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

  let retryCount = 0;
  const maxRetry = 10;
  const retryDelay = 2000;

  // Function to initialize HLS
  const initializeHls = () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (Hls.isSupported()) {
      const hls = new Hls({
        lowLatencyMode: true,
        liveSyncDurationCount: 3,
        liveMaxLatencyDurationCount: 5,
        maxLiveSyncPlaybackRate: 1,
      });

      hls.loadSource(camUrl);
      hls.attachMedia(videoElement);

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoElement.play();
      });

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              retryCount++;
              if (retryCount <= maxRetry) {
                setTimeout(() => hls.startLoad(), retryDelay);
              } else {
                setIsOffline(true);
              }
              break;
            case Hls.ErrorTypes.MEDIA_ERROR:
              hls.recoverMediaError();
              retryCount = 0;
              break;
            default:
              setIsOffline(true);
              hls.destroy();
              break;
          }
        }
      });

      return hls;
    } else if (videoElement.canPlayType('application/vnd.apple.mpegurl')) {
      videoElement.src = camUrl;
      videoElement.addEventListener('loadedmetadata', () => {
        videoElement.play();
      });
    }
  };

  useEffect(() => {
    if (camUrl === "") setIsOffline(true);

    const hlsInstance = initializeHls();

    return () => {
      if (hlsInstance) hlsInstance.destroy();
    };
  }, [camUrl]);

  const [isModalOpen, setIsModalOpen] = useState(false);
// Toggle modal and initialize video
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    // if (!isModalOpen) {
    //   const hlsInstance = initializeHls();
    //   return () => {
    //     if (hlsInstance) hlsInstance.destroy();
    //   };
    // }
  };

// State to control the modal visibility


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
  <div className={`${isModalOpen ? 'fixed inset-0 flex justify-center items-center bg-black bg-opacity-75 z-50 w-screen h-screen':'relative'}`}>
    {
      (notification.length > 0 && !isModalOpen) &&(
        notification[0].danger? (
          <div className="absolute inset-0 bg-fatomato bg-opacity-60 cursor-pointer z-10" onClick={toggleModal}></div>
        ) : (
          <div className="absolute inset-0 bg-faorange bg-opacity-60 cursor-pointer z-10" onClick={toggleModal}></div>
        )
      )
    }
  <div className={`${isModalOpen && 'bg-white p-2 rounded-lg flex justify-center items-center w-2/3'}`}>
  <div className={`flex flex-col justify-center w-full h-full`}>
    <div className={`flex ${isModalOpen ? 'bg-white text-fablue pb-1': 'bg-fablue text-white py-[2px]'} w-full justify-between items-center`}>
      <p className='text-center font-semibold pl-4'>{name}</p>
      <div className='flex gap-1 justify-end items-center mx-4'>
        <p className='font-bold'>LIVE</p>
        <div className='bg-fatomato rounded-full h-4 w-4 flex justify-center mr-4'></div>
          {
            isModalOpen? (
              <button
              className="fa-solid fa-x items-end rounded-full hover:bg-fablue hover:bg-opacity-20 w-8 aspect-square"
              onClick={toggleModal}
            >
              
            </button>
            ) :(
              <button
                className="fa-regular fa-expand items-end rounded-full hover:bg-fablue hover:bg-opacity-20"
                onClick={toggleModal}
              >
              </button>
            )
          }
      </div>
    </div>

    <div className={`flex flex-col bg-black justify-center items-center aspect-video`}>
      {isOffline ? (
        <div className='p-4 w-full h-full flex flex-col justify-center items-center'>
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
        (notification.length > 0 && isModalOpen) && (<div className='flex gap-2 justify-end items-center mt-2 bg-white'>
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
  </div>
);
}