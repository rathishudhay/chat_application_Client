import React, { useContext } from 'react'
import './homechatpane.css'
import ChatMessageContainer from './ChatMessageContainer/ChatMessageContainer'


import { UserContext } from '../../../context/UserContext';
import ChatTopBar from './ChatTopBar/ChatTopBar';
import ChatSendBar from './ChatSendBar/ChatSendBar';
function HomeChatPane({ populateMessageInUI }) {

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
          <ChatSendBar populateMessageInUI={populateMessageInUI} />
        </>
      }
    </div >
  )
}

export default HomeChatPane
