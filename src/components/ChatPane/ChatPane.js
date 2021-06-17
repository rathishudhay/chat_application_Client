import React from 'react'
import './chatpane.css'
function ChatPane() {
  return (
    <div className="chatPaneContainer">
      <div className="chatTopBar">
        <div className="chatTopLeftContainer">
          <img className="chatUserImg" src="/img/user.jpeg" />
          <div className="userAndEmailContainer">
            <div className="username_chat">
              Rathish Kumar
            </div>
            <div className="email_chat">
              rathishudhay@gmail.com
            </div>
          </div>
        </div>
        <div className="chatTopRightContainer">
          <img className="interactIcons_chatTop" src="/img/search.png" />
          <img className="interactIcons_chatTop" src="/img/search.png" />
          <img className="interactIcons_chatTop" src="/img/search.png" />
        </div>
      </div>
      <hr className="hr" />
      <div className="chatMiddleBar">

      </div>
      <div className="chatBottomBar"></div>
    </div>
  )
}

export default ChatPane
