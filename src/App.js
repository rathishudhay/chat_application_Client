import { useState, useMemo, useEffect } from 'react'
import './App.css';
import Auth from './components/Auth';
import Home from './components/Home/Home';
import { UserContext } from './context/UserContext'
import { io } from 'socket.io-client'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
function App() {
  const [user, setUser] = useState(null)
  const [channelList, setChannelList] = useState(null);
  const [messagesOfAllUsers, setMessagesOfAllUsers] = useState(null);
  const value = useMemo(() => ({ user, setUser, channelList, setChannelList, messagesOfAllUsers, setMessagesOfAllUsers }), [user, setUser, channelList, setChannelList, messagesOfAllUsers, setMessagesOfAllUsers])

  // useEffect(() => {
  //   const socket = io('http://localhost:3001');
  //   socket.on("connect", () => {
  //     console.log("you connected with Id:" + socket.id);
  //     socket.emit("setUserOnline", { socketId: socket.id, email: "rathishudhay@gmail.com" })
  //     setUser({ email: "rathishudhay@gmail.com", socket: socket })
  //   })
  // }, [])

  return (
    <div className="App">
      <UserContext.Provider value={value}>
        {console.log("user", user)}
        <Router>
          <Switch>
            <Route path="/" exact><Redirect to="/login" /></Route>
            <Route path="/login" component={Auth} />
            <Route path="/chat" component={Home} />
          </Switch>
        </Router>
        {/* {
          user == null
            ?
            <Auth />
            :
            <Home />
        } */}
      </UserContext.Provider>
    </div>
  );
}

export default App;
