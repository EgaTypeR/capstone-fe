import { useEffect, useRef, useState } from 'react';

const WebRTCPlayer = () => {
  const videoRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [stream, setStream] = useState(null);

  // Ice servers configuration for TURN/STUN
  const iceServersCloudFlare = [
    {
      urls: [
        "stun:stun.cloudflare.com:3478",
        "turn:turn.cloudflare.com:3478?transport=udp",
        "turn:turn.cloudflare.com:3478?transport=tcp",
        "turns:turn.cloudflare.com:5349?transport=tcp"
      ]
    },
    {
      username: "g073314db1d45e01784e43d65f0866d9c3584c65d6562e922d5b307e040ebd7c",
      credential: "fc9d3addc6741fae3da6346c306040a30e9712b7341be41f79ecbc4cefc81724",
    }
  ];

  useEffect(() => {
    // Create WebSocket connection to signaling server
    const socketClient = new WebSocket('wss://rtc.forceai.tech/ws');
    setSocket(socketClient);
    console.log(socketClient);

    socketClient.onopen = () => {
      console.log('Connected to signaling server');
    };

    // Handle incoming offer from the signaling server
    socketClient.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      if (data.type === 'offer') {
        const pc = new RTCPeerConnection({ iceServers: iceServersCloudFlare });
        setPeerConnection(pc);

        // Add video stream from the user's camera
        navigator.mediaDevices.getUserMedia({ video: true })
          .then((localStream) => {
            localStream.getTracks().forEach((track) => pc.addTrack(track, localStream));
            setStream(localStream);
            videoRef.current.srcObject = localStream;
          });

        // Set the remote description and create an answer
        pc.setRemoteDescription(new RTCSessionDescription(data.offer))
          .then(() => pc.createAnswer())
          .then((answer) => {
            pc.setLocalDescription(answer);
            // Send the answer back to signaling server
            socketClient.send(JSON.stringify({ type: 'answer', answer }));
          });

        // Handle incoming video stream from peer
        pc.ontrack = (event) => {
          videoRef.current.srcObject = event.streams[0]; // Set the incoming video stream
        };

        // ICE candidate handling
        pc.onicecandidate = (event) => {
          if (event.candidate) {
            socketClient.send(JSON.stringify({ type: 'candidate', candidate: event.candidate }));
          }
        };
      }
    };

    // Cleanup when the component unmounts
    return () => {
      if (socketClient) {
        socketClient.close();
      }
    };
  }, []);

  return (
    <div className="flex flex-col justify-center w-full h-full relative">
      <div className='flex bg-fablue w-full h-[23px] justify-between items-center'>
        <p className='text-center pl-4'>WebRTC Stream</p>
        <div className='flex gap-1 justify-end items-center pr-4'>
          <p className='font-bold'>LIVE</p>
          <div className='bg-fatomato rounded-full h-3 w-3 flex justify-center'></div>
        </div>
      </div>
      <video 
        ref={videoRef} 
        autoPlay 
        playsInline 
        className='video-js vjs-default-skin w-full h-full'
        controls
        muted
        />
    </div>
  );
};

export default WebRTCPlayer;
