import React, { useContext, useState, useRef, useEffect } from 'react'
import { UserContext } from '../../../context/UserContext'

import ChatItem from './ChatItem';
function ChatList({ addContactInUI }) {
  const { user, currentSelectedChatId, setCurrentSelectedChatId, channelList, setChannelList, messagesOfAllUsers, setMessagesOfAllUsers } = useContext(UserContext);
  const [searchPeopleInput, setSearchPeopleInput] = useState("")
  const originalChannelList = useRef(channelList)

  useEffect(() => {
    // console.log("effect", messagesOfAllUsers, channelList)
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

  const searchPeopleInputChanged = (e) => {
    setSearchPeopleInput(e.target.value);
    setChannelList((prevList) => {
      return originalChannelList.current.filter((channelItem) => {
        return messagesOfAllUsers[channelItem].name.includes(e.target.value) || messagesOfAllUsers[channelItem].email.includes(e.target.value)
      })
    })
  }

  const onChannelSelected = (chatId) => {
    console.log(currentSelectedChatId)
    if (currentSelectedChatId === undefined || currentSelectedChatId !== chatId) {
      setCurrentSelectedChatId(chatId)
    }
    else {
      console.log("inside else onChannelSelected")
    }
  }
  return (
    <>
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
          <ChatItem chatItemDetails={messagesOfAllUsers[chatId]} />
        </div>))
        }

      </div>

    </>
  )
}

export default ChatList
