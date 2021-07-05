import React, { useState, useRef, useContext } from 'react'
import './leftpane.css'
import { channelListConstant } from '../../constants/globalConstants'
import { formatDateForChannelList } from '../../services/date'
import Popup from '../Popup/Popup';
import { UserContext } from '../../context/UserContext';
import { addContact } from '../../services/api-services'

function LeftPane({ currentChannel }) {

  const { channelList, setChannelList, messagesOfAllUsers } = useContext(UserContext);
  const [isAddContactPopupClose, setIsAddContactPopupClose] = useState(true);
  const [searchPeopleInput, setSearchPeopleInput] = useState("")
  const addEmailContactInputRef = useRef()
  const originalChannelList = useRef(channelListConstant)
  const { user } = useContext(UserContext);
  console.log(channelList);
  console.log(messagesOfAllUsers)
  const onChannelSelected = (channelItem) => {
    console.log("currentChannel", currentChannel)
    if (currentChannel.currentChannelSelected == null || currentChannel.currentChannelSelected.email !== channelItem.email) {
      console.log("inside if onChannelSelected")
      console.log(messagesOfAllUsers);
      for (var messagesOfSingleUser of messagesOfAllUsers) {
        console.log(messagesOfSingleUser);
        if (channelItem.email == messagesOfSingleUser.email) {
          channelItem.messages = messagesOfSingleUser.messages;
          channelItem.type = messagesOfSingleUser.type;
        }
      }
      console.log(channelItem)
      currentChannel.setCurrentChannelSelected(channelItem)
    }
    else {
      console.log("inside else onChannelSelected")
    }
  }

  const addContactPopupButtonClicked = () => {
    const friendEmail = addEmailContactInputRef.current.value;
    addContact({ emailToAdd: friendEmail, userEmail: user.email })
      .then(res => {
        console.log(res);
        const newChannel = res.data.friendData
        setChannelList([...channelList, newChannel])
        setIsAddContactPopupClose(true)
      }).catch(err => {
        console.error(err)
      })
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
      {console.log("img url:" + user.imgUrl)}
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
        {channelList.map(channelItem => (<div onClick={() => onChannelSelected(channelItem)} className="singleItemContainer">
          <div className="chatPeopleSingleItem">
            <div className="chatUserImgWithOnlineStatus">
              <img src={channelItem.profilePicUrl} className="chatPeopleSingleItemThumbnail" />
              <div className={"onlineStatus " + channelItem.onlineStatus}></div>
            </div>
            <div className="chatTextInfoContainer">
              <div className="chatUserAndTimeline">
                <div className="chatUsername">{channelItem.name}</div>
                <div className="chatTimeline">{channelItem.lastMessageTime != undefined && formatDateForChannelList(channelItem.lastMessageTime)}</div>
              </div>
              <div className="lastChat">{channelItem.lastMessage}</div>
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

export default LeftPane
