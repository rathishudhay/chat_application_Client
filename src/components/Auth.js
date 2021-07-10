import { useContext } from 'react'

import { GoogleLogin } from 'react-google-login';
import axios from 'axios'
import './auth.css'
import { UserContext } from '../context/UserContext';
import { io } from 'socket.io-client'
import { addUserAndSocket } from '../services/api-services'
import { useHistory } from 'react-router-dom'

function Auth() {

  const { user, setUser, setChannelList, setMessagesOfAllUsers } = useContext(UserContext)
  const history = useHistory();
  const responseGoogle = (googleResponse) => {
    console.log(googleResponse);
    console.log(user);
    if (user == null) {
      const socket = io('http://localhost:3001');
      socket.on("connect", () => {
        console.log("you connected with Id:" + socket.id);
        // addUserAndSocket({ socketId: socket.id, email: googleResponse.profileObj.email, profilePicUrl: googleResponse.profileObj.imageUrl, name: googleResponse.profileObj.name })
        //   .then(res => {
        //     console.log(res);
        //     if (res.status == 200) {
        //       let channelList = [], allUserMessages = {};
        //       res.data.chatDetails.forEach((chatItem) => {
        //         channelList.push({ ...chatItem.friendData, chatId: chatItem._id })
        //         // const messagesOf
        //         const userMessages = {
        //           email: chatItem.friendData.email,
        //           type: chatItem.type,
        //           messages: chatItem.messages,
        //           name: chatItem.friendData.name,
        //           profilePicUrl: chatItem.friendData.profilePicUrl,
        //           onlineStatus: chatItem.friendData.onlineStatus
        //         }
        //         allUserMessages[chatItem._id] = userMessages;
        //       })
        //       setChannelList(channelList)
        //       setMessagesOfAllUsers(allUserMessages)
        //       setUser({ ...googleResponse.profileObj, socket: socket })
        //     }
        //   })
        //   .catch(err => {
        //     alert("something went wrong")
        //   })

        socket.emit("onUserLogin", { socketId: socket.id, email: googleResponse.profileObj.email, profilePicUrl: googleResponse.profileObj.imageUrl, name: googleResponse.profileObj.name }, (res) => {
          populateContactResponseDetails(res).then(() => {
            console.log("user set new");
            setUser({ ...googleResponse.profileObj, socket: socket })
            history.replace('/chat')
          })
        })
      })
    }

  }

  const populateContactResponseDetails = (res) => {
    console.log("res", res);
    return new Promise((resolve, reject) => {
      let channelList = [], allUserMessages = {};
      res.chatDetails.forEach((chatItem) => {
        channelList.push(chatItem._id)
        // const messagesOf
        const userMessages = {
          email: chatItem.friendData.email,
          type: chatItem.type,
          messages: chatItem.messages,
          name: chatItem.friendData.name,
          profilePicUrl: chatItem.friendData.profilePicUrl,
          onlineStatus: chatItem.friendData.onlineStatus
        }
        allUserMessages[chatItem._id] = userMessages;
      })
      setChannelList(channelList)
      setMessagesOfAllUsers(allUserMessages)
      resolve();
    })

    // setUser({ ...googleResponse.profileObj, socket: socket })
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
