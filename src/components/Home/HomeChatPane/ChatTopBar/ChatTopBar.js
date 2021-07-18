import React, { useContext, useState } from 'react'
import { UserContext } from '../../../../context/UserContext'
import CallPane from '../../CallPane/CallPane';
import { SocketContext } from '../../../../context/SocketContext'


// import { CallPane } from '../../../Home/CallPane/CallPane'
function ChatTopBar() {
  const { messagesOfAllUsers, currentSelectedChatId } = useContext(UserContext);
  const { chatIdToCall, setChatIdToCall, callUser, loadCurrentVideoAndInitialise } = useContext(SocketContext);

  const audioCallUserButtonClicked = () => {
    setChatIdToCall(currentSelectedChatId)
    setTimeout(() => {
      callUser(false);
    }, 1000);
  }

  const videoCallUserButtonClicked = () => {
    setChatIdToCall(currentSelectedChatId)
    setTimeout(() => {
      callUser(true);
    }, 1000);
  }
  return (
    <div className="chatTopBar">
      <div className="chatTopLeftContainer">
        <div className="chatUserImgContainer">
          <img className="chatUserImg" src={messagesOfAllUsers[currentSelectedChatId].profilePicUrl} />
          <div className={"onlineStatus " + messagesOfAllUsers[currentSelectedChatId].onlineStatus} ></div>
        </div>
        <div className="userAndEmailContainer">
          <div className="username_chat">
            {messagesOfAllUsers[currentSelectedChatId].name}
          </div>
          <div className="email_chat">
            {messagesOfAllUsers[currentSelectedChatId].email}
          </div>
        </div>
      </div>
      <div className="chatTopRightContainer">
        {console.log("ChatIdToCall:", chatIdToCall)}
        <img onClick={() => { audioCallUserButtonClicked() }} className="interactIcons_chatTop" src="/img/call.svg" />
        <img onClick={() => { videoCallUserButtonClicked() }} className="interactIcons_chatTop" src="/img/video.svg" />
        <img className="interactIcons_chatTop" src="/img/menu.svg" />
      </div>
    </div>
  )
}

export default ChatTopBar
