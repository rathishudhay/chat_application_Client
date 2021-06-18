import React from 'react'
import './chatpane.css'
function ChatPane({ currentChannel }) {
  console.log("currentChannel", currentChannel)
  return (
    <div className="chatPaneContainer">
      <div className="chatTopBar">
        <div className="chatTopLeftContainer">
          <img className="chatUserImg" src={currentChannel.currentChannelSelected.profilePicUrl} />
          <div className="userAndEmailContainer">
            <div className="username_chat">
              {currentChannel.currentChannelSelected.name}
            </div>
            <div className="email_chat">
              {currentChannel.currentChannelSelected.email}
            </div>
          </div>
        </div>
        <div className="chatTopRightContainer">
          <img className="interactIcons_chatTop" src="/img/call.svg" />
          <img className="interactIcons_chatTop" src="/img/video.svg" />
          <img className="interactIcons_chatTop" src="/img/menu.svg" />
        </div>
      </div>
      <hr className="hr" />
      <div className="chatMiddleBar">
        <div className="chatContentItem chatLeft">
          <div>
            <img className="chatItemLogo" src="/img/user.jpeg" />

          </div>
          <div className="chatItemText">Hi😃, Thidfgdfgdfgdfgdg dfgd dfg dfg dfg dfg dfg dfg dfg dfg dfgdghffghjgkjkhjk s is single line example Hi😃, This is single line example Hi😃, This is single line example<div className="chatTime">10:23 PM</div></div>
        </div>
        <div className="chatContentItem chatRight">
          <div className="chatItemText">Hi😃, This is single line example Hi😃, This is single line example Hi😃, This is single line example <div className="chatTime">10:23 PM</div></div>

          <div>
            {/* <div className="chatTime">10:23 PM</div> */}
            <img className="chatItemLogo" src="/img/user.jpeg" />
          </div>
        </div>

        <div className="chatContentItem chatRight">
          <div className="chatItemText">Hi😃, This is single line example Hi😃, This is <div className="chatTime">10:23 PM</div></div>
          <div>
            {/* <div className="chatTime">10:23 PM</div> */}
            <img className="chatItemLogo" src="/img/user.jpeg" />
          </div>

        </div>
        <div className="chatContentItem chatLeft">
          <div>
            <img className="chatItemLogo" src="/img/user.jpeg" />

          </div>
          <div className="chatItemText">Hi😃, Thidfgdfgdfgdfgdg dfgd dfg dfg dfg dfg dfg dfg dfg dfg dfgdghffghjgkjkhjk s is single line example Hi😃, This is single line example Hi😃, This is single line example<div className="chatTime">10:23 PM</div></div>
        </div>
        <div className="chatContentItem chatRight">
          <div className="chatItemText">Hi😃, This is single line example Hi😃, This is single line example Hi😃, This is single line example <div className="chatTime">10:23 PM</div></div>

          <div>
            {/* <div className="chatTime">10:23 PM</div> */}
            <img className="chatItemLogo" src="/img/user.jpeg" />
          </div>
        </div>

        <div className="chatContentItem chatRight">
          <div className="chatItemText">Hi😃, This is single line example Hi😃, This is <div className="chatTime">10:23 PM</div></div>
          <div>
            {/* <div className="chatTime">10:23 PM</div> */}
            <img className="chatItemLogo" src="/img/user.jpeg" />
          </div>

        </div>
        <div className="chatContentItem chatLeft">
          <div>
            <img className="chatItemLogo" src="/img/user.jpeg" />

          </div>
          <div className="chatItemText">Hi😃, Thidfgdfgdfgdfgdg dfgd dfg dfg dfg dfg dfg dfg dfg dfg dfgdghffghjgkjkhjk s is single line example Hi😃, This is single line example Hi😃, This is single line example<div className="chatTime">10:23 PM</div></div>
        </div>
        <div className="chatContentItem chatRight">
          <div className="chatItemText">Hi😃, This is single line example Hi😃, This is single line example Hi😃, This is single line example <div className="chatTime">10:23 PM</div></div>

          <div>
            {/* <div className="chatTime">10:23 PM</div> */}
            <img className="chatItemLogo" src="/img/user.jpeg" />
          </div>
        </div>

        <div className="chatContentItem chatRight">
          <div className="chatItemText">Hi😃, This is single line example Hi😃, This is <div className="chatTime">10:23 PM</div></div>
          <div>
            {/* <div className="chatTime">10:23 PM</div> */}
            <img className="chatItemLogo" src="/img/user.jpeg" />
          </div>

        </div>
      </div>
      <hr className="hr" />
      <div className="chatBottomBar">
        <input className="chatInput" placeholder="Type your message here..." type="text" />
        <img className="emojiInput" src="/img/smiley.svg" />
        <img className="fileInput" src="/img/paperclip.svg" />
        <button className="sendButton">SEND</button>
      </div>
    </div>
  )
}

export default ChatPane
