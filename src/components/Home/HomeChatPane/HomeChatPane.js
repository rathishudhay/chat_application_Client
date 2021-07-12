import React, { useState, useRef, useEffect, useContext } from 'react'
import './homechatpane.css'
import ChatMessageContainer from './ChatMessageContainer/ChatMessageContainer'


import { UserContext } from '../../../context/UserContext';
import ChatTopBar from './ChatTopBar/ChatTopBar';
import ChatSendBar from './ChatSendBar/ChatSendBar';
function HomeChatPane({ currentSelectedChat }) {

  const { messagesOfAllUsers } = useContext(UserContext)
  return (
    < div className="chatPaneContainer" >
      {console.log("messages", messagesOfAllUsers)}
      {console.log("currentChatDetails", currentSelectedChat)}
      {messagesOfAllUsers != undefined && messagesOfAllUsers[currentSelectedChat.chatId] != null &&
        <>
          <ChatTopBar currentSelectedChat={currentSelectedChat} />
          <hr className="hr" />
          <ChatMessageContainer currentSelectedChat={currentSelectedChat} />
          <hr className="hr" />
          <ChatSendBar currentSelectedChat={currentSelectedChat} />
        </>
      }
    </div >
  )
}

export default HomeChatPane
