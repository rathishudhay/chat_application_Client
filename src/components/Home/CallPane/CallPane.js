import React, { useContext, useEffect } from 'react'
import ChatMessageContainer from '../HomeChatPane/ChatMessageContainer/ChatMessageContainer'
import ChatSendBar from '../HomeChatPane/ChatSendBar/ChatSendBar'
import ChatTopBar from '../HomeChatPane/ChatTopBar/ChatTopBar'
import { SocketContext } from '../../../context/SocketContext'
import { UserContext } from '../../../context/UserContext'
import './callpane.css'
function CallPane({ setChatIdToCall }) {
  const { myVideo, userVideo, stopBothVideoAndAudio, endCall, loadCurrentVideoAndInitialise, callAccepted } = useContext(SocketContext);
  const { currentSelectedChatId } = useContext(UserContext)
  useEffect(() => {
    loadCurrentVideoAndInitialise();
  }, [])

  return (
    <div className="callPane">
      {console.log("iser video in view", userVideo)}
      <div className="callLeftPane">
        {callAccepted && <div className="otherUserVideoContainer">
          <video ref={userVideo} className="otherUserVideo" playsInline autoPlay></video>
        </div>}
        <div className="currentUserVideoContainer">
          <video muted ref={myVideo} className="currentUserVideo" playsInline autoPlay></video>
        </div>
        <div className="callControls">
          <img className="callControlIcons shareScreenIcon" src="/img/microphone.svg"></img>
          <img className="callControlIcons shareScreenIcon" src="/img/video.svg"></img>
          {/* <img className="callControlIcons shareScreenIcon" src="/img/shareScreen.svg"></img> */}
          <img onClick={endCall} className="callControlIcons callEndIcon" src="/img/call-end.svg"></img>

          {/* <img className="callControlIcons shareScreenIcon" src="/img/micOff.svg"></img> */}

        </div>
      </div>
      <div className="callRightPane">
        <div className="callMessageContainer">
          <ChatMessageContainer />
        </div>
        <hr className="hr" />
        <ChatSendBar />
      </div>
    </div>
  )
}

export default CallPane
