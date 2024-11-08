// 'use client'
// import { useEffect, useRef, useState } from 'react';
// import io from 'socket.io-client';

// const VideoStream = ({ roomId }) => {
//     const localVideoRef = useRef(null);
//     const remoteVideoRef = useRef(null);
//     const [socket, setSocket] = useState(null);
//     const [peerConnection, setPeerConnection] = useState(null);

//     const iceServers = [
//         {
//             urls: 'turn:145.223.21.121:53478',
//             username: 'capstoneC04',
//             credential: 'c04forceai'
//         },
//         {
//             urls: 'stun:stun.l.google.com:19302'
//         }
//     ];

//     useEffect(() => {
//         const newSocket = io('http://localhost:3001');
//         setSocket(newSocket);

//         newSocket.on('connect', () => {
//             newSocket.emit('join', roomId);
//         });

//         newSocket.on('new-peer', (peerId) => {
//             console.log('New peer joined:', peerId);
//             initiatePeerConnection(peerId, true);
//         });

//         newSocket.on('signal', async (data) => {
//             const { source, signal } = data;
//             handleSignal(source, signal);
//         });

//         newSocket.on('user-disconnected', (peerId) => {
//             console.log('Peer disconnected:', peerId);
//             if (peerConnection) peerConnection.close();
//         });

//         return () => {
//             newSocket.disconnect();
//             if (peerConnection) peerConnection.close();
//         };
//     }, []);

//     // Function to initiate the peer connection and get local stream
//     const initiatePeerConnection = async (peerId, isPolite) => {
//         try {
//             const pc = new RTCPeerConnection({ iceServers });
//             setPeerConnection(pc);

//             const localStream = await navigator.mediaDevices.getUserMedia({
//                 video: true,
//                 audio: true
//             });

//             if (localVideoRef.current) {
//                 localVideoRef.current.srcObject = localStream;
//             }

//             localStream.getTracks().forEach((track) => {
//                 pc.addTrack(track, localStream);
//             });

//             pc.onicecandidate = ({ candidate }) => {
//                 if (candidate) {
//                     socket.emit('signal', { target: peerId, signal: { candidate } });
//                 }
//             };

//             pc.ontrack = (event) => {
//                 if (remoteVideoRef.current) {
//                     remoteVideoRef.current.srcObject = event.streams[0];
//                 }
//             };

//             if (isPolite) {
//                 pc.onnegotiationneeded = async () => {
//                     await pc.setLocalDescription(await pc.createOffer());
//                     socket.emit('signal', { target: peerId, signal: { description: pc.localDescription } });
//                 };
//             }

//             setPeerConnection(pc);
//         } catch (err) {
//             console.error('Failed to create peer connection:', err);
//         }
//     };

//     const handleSignal = async (peerId, { description, candidate }) => {
//         if (!peerConnection) return;

//         try {
//             if (description) {
//                 await peerConnection.setRemoteDescription(description);
//                 if (description.type === 'offer') {
//                     await peerConnection.setLocalDescription(await peerConnection.createAnswer());
//                     socket.emit('signal', { target: peerId, signal: { description: peerConnection.localDescription } });
//                 }
//             } else if (candidate) {
//                 await peerConnection.addIceCandidate(candidate);
//             }
//         } catch (err) {
//             console.error('Error handling signal:', err);
//         }
//     };

//     return (
//         <div>
//             <video ref={localVideoRef} autoPlay muted style={{ width: '45%', margin: '10px', borderRadius: '4px' }} />
//             <video ref={remoteVideoRef} autoPlay style={{ width: '45%', margin: '10px', borderRadius: '4px' }} />
//         </div>
//     );
// };

// export default VideoStream;
