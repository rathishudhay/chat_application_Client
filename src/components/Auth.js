import { useContext } from 'react'

import { GoogleLogin } from 'react-google-login';
import axios from 'axios'
import './auth.css'
import { UserContext } from '../context/UserContext';
import { io } from 'socket.io-client'
import { addUserAndSocket } from '../services/api-services'

function Auth() {

  const { setUser, setChannelList, setMessagesOfAllUsers } = useContext(UserContext)

  const responseGoogle = (googleResponse) => {
    console.log(googleResponse);
    const socket = io('http://localhost:3001');
    socket.on("connect", () => {
      console.log("you connected with Id:" + socket.id);
      addUserAndSocket({ socketId: socket.id, email: googleResponse.profileObj.email, profilePicUrl: googleResponse.profileObj.imageUrl, name: googleResponse.profileObj.name })
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            let channelList = [], allUserMessages = [];
            res.data.chatDetails.forEach((chatItem) => {
              channelList.push(chatItem.friendData)
              // const messagesOf
              allUserMessages.push({ email: chatItem.friendData.email, type: chatItem.type, messages: chatItem.messages })
            })
            setChannelList(channelList)
            setMessagesOfAllUsers(allUserMessages)
            setUser({ ...googleResponse.profileObj, socket: socket })
          }
        })
        .catch(err => {
          alert("something went wrong")
        })
    })
  }


  return (
    <div className="authContainer">
      <GoogleLogin
        clientId="139190260560-i5r76k060jal3lp01fud5os9th2s7asl.apps.googleusercontent.com"
        buttonText="Login with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
        className="authBtn"
      />
    </div>
  )
}

export default Auth
