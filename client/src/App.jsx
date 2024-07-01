import { useState } from 'react';
import io from 'socket.io-client'
import Chat from './Chat';
import './App.css'

const socket = io.connect('http://localhost:8000');



const App = () => {
    const [username, setUsername] = useState('')
    const [room, setRoom] = useState('')
    const [showChat, setShowChat]= useState(false)

    const joinRoom = ()=>{
        if(username !== '' && room !== ''){
            socket.emit("join_room", room);
            setShowChat(true)
        }
    }
  return (
    

    <>
    <div className='app'>
      {!showChat ? 

        ( <div className='join_room'><h3>Join Room <br /><span className='or'>or</span> <br /> Create room</h3>
        <input type="text" value={username} placeholder='Enter your name.....' onChange={(e)=>{setUsername(e.target.value)}}/>
        <input type="text" placeholder='Room ID' onChange={(e)=>{setRoom(e.target.value)}} value={room}/>
        <button onClick={joinRoom}>Join or Create</button>
        </div>)
        :
        <Chat socket={socket} username={username} room={room}/>
        }
      </div>
    </>
  )
}

export default App