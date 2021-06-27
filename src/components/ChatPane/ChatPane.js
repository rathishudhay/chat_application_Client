import React, { useState, useRef, useEffect, useContext } from 'react'
import './chatpane.css'
import { currentChatDetailsConst } from '../../constants/globalConstants'
import { getFormattedTimeString } from '../../services/date'
import Picker from 'emoji-picker-react';
import { UserContext } from '../../context/UserContext';
function ChatPane({ currentChannel }) {
  // console.log("currentChannel", currentChatDetailsConst)
  // console.log("user", user)
  const { user } = useContext(UserContext)
  const [currentChatMessages, setCurrentChatMessages] = useState(currentChatDetailsConst.messages)
  const [chatTextInput, setChatTextInput] = useState("")
  // const [chosenEmoji, setChosenEmoji] = useState(null);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const cursorPosition = useRef();
  const onEmojiClick = (event, emojiObject) => {

    event.preventDefault();
    // setChosenEmoji(emojiObject);
    console.log("emoji click cursor position", cursorPosition.current);
    var start = chatTextInput.substring(0, cursorPosition.current);
    var end = chatTextInput.substring(cursorPosition.current);
    console.log(start)
    console.log(end);
    console.log(cursorPosition.current)
    console.log(chatTextInput, chatTextInput.length);
    setChatTextInput(start + emojiObject.emoji + end);
    cursorPosition.current = cursorPosition.current + 1;
  };

  const textInputRef = useRef();
  const currentChatDetails = useRef(currentChatDetailsConst);
  const onSendButtonClicked = () => {
    const currentMessage = {
      senderEmail: user.email,
      contentType: "text",
      content: chatTextInput,
      timestamp: new Date()
    }

    setCurrentChatMessages((prevValue) => {
      return [...prevValue, currentMessage]
    })

    setChatTextInput("");
  }

  const displayEmojiClicked = (e) => {
    e.preventDefault();
    setIsEmojiOpen(!isEmojiOpen);
    cursorPosition.current = textInputRef.current.selectionStart;
    console.log(textInputRef.current.selectionStart)
  }

  const onTextInputBlur = (e) => {
    e.preventDefault()
    cursorPosition.current = e.target.selectionStart;
    console.log("text focus:", e.target.selectionStart)
  }

  return (

    < div className="chatPaneContainer" >

      {console.log("currentChatDetails", currentChatDetails)}
      <div className="chatTopBar">
        <div className="chatTopLeftContainer">
          <div className="chatUserImgContainer">
            <img className="chatUserImg" src={currentChannel.currentChannelSelected.profilePicUrl} />
            <div className={"onlineStatus " + currentChannel.currentChannelSelected.onlineStatus} ></div>
          </div>
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

        {currentChatMessages.map((messageItem, i) => (

          <div key={i} className={"chatContentItem " + (user.email === messageItem.senderEmail ? "chatRight" : "chatLeft")}>

            <img className="chatItemLogo" src={currentChatDetails.current.peopleInChat[messageItem.senderEmail].profilePicUrl} />
            <div className="chatItemText">{messageItem.content}<div className="chatTime">{getFormattedTimeString(messageItem.timestamp)}</div></div>
          </div>
        )
        )}

        {/* <div className="chatContentItem chatLeft">
          <img className="chatItemLogo" src="/img/user.jpeg" />
          <div className="chatItemText">Hi😃, Thidfgdfgdfgdfgdg dfgd dfg dfg dfg dfg dfg dfg dfg dfg dfgdghffghjgkjkhjk s is single line example Hi😃, This is single line example Hi😃, This is single line example<div className="chatTime">10:23 PM</div></div>
        </div>
        <div className="chatContentItem chatRight">
          <img className="chatItemLogo" src="/img/user.jpeg" />
          <div className="chatItemText">Hi😃, Thidfgdfgdfgdfgdg dfgd dfg dfg dfg dfg dfg dfg dfg dfg dfgdghffghjgkjkhjk s is single line example Hi😃, This is single line example Hi😃, This is single line example<div className="chatTime">10:23 PM</div></div>
        </div> */}


      </div>
      <hr className="hr" />
      <div className="chatBottomBar">
        <input
          onChange={(e) => setChatTextInput(e.target.value)}
          className="chatInput"
          placeholder="Type your message here..."
          type="text"
          ref={textInputRef}
          value={chatTextInput}
          onBlur={onTextInputBlur}
        />
        <div className="emojiContainer">
          <img onClick={(e) => displayEmojiClicked(e)} className="emojiInput" src="/img/smiley.svg" />
          {isEmojiOpen && <Picker disableAutoFocus onEmojiClick={onEmojiClick} pickerStyle={{ position: "absolute", right: "0", bottom: "3em", boxShadow: "none" }} />}
        </div>


        <img className="fileInput" src="/img/paperclip.svg" />
        <button onClick={onSendButtonClicked} className="sendButton">SEND</button>
      </div>
    </div >
  )
}

export default ChatPane
