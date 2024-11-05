'use client'
import { useEffect } from 'react'
import { useWebSocket } from './wsProvider'; 
import { useNotification } from './notificationContext';
import { toast } from 'react-toastify';
import axios from 'axios';


export const Notification = () => {
  const {ws} = useWebSocket() 
  const {setUnreadNotifCount} = useNotification()

  useEffect(()=>{
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/client/count-unread-notif`)
    .then((response) => {
      const  data: number  = response.data?.data
      if (data !== undefined){
        setUnreadNotifCount(data)
      } else{
        console.log("Unexpected response: ", data)
      }
    })
    .catch((err) => {
      console.log(err)
    })

    if (ws) {
      ws.onmessage = (event) => {
        // Parse the event data if it's a JSON string
        let data;
        try {
            data = JSON.parse(event.data); // Attempt to parse the JSON
        } catch (e) {
            console.error("Failed to parse event data:", e);
            return; // Exit if parsing fails
        }
        console.log(data);
        const danger = data.danger
        if (danger === true){
          toast.error(`Danger!!!`)
        } else{
          toast.warning(`Warning!!!`)
        }
        
      };
    }
  
    
  },[ws, setUnreadNotifCount])
  return (null)
}
