import React, { useContext } from 'react'
import { UserContext } from '../../../../context/UserContext'
function ChatTopBar() {
  const { messagesOfAllUsers, currentSelectedChatId } = useContext(UserContext);
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
        <img className="interactIcons_chatTop" src="/img/call.svg" />
        <img className="interactIcons_chatTop" src="/img/video.svg" />
        <img className="interactIcons_chatTop" src="/img/menu.svg" />
      </div>
    </div>

  )
}

export default ChatTopBar
