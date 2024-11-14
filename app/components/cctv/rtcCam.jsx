'use client'
import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const WebRTCPlayer = () => {
  const videoRef = useRef(null);

  const iceServers = [
    {
      urls: [
        "stun:stun.cloudflare.com:3478",
        "turn:turn.cloudflare.com:3478?transport=udp",
        "turn:turn.cloudflare.com:3478?transport=tcp",
        "turns:turn.cloudflare.com:5349?transport=tcp"
      ],
      username: "g073314db1d45e01784e43d65f0866d9c3584c65d6562e922d5b307e040ebd7c",
      credential: "fc9d3addc6741fae3da6346c306040a30e9712b7341be41f79ecbc4cefc81724"
    }
  ];

  useEffect(() => {
    const socket = io("wss://rtc.forceai.tech"); // Replace with your signaling server URL
    const peerConnection = new RTCPeerConnection({ iceServers });

    // Handle answer from signaling server
    socket.on("answer", async (data) => {
      const answer = new RTCSessionDescription(data);
      await peerConnection.setRemoteDescription(answer);
    });

    // Handle ICE candidate from signaling server
    socket.on("candidate", async (candidate) => {
      await peerConnection.addIceCandidate(candidate);
    });

    // Create and send offer to the signaling server
    const startStream = async () => {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);

      socket.emit("offer", {
        sdp: offer.sdp,
        type: offer.type,
      });
    };

    // Set up event for receiving remote track
    peerConnection.ontrack = (event) => {
      if (videoRef.current) {
        videoRef.current.srcObject = event.streams[0];
      }
    };

    // Start streaming
    startStream();

    return () => {
      peerConnection.close();
      socket.disconnect();
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
