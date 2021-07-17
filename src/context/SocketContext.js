import React, { createContext, useState, useRef, useEffect, useContext } from 'react'
import { io } from 'socket.io-client'
import Peer from 'simple-peer'
import { UserContext } from './UserContext'
const SocketContext = createContext();
const CallContextProvider = ({ children }) => {

  const [stream, setStream] = useState(null)
  // const [me, setMe] = useState('')
  const [call, setCall] = useState(null);
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState()
  // const [name, setName] = useState()
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const { user } = useContext(UserContext)
  const [chatIdToCall, setChatIdToCall] = useState(null);
  useEffect(() => {
    console.log("use effect on Context");
    console.log(user.socket);
    user.socket.on('calluser', (receivedData) => {
      console.log('user is calling', receivedData)
      setCall(receivedData)
      // setCall({ isReceivedCall: true, from, name: callerName, signal })

    })

  }, [])

  const declineCall = () => {
    const { chatId } = call;
    setCall(null);
    user.socket.emit('declineCall', { chatId })
  }

  const endCall = () => {
    user.socket.emit('endCall', { chatIdToCall });
    stopBothVideoAndAudio();
    setChatIdToCall(null);
    setCall(null);
  }

  const loadCurrentVideoAndInitialise = () => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream)
        console.log(currentStream);
        console.log(myVideo, currentStream);
        myVideo.current.srcObject = currentStream;
      })
  }

  function stopBothVideoAndAudio() {
    // stream.getTracks().forEach(function (track) {
    //   if (track.readyState == 'live') {
    //     track.stop();
    //   }
    // });
    // stream.stop();
    stream.getTracks().forEach(track => track.stop())
    myVideo.current.pause();
    myVideo.current.src = "";
  }

  const answerCall = (chatIdToCall) => {
    console.log("chja:", chatIdToCall)
    setChatIdToCall(chatIdToCall)
    setCallAccepted(true);
    const peer = new Peer({ initiator: false, trickle: false, stream })

    peer.on('signal', (data) => {
      user.socket.emit('answercall', { signal: data, to: chatIdToCall })
    })

    peer.on('stream', (currentStream) => {
      console.log("userVideo:", currentStream);
      userVideo.current.srcObject = currentStream
    })

    peer.signal(call.signal)
    console.log(call.signal)
    connectionRef.current = peer
  }

  const callUser = (chatId) => {
    console.log("id to call:", chatId)
    const peer = new Peer({ initiator: true, trickle: false, stream })
    peer.on('signal', (data) => {
      console.log("peer.on('signal')", data);
      user.socket.emit('calluser', { chatIdToCall: chatId.toString(), signalData: data, callerEmail: user.email, callerName: user.name })
    })

    peer.on('stream', (currentStream) => {
      console.log("peer.on('stream', (currentStream)", currentStream)
      userVideo.current.srcObject = currentStream
    })

    user.socket.on('callaccepted', (signal) => {
      console.log("callAccepted")
      setCallAccepted(true);
      peer.signal(signal)

    })
    connectionRef.current = peer
  }




  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  }

  return (

    <SocketContext.Provider value={{
      call, callAccepted, myVideo, userVideo, stream, setStream, callEnded, callUser, leaveCall, answerCall, loadCurrentVideoAndInitialise, stopBothVideoAndAudio, declineCall, chatIdToCall, setChatIdToCall, endCall
    }}>
      {children}
    </SocketContext.Provider>

  )
}

export { CallContextProvider, SocketContext }