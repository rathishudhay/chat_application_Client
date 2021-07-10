import React, { useContext, useEffect, useState, useMemo } from 'react'
import { Socket } from 'socket.io-client'
import { UserContext } from '../../context/UserContext'
import HomeLeftPane from './HomeLeftPane'
import ChatPane from '../ChatPane/ChatPane'
import './home.css'
// import { currentChannelSelectedConst } from '../../constants/globalConstants'
function Home() {
  console.log(useContext(UserContext))
  // const { user, setUser } = useContext(UserContext)
  // const { user, setUser } = useContext(UserContext)
  // const [friendUsers, setFriendUsers] = useState([]);
  // useEffect(() => {
  //   user.socket.emit("getFriendUsers", user.email);
  //   user.socket.on("receiveFriendUsers", (friendUsersReceived) => {
  //     setFriendUsers(friendUsersReceived);
  //   })
  // }, [])

  // const addContact = () => {
  //   var email = prompt("Enter email to add");
  //   user.socket.emit("addContactToUser", { userEmail: user.email, userToAddEmail: email })
  // }
  const [chatId, setChatId] = useState(null);
  const currentSelectedChat = useMemo(() => ({ chatId, setChatId }), [chatId, setChatId])
  return (
    <div className="homeContainer">
      <div className="sidebar">
        <HomeLeftPane currentSelectedChat={currentSelectedChat} />
      </div>
      <div className="mainbar">
        <ChatPane currentSelectedChat={currentSelectedChat} />
      </div>
      {/* {user.email}{user.socket.id} */}
    </div>
  )
}

export default Home
