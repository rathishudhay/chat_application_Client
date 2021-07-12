import React, { useState, useRef, useEffect, useContext } from 'react'
import './homechatpane.css'
import ChatMessageContainer from './ChatMessageContainer/ChatMessageContainer'


import { UserContext } from '../../../context/UserContext';
import ChatTopBar from './ChatTopBar/ChatTopBar';
import ChatSendBar from './ChatSendBar/ChatSendBar';
function HomeChatPane() {

  const { messagesOfAllUsers, currentSelectedChatId } = useContext(UserContext)
  return (
    < div className="chatPaneContainer" >
      {console.log("messages", messagesOfAllUsers)}
      {console.log("currentChatDetails", currentSelectedChatId)}
      {messagesOfAllUsers?.[currentSelectedChatId] &&
        <>
          <ChatTopBar />
          <hr className="hr" />
          <ChatMessageContainer />
          <hr className="hr" />
          <ChatSendBar />
        </>
      }
    </div >
  )
}

export default HomeChatPane
