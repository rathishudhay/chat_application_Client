import { useContext } from 'react'

import { GoogleLogin } from 'react-google-login';
import axios from 'axios'
import './auth.css'
import { UserContext } from '../context/UserContext';
import { io } from 'socket.io-client'


function Auth() {

  const { user, setUser } = useContext(UserContext)

  const responseGoogle = (googleResponse) => {
    console.log(googleResponse);
    const socket = io('http://localhost:3001');
    socket.on("connect", () => {
      console.log("you connected with Id:" + socket.id);
      socket.emit("setUserOnline", { socketId: socket.id, email: googleResponse.profileObj.email })
      setUser({ ...googleResponse.profileObj, socket: socket })
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
      // render={renderProps => (
      //   <button className="authBtn" onClick={renderProps.onClick} disabled={renderProps.disabled}>Login with Google</button>
      // )}
      />
    </div>
  )
}

export default Auth
