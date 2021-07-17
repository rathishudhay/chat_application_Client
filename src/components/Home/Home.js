import React, { useContext } from 'react'
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

  return (
    <div className="homeContainer">
      <div className="sidebar">
        <HomeLeftPane />
      </div>
      <div className="mainbar">
        <HomeChatPane />
      </div>
      {/* {user.email}{user.socket.id} */}
      {chatIdToCall && <CallPane />}
      {chatIdToCall == null && call != null && <CallPopup callerName={call.callerName} callerEmail={call.callerEmail} chatIdToCall={call.chatIdToCall} />}
    </div>
  )
}

export default Home
