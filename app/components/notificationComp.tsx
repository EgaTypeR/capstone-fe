'use client'
import { useEffect } from 'react'
import { useWebSocket } from './wsProvider'; 
import { toast } from 'react-toastify';


export const Notification = () => {
  const {ws} = useWebSocket() 

  useEffect(()=>{
    // const ws = new WebSocket('ws://localhost:8080/ws/get-notification', )
    if (!ws){
      return
    }

    ws.onmessage = (event) =>{
      console.log(event.data)
      toast.info(`New Notification ${event.data}`)
    }


    
  },[ws])
  return (null)
}
