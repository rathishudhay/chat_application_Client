import React, { useState, useRef, useEffect, useContext } from 'react'
import './homechatpane.css'

import { getFormattedTimeString } from '../../../services/date'
import Picker from 'emoji-picker-react';
import { UserContext } from '../../../context/UserContext';
function HomeChatPane({ currentSelectedChat }) {
  // console.log("currentChannel", currentChatDetailsConst)
  // console.log("user", user)
  const { user, messagesOfAllUsers, setMessagesOfAllUsers } = useContext(UserContext)

  // const [currentChatMessages, setCurrentChatMessages] = useState(currentChatDetailsConst.messages)
  const [chatTextInput, setChatTextInput] = useState("")
  // const [chosenEmoji, setChosenEmoji] = useState(null);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);
  const cursorPosition = useRef();
  const fileInputRef = useRef();

  useEffect(() => {
    user.socket.on('receiveMessage', (data => { console.log("received", data); populateMessageInUI(data); }))
    console.log(currentSelectedChat, messagesOfAllUsers, setMessagesOfAllUsers);
  }, [])

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
    cursorPosition.current = cursorPosition.current + 2;
  };

  const textInputRef = useRef();
  const onSendButtonClicked = () => {
    console.log(currentSelectedChat)
    const currentMessage = {
      senderEmail: user.email,
      contentType: "text",
      content: chatTextInput,
      chatId: currentSelectedChat.chatId,
      timestamp: new Date()
    }
    console.log(messagesOfAllUsers);
    user.socket.emit('sendMessage', currentMessage)
    // messagesOfAllUsers[currentSelectedChat.chatId].setCurrentChannelSelected((prevValue) => {
    //   console.log(prevValue);

    //   return {
    //     ...prevValue, messages: [...prevValue.messages, currentMessage]
    //   }
    // })
    populateMessageInUI(currentMessage);
    setChatTextInput("");
  }


  const populateMessageInUI = (currentMessage) => {
    setMessagesOfAllUsers((prevValue) => {
      const newValue = { ...prevValue };
      console.log("new value:", newValue)
      newValue[currentMessage.chatId].messages.push(currentMessage);
      return newValue
    })
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

  const chooseFileImageClicked = () => {
    fileInputRef.current.click();
  }

  const fileInputChanged = (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile)
    fileInputRef.current.value = null
    var contentType = selectedFile.type.includes("mp4") ? "video" : "image"
    const currentMessage = {
      senderEmail: user.email,
      contentType: contentType,
      content: selectedFile,
      mimeType: selectedFile.type,
      chatId: currentSelectedChat.chatId,
      timestamp: new Date()
    }
    user.socket.emit('sendMessage', currentMessage)
    currentMessage.url = URL.createObjectURL(selectedFile);
    console.log(currentMessage);
    populateMessageInUI(currentMessage)
  }

  const getMessageItemUI = (messageItem) => {
    switch (messageItem.contentType) {
      case "text":
        return <div className="chatItemTextContainer">
          <div className="chatItemText">{messageItem.content}</div>
          <div className="chatTime">{getFormattedTimeString(new Date(messageItem.timestamp))}</div>
        </div>
      case "image":
        return <div className="chatItemImgContainer">
          <img className="chatItemImg" src={messageItem.url}></img>
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
    < div className="chatPaneContainer" >
      {console.log("messages", messagesOfAllUsers)}
      {console.log("currentChatDetails", currentSelectedChat)}
      {messagesOfAllUsers != undefined && messagesOfAllUsers[currentSelectedChat.chatId] != null && <>
        <div className="chatTopBar">
          <div className="chatTopLeftContainer">
            <div className="chatUserImgContainer">
              <img className="chatUserImg" src={messagesOfAllUsers[currentSelectedChat.chatId].profilePicUrl} />
              <div className={"onlineStatus " + messagesOfAllUsers[currentSelectedChat.chatId].onlineStatus} ></div>
            </div>
            <div className="userAndEmailContainer">
              <div className="username_chat">
                {messagesOfAllUsers[currentSelectedChat.chatId].name}
              </div>
              <div className="email_chat">
                {messagesOfAllUsers[currentSelectedChat.chatId].email}
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
          {console.log("currentChannel", messagesOfAllUsers[currentSelectedChat.chatId])}
          {messagesOfAllUsers[currentSelectedChat.chatId] != null && messagesOfAllUsers[currentSelectedChat.chatId].messages.map((messageItem, i) => (

            <div key={i} className={"chatContentItem " + (user.email === messageItem.senderEmail ? "chatRight" : "chatLeft")}>

              <img className="chatItemLogo" src={user.email === messageItem.senderEmail ? user.imageUrl : messagesOfAllUsers[currentSelectedChat.chatId].profilePicUrl} />
              {getMessageItemUI(messageItem)}
              {/* <div className="chatItemText">{messageItem.content}<div className="chatTime">{getFormattedTimeString(new Date(messageItem.timestamp))}</div></div> */}
              {/*  */}

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

          <input
            accept="image/*,video/mp4"
            onChange={fileInputChanged} ref={fileInputRef} type="file" style={{ display: "none" }} />
          <img onClick={chooseFileImageClicked} className="fileInput" src="/img/paperclip.svg" />
          <button onClick={onSendButtonClicked} className="sendButton">SEND</button>
        </div>
      </>
      }
    </div >
  )
}

export default HomeChatPane