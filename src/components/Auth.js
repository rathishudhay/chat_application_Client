import { useContext } from 'react'

import { GoogleLogin } from 'react-google-login';
import './auth.css'
import { UserContext } from '../context/UserContext';
import { io } from 'socket.io-client'
import { useHistory } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'
import { apiRootUrl } from '../constants/api-constants'
function Auth() {

  const { user, setUser, setChannelList, setMessagesOfAllUsers } = useContext(UserContext)
  // const { init } = useContext(SocketContext);
  const history = useHistory();
  const responseGoogle = (googleResponse) => {
    console.log(googleResponse);
    console.log(user);
    if (user == null) {
      const socket = io(apiRootUrl);
      socket.on("connect", () => {
        console.log("you connected with Id:" + socket.id);
        if (googleResponse?.profileObj) {
          socket.emit("onUserLogin", { socketId: socket.id, email: googleResponse.profileObj.email, profilePicUrl: googleResponse.profileObj.imageUrl, name: googleResponse.profileObj.name }, (res) => {
            populateContactResponseDetails(res).then(() => {
              console.log("user set new");
              setUser({ ...googleResponse.profileObj, socket: socket })
              setTimeout(() => {
                console.log("timeout")
                // init();
                history.replace('/chat')
              }, 100);

            })
          })
        }
      })
    }
  }

  function compare(a, b) {
    if (new Date(a?.messages?.slice(-1)?.pop()?.timestamp) > new Date(b?.messages?.slice(-1)?.pop()?.timestamp)) {
      return -1;
    }
    if (new Date(a?.messages?.slice(-1)?.pop()?.timestamp) < new Date(b?.messages?.slice(-1)?.pop()?.timestamp)) {
      return 1;
    }
    return 0;
  }

  // objs.sort(compare);

  const populateContactResponseDetails = (res) => {
    console.log("res", res);
    return new Promise((resolve, reject) => {
      let channelList = [], allUserMessages = {};

      res.chatDetails.sort(compare).forEach((chatItem) => {
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
