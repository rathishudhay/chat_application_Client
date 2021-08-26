import React, { useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'
import HomeLeftPane from './HomeLeftPane/HomeLeftPane'
import HomeChatPane from './HomeChatPane/HomeChatPane'
import './home.css'
import CallPopup from '../Popup/CallPopup';
import { SocketContext } from '../../context/SocketContext'
import CallPane from './CallPane/CallPane';
// import { currentChannelSelectedConst } from '../../constants/globalConstants'
function Home() {
  console.log(useContext(UserContext))
  const { call, chatIdToCall } = useContext(SocketContext)
  const { user, setMessagesOfAllUsers, setChannelList } = useContext(UserContext)
  // const { user, setUser } = useContext(UserContext)
  // const [friendUsers, setFriendUsers] = useState([]);
  useEffect(() => {
    user.socket.on('receiveMessage', (data => { console.log("received", data); populateMessageInUI(data); }))
  }, [])

  // const addContact = () => {
  //   var email = prompt("Enter email to add");
  //   user.socket.emit("addContactToUser", { userEmail: user.email, userToAddEmail: email })
  // }

  const populateMessageInUI = (currentMessage) => {
    console.log("currentMessage", currentMessage)
    // console.log(messagesOfAllUsers)
    currentMessage.timestamp = "2021-08-17T13:17:27.120Z"
    setMessagesOfAllUsers((prevValue) => {
      console.log("prevValue", prevValue)
      const newValue = JSON.parse(JSON.stringify(prevValue));
      console.log("new value:", newValue)
      newValue[currentMessage.chatId].messages.push(currentMessage);
      console.log("newValue", newValue);
      return newValue
    })

    setChannelList((prevValue) => {
      var index = prevValue.indexOf(currentMessage.chatId);
      if (index !== -1) {
        prevValue.splice(index, 1);
      }
      prevValue.unshift(currentMessage.chatId)
      return prevValue;
    })


  }

  return (
    <div className="homeContainer">
      <div className="sidebar">
        <HomeLeftPane />
      </div>
      <div className="mainbar">
        <HomeChatPane populateMessageInUI={populateMessageInUI} />
      </div>
      {/* {user.email}{user.socket.id} */}
      {chatIdToCall && <CallPane />}
      {chatIdToCall == null && call != null && <CallPopup callerName={call.callerName} callerEmail={call.callerEmail} chatIdToCall={call.chatIdToCall} />}
    </div>
  )
}

export default Home
