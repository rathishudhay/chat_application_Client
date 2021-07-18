import React, { createContext, useState, useRef, useEffect, useContext } from 'react'
import Peer from 'simple-peer'
import { UserContext } from './UserContext'
const SocketContext = createContext();

const CallContextProvider = ({ children }) => {
  console.log("call context provider");
  const [stream, setStream] = useState(null)
  const [call, setCall] = useState(null);
  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();
  const { user, currentSelectedChatId } = useContext(UserContext)
  const [chatIdToCall, setChatIdToCall] = useState(null);
  useEffect(() => {
    console.log("use effect on Context");
    user.socket.on('calluser', (receivedData) => {
      console.log('user is calling', receivedData);
      setCall(receivedData);
    })

    user.socket.on('endCall', (chatId) => {
      console.log("endCall")
      endCallOther();
    })
  }, [])

  useEffect(() => {
    console.log("stream changed", stream);
  }, [stream])

  const init = () => {
    user.socket.on('calluser', (receivedData) => {
      console.log('user is calling', receivedData);
      setCall(receivedData);
    })
  }

  const declineCall = () => {
    const chatIdToDecline = call.chatIdToCall;
    console.log("call", call);
    console.log(chatIdToDecline);
    user.socket.emit('declineCall', { chatIdToDecline })
    setCall(null);
  }

  const endCall = (chatId) => {
    console.log("chatIdToCall endCall", chatIdToCall);
    if (chatIdToCall != null) {
      console.log("end call emitted");
      user.socket.emit('endCall', chatIdToCall);
      stopBothVideoAndAudio();
      setChatIdToCall(null);
      setCall(null);
    }
  }

  const endCallOther = () => {
    console.log("end call emitted");
    stopBothVideoAndAudio();
    setChatIdToCall(null);
    setCall(null);
  }

  const loadCurrentVideoAndInitialise = () => {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
          console.log("current stream123", currentStream);
          setStream(currentStream)
          console.log(currentStream);
          console.log(myVideo, currentStream);
          myVideo.current.srcObject = currentStream;
          setTimeout(() => {
            console.log("resolve");
            resolve(currentStream);
          }, 1000);

        })
    })


  }

  function stopBothVideoAndAudio() {
    if (stream != null) {
      stream.getTracks().forEach(track => track.stop())
      myVideo.current.pause();
      myVideo.current.src = "";
    }
  }

  function muteMic(isMute) {
    stream.getAudioTracks().forEach(track => track.enabled = !isMute);
  }

  function muteCam(isMute) {
    stream.getVideoTracks().forEach(track => track.enabled = !isMute);
  }

  const answerCall = (chatIdToCall) => {
    console.log("chja:", chatIdToCall)
    setChatIdToCall(chatIdToCall)
    // setCallAccepted(true);
    setCall(null);
    loadCurrentVideoAndInitialise().then((stream) => {
      console.log("sending stream", stream);

      console.log("myVideoRef", myVideo);
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
    })
  }

  const callUser = (isVideo) => {
    loadCurrentVideoAndInitialise().then((stream) => {
      console.log("call user stream", stream);
      console.log("myVideoRef", myVideo);
      // if (!isVideo) {
      //   muteCam(true);
      // }

      const peer = new Peer({ initiator: true, trickle: false, stream })
      peer.on('signal', (data) => {
        console.log("peer.on('signal')", data);
        user.socket.emit('calluser', { chatIdToCall: currentSelectedChatId.toString(), signalData: data, callerEmail: user.email, callerName: user.name })
      })

      peer.on('stream', (currentStream) => {
        console.log("peer.on('stream', (currentStream)", currentStream)
        userVideo.current.srcObject = currentStream
      })

      user.socket.on('callaccepted', (signal) => {
        console.log("callAccepted")
        console.log(signal);
        // setCallAccepted(true);
        peer.signal(signal)
      })

      user.socket.on('callDeclined', (chatId) => {
        console.log("callDeclined", chatId, chatIdToCall)
        // if (chatIdToCall === chatId) {
        console.log("call declined by other user")
        stopBothVideoAndAudio();
        setChatIdToCall(null);
        setCall(null);
        // }
      })

      user.socket.on('endCall', (chatId) => {
        console.log('endCall received', chatId)
        endCall(chatId);
      })

      connectionRef.current = peer
    });
  }



  return (

    <SocketContext.Provider value={{
      call, init, myVideo, userVideo, stream, callUser, answerCall, loadCurrentVideoAndInitialise, stopBothVideoAndAudio, declineCall, chatIdToCall, setChatIdToCall, endCall
    }}>
      {children}
    </SocketContext.Provider>

  )
}

export { CallContextProvider, SocketContext }