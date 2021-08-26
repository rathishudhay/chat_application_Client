import React, { useContext } from 'react'
import { SocketContext } from '../../../context/SocketContext'
import CallPopup from '../../Popup/CallPopup'
import './callpane.css'
function CallPane() {
  const { myVideo, userVideo, call, endCall } = useContext(SocketContext);

  return (
    <div className="callPane">
      {console.log("iser video in view", userVideo)}
      <div className="callLeftPane">
        {<div className="otherUserVideoContainer">
          <video ref={userVideo} className="otherUserVideo" playsInline autoPlay></video>
        </div>}
        <div className="currentUserVideoContainer">
          <video muted ref={myVideo} className="currentUserVideo" playsInline autoPlay></video>
        </div>
        <div className="callControls">
          <img onClick={() => endCall()} className="callControlIcons callEndIcon" src="/img/call-end.svg" alt="call-end"></img>
        </div>
      </div>
      {call != null && <CallPopup callerName={call.callerName} callerEmail={call.callerEmail} chatIdToCall={call.chatIdToCall} />}
    </div>
  )
}

export default CallPane
