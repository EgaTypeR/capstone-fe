"use client";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addNotification } from '@/store/notificationSlice';

export interface Notification {
  _id: string;
  event_id: string;
  user_id: string;
  camera_id: string;
  danger: boolean;
  message: string;
  read: boolean;
  sent_at: string;
}

const NotificationWebSocket = () => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const dispatch = useDispatch();



  useEffect(()=>{
    if (ws) {
      ws.onmessage = (event) => {
        // Parse the event data if it's a JSON string
        let data: Notification;
        try {
            data = JSON.parse(event.data); // Attempt to parse the JSON
        } catch (e) {
            console.error("Failed to parse event data:", e);
            return; // Exit if parsing fails
        }
        console.log(data);
        dispatch(addNotification(data));
        const danger = data.danger
        if (danger === true){
          toast.error(`Danger!!!`)
        } else{
          toast.warning(`Warning!!!`)
        }
      }
    }
  },[ws, dispatch])

  useEffect(() => {
    // Initialize WebSocket only once
    const socket = new WebSocket(`${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/get-notification`);
    // socketRef.current = socket;

    socket.onopen = () => console.log("WebSocket connected");

    // Assign the onMessageHandler to onmessage

    socket.onclose = () => console.log("WebSocket disconnected");
    socket.onerror = (error) => console.error("WebSocket error:", error);

    setWs(socket)

    // Cleanup function to close WebSocket when component unmounts
    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
      console.log("WebSocket connection closed");
    };
  }, [dispatch]); // Dependency array with only dispatch

  return null; // Component doesn't need to render anything
};

export default NotificationWebSocket;
