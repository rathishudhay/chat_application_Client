import { useState, useMemo } from 'react'
import './App.css';
import Auth from './components/Auth';
import Home from './components/Home/Home';
import { UserContext } from './context/UserContext'
import { CallContextProvider } from './context/SocketContext'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import CallPane from './components/Home/CallPane/CallPane';
import CallPopup from './components/Popup/CallPopup';
function App() {
  const [user, setUser] = useState(null)
  const [channelList, setChannelList] = useState(null);
  const [messagesOfAllUsers, setMessagesOfAllUsers] = useState(null);
  const [currentSelectedChatId, setCurrentSelectedChatId] = useState(null);
  const value = useMemo(() => ({ user, setUser, channelList, setChannelList, messagesOfAllUsers, setMessagesOfAllUsers, currentSelectedChatId, setCurrentSelectedChatId }), [user, setUser, channelList, setChannelList, messagesOfAllUsers, setMessagesOfAllUsers, currentSelectedChatId, setCurrentSelectedChatId])

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
            <CallContextProvider>
              <Route path="/chat" component={Home} />
              <Route path="/call" component={CallPane} />
            </CallContextProvider>
          </Switch>
        </Router>


      </UserContext.Provider>
    </div>
  );
}

export default App;
