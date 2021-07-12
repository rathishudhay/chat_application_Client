import React, { useRef, useState, useContext, useEffect } from 'react'
import { UserContext } from '../../../../context/UserContext'
import { getFormattedTimeString } from '../../../../services/date'
import Picker from 'emoji-picker-react';
function ChatSendBar() {
  const textInputRef = useRef();
  const cursorPosition = useRef();
  const [chatTextInput, setChatTextInput] = useState("")
  const { user, messagesOfAllUsers, setMessagesOfAllUsers, currentSelectedChatId } = useContext(UserContext)
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);

  const fileInputRef = useRef();

  useEffect(() => {
    user.socket.on('receiveMessage', (data => { console.log("received", data); populateMessageInUI(data); }))
    console.log(currentSelectedChatId, messagesOfAllUsers, setMessagesOfAllUsers);
  }, [])

  const onSendButtonClicked = () => {
    console.log(currentSelectedChatId)
    const currentMessage = {
      senderEmail: user.email,
      contentType: "text",
      content: chatTextInput,
      chatId: currentSelectedChatId,
      timestamp: new Date()
    }
    console.log(messagesOfAllUsers);
    user.socket.emit('sendMessage', currentMessage)

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

  const onTextInputBlur = (e) => {
    e.preventDefault()
    cursorPosition.current = e.target.selectionStart;
    console.log("text focus:", e.target.selectionStart)
  }

  const displayEmojiClicked = (e) => {
    e.preventDefault();
    setIsEmojiOpen(!isEmojiOpen);
    cursorPosition.current = textInputRef.current.selectionStart;
    console.log(textInputRef.current.selectionStart)
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
      chatId: currentSelectedChatId,
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
  )
}

export default ChatSendBar
