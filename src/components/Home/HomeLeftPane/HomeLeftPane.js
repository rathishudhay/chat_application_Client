import React, { useState, useRef, useContext } from 'react'
import './homeleftpane.css'
// import { channelListConstant } from '../../constants/globalConstants'

import Popup from '../../Popup/Popup';
import { UserContext } from '../../../context/UserContext';
import UserDetails from './UserDetails';
import ChatList from './ChatList';

function HomeLeftPane() {


  const { channelList, setChannelList, setMessagesOfAllUsers } = useContext(UserContext);
  const [isAddContactPopupClose, setIsAddContactPopupClose] = useState(true);
  const addEmailContactInputRef = useRef()
  const { user } = useContext(UserContext);

  const addContactInUI = (chatData) => {
    console.log(chatData)
    setMessagesOfAllUsers((prevData) => {
      const newData = { ...prevData };
      chatData.messages = [];
      newData[chatData.chatId] = chatData
      return newData
    })
    setChannelList([...channelList, chatData.chatId])
    setIsAddContactPopupClose(true)
  }

  const addContactPopupButtonClicked = () => {
    const friendEmail = addEmailContactInputRef.current.value;
    user.socket.emit("addContact", { emailToAdd: friendEmail, userEmail: user.email }, (res) => {
      console.log("add contact response", res);
      if (res.chatData == null) {
        alert("user not exists");
      } else {
        addContactInUI(res.chatData)
      }

    })
  }

  return (
    <div className="chatRightbarContent">
      <UserDetails />
      <ChatList addContactInUI={addContactInUI} />
      <div onClick={() => { setIsAddContactPopupClose(false) }} className="addContact">+</div>
      {!isAddContactPopupClose && <Popup heading="Add Contact" setClose={setIsAddContactPopupClose} >
        <div className="enterEmailAddContactText">Enter email to add to your contact</div>
        <div className="emailInputAndBtnContainer">
          <input ref={addEmailContactInputRef} type="text" className="emailInput" />
          <button onClick={addContactPopupButtonClicked} className="addContactPopupBtn">Add Contact</button>
        </div>
      </Popup>}
    </div>
  )
}

export default HomeLeftPane
