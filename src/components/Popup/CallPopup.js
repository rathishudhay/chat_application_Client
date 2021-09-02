import React, { useContext } from 'react'
import './callpopup.css'
import { SocketContext } from '../../context/SocketContext'
function CallPopup({ callerName, callerEmail, chatIdToCall }) {
  const { declineCall, answerCall } = useContext(SocketContext)
  console.log("chatIdToCall123:", chatIdToCall)
  return (
    <div className="background">
      <div className="popupContainerCall">
        {/* <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
        <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_8IaWdH.json" background="transparent" speed="1" style={{ width: "300px, height: 300px;" } loop controls autoplay></lottie-player> */}
        <div className="imgAndInfoContainer">
          <img className="callImage" src="./img/call.svg" />
          <div className="">
            <div className="userNameCalling">{callerName}</div>
            <div className="userEmailCalling">
              ({callerEmail})
            </div>
          </div>
        </div>
        <div className="callActionButtons">
          <button className="acceptCallBtn" onClick={() => answerCall(chatIdToCall)}>Accept</button>
          <button className="declineCallBtn" onClick={declineCall}>Decline</button>
        </div>
      </div>
    </div>
  )
}

export default CallPopup
