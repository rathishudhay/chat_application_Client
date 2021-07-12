import React, { useState, useRef, useContext, useEffect } from 'react'
import './homeleftpane.css'
// import { channelListConstant } from '../../constants/globalConstants'
import { formatDateForChannelList } from '../../../services/date'
import Popup from '../../Popup/Popup';
import { UserContext } from '../../../context/UserContext';

function HomeLeftPane({ currentSelectedChat }) {


  const { channelList, setChannelList, messagesOfAllUsers, setMessagesOfAllUsers } = useContext(UserContext);
  const [isAddContactPopupClose, setIsAddContactPopupClose] = useState(true);
  const [searchPeopleInput, setSearchPeopleInput] = useState("")
  const addEmailContactInputRef = useRef()
  const originalChannelList = useRef(channelList)
  const { user } = useContext(UserContext);
  console.log(messagesOfAllUsers)


  useEffect(() => {
    console.log("effect", messagesOfAllUsers, channelList)
    user.socket.on('addContact', (data) => {
      console.log("add contact", data);
      addContactInUI(data)
    });
    //user.socket.emit('addContact', { data: "123" })
    user.socket.on('setOnlineStatus', setOnlineStatus)
  }, [])

  const setOnlineStatus = (data) => {
    console.log("setOnlineStatus", data);
    setMessagesOfAllUsers((prevData => {
      prevData[data.chatId].onlineStatus = data.onlineStatus;
      console.log(prevData);
      return { ...prevData }
    }))

  }

  const onChannelSelected = (chatId) => {
    console.log(currentSelectedChat)
    if (currentSelectedChat == undefined || currentSelectedChat.chatId !== chatId) {
      currentSelectedChat.setChatId(chatId)
    }
    else {
      console.log("inside else onChannelSelected")
    }
  }


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
    user.socket.emit("addContact", { emailToAdd: friendEmail, userEmail: user.email }, (res) => addContactInUI(res.chatData))
    // .then(res => {
    //   console.log(res);
    //   console.log(res.data);
    //   const chatData = res.data.chatData
    //   addContactInUI(chatData)
    //   // const dataToSendInSocket = { chatId: chatData.chatId, email: user.email, messages: [], onlineStatus: "online", profilePicUrl: user.profilePicUrl, emailToSend: chatData.email }
    //   // user.socket.emit("addContact", dataToSendInSocket)
    // }).catch(err => {
    //   console.error(err)
    // })
  }


  const searchPeopleInputChanged = (e) => {
    setSearchPeopleInput(e.target.value);
    setChannelList((prevList) => {
      return originalChannelList.current.filter((channelItem) => {
        return channelItem.name.includes(e.target.value) || channelItem.email.includes(e.target.value)
      })

    })
  }

  return (
    <div className="chatRightbarContent">
      <img src={user.imageUrl} className="userImg" />
      <div className="username">{user.name}</div>
      <div className="email">{user.email}</div>
      <div className="searchContainer">
        <input
          className="searchInput"
          type="text"
          placeholder="search people"
          value={searchPeopleInput}
          onChange={(e) => { searchPeopleInputChanged(e) }}
        />
        <img className="searchImg" src="/img/search.svg" />
      </div>

      <div className="chatPeopleList">
        {channelList.map(chatId => (<div onClick={() => onChannelSelected(chatId)} className="singleItemContainer">
          <div className="chatPeopleSingleItem">
            <div className="chatUserImgWithOnlineStatus">
              <img src={messagesOfAllUsers[chatId].profilePicUrl} className="chatPeopleSingleItemThumbnail" />
              <div className={"onlineStatus " + messagesOfAllUsers[chatId].onlineStatus}></div>
            </div>
            <div className="chatTextInfoContainer">
              <div className="chatUserAndTimeline">
                <div className="chatUsername">{messagesOfAllUsers[chatId].name}</div>
                <div className="chatTimeline">{messagesOfAllUsers[chatId].lastMessageTime != undefined && formatDateForChannelList(messagesOfAllUsers[chatId].lastMessageTime)}</div>
              </div>
              <div className="lastChat">{messagesOfAllUsers[chatId].lastMessage}</div>
            </div>
          </div>
          <hr className="hr" />
        </div>))
        }


      </div>
      <div onClick={() => { setIsAddContactPopupClose(false) }} className="addContact">+</div>
      {!isAddContactPopupClose && <Popup heading="Add Contact" setClose={setIsAddContactPopupClose} >
        <div className="enterEmailAddContactText">Enter email to add to your contact</div>
        <div className="emailInputAndBtnContainer">
          <input ref={addEmailContactInputRef} type="text" className="emailInput" />
          <button onClick={addContactPopupButtonClicked} className="addContactPopupBtn">Add Contact</button>
        </div>
      </Popup>}
      {/* <div className="bottomContainer">
        <div className="userEmail">rathishudhay@gmail.com</div>
        <div className="addContact">+</div>
      </div> */}
    </div>
  )
}

export default HomeLeftPane
