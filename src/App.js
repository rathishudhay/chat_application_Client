import { useState, useMemo, useEffect } from 'react'
import './App.css';
import Auth from './components/Auth';
import Home from './components/Home/Home';
import { UserContext } from './context/UserContext'
import { io } from 'socket.io-client'

function App() {
  const [user, setUser] = useState(null)
  const value = useMemo(() => ({ user, setUser }), [user, setUser])

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
        {
          // user == null
          //   ?
          //   <Auth />
          //   :
          <Home />
        }
      </UserContext.Provider>
    </div>
  );
}

export default App;
