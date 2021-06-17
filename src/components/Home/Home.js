import React, { useContext, useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'
import { UserContext } from '../../context/UserContext'
import LeftPane from './LeftPane'
import ChatPane from '../ChatPane/ChatPane'
import './home.css'
function Home() {
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

  return (
    <div className="homeContainer">
      <div className="sidebar">
        <LeftPane />
      </div>
      <div className="mainbar">
        <ChatPane />
      </div>
      {/* {user.email}{user.socket.id} */}
    </div>
  )
}

export default Home
