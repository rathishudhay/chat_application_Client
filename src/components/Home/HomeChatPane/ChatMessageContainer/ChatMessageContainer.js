import React, { useContext } from 'react'
import { UserContext } from '../../../../context/UserContext'
import { getFormattedTimeString } from '../../../../services/date'
function ChatMessageContainer() {
  const { user, messagesOfAllUsers, currentSelectedChatId } = useContext(UserContext);
  const getMessageItemUI = (messageItem) => {
    switch (messageItem.contentType) {
      case "text":
        return <div className="chatItemTextContainer">
          <div className="chatItemText">{messageItem.content}</div>
          <div className="chatTime">{getFormattedTimeString(new Date(messageItem.timestamp))}</div>
        </div>
      case "image":
        return <div className="chatItemImgContainer">
          <img className="chatItemImg" src={messageItem.url} alt="chatItemImg"></img>
          <div className="chatTime">{getFormattedTimeString(new Date(messageItem.timestamp))}</div>
        </div>
      case "video":
        return <div className="chatItemImgContainer">
          <video className="chatItemImg" controls>
            <source src={messageItem.url} type="video/mp4" />
          </video>
          <div className="chatTime">{getFormattedTimeString(new Date(messageItem.timestamp))}</div>
        </div>
      default:
        return null;
    }
  }

  return (
    <div className="chatMiddleBar">
      {console.log("currentChannel", messagesOfAllUsers[currentSelectedChatId])}
      {messagesOfAllUsers[currentSelectedChatId] != null && messagesOfAllUsers[currentSelectedChatId].messages.map((messageItem, i) => (

        <div key={i} className={"chatContentItem " + (user.email === messageItem.senderEmail ? "chatRight" : "chatLeft")}>

          <img alt="chatLogo" className="chatItemLogo" src={user.email === messageItem.senderEmail ? user.imageUrl : messagesOfAllUsers[currentSelectedChatId].profilePicUrl} />
          {getMessageItemUI(messageItem)}
          {/* <div className="chatItemText">{messageItem.content}<div className="chatTime">{getFormattedTimeString(new Date(messageItem.timestamp))}</div></div> */}
          {/*  */}

        </div>
      )
      )}


    </div>
  )
}

export default ChatMessageContainer
