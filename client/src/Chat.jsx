import { useEffect, useState} from "react";
import './Chat.css'
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  // const messageEndRef =  useRef(null)
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  const handleKeyPress = (e)=>{
    if(e.key=== 'Enter'){
      sendMessage()
    }
  }
  useEffect(() => {
    socket.on("receive_messsage", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="chat_display">
      <div className="header">
        <p>Live Chat</p>
      </div>
        <ScrollToBottom className="scroll_container">
      <div className="chat_body">
          {messageList.map((msg, index) => {
            return (
              <div key={index} className="messages_list">
                <h1 className="message">{msg.message}</h1>
                <p className="message_time">{msg.time}<span className="author">{msg.author}</span></p> 
              </div>
            );
          })}
          
      </div>
        </ScrollToBottom>
      <div className="chat-footer">
        <input
          value={currentMessage}
          onKeyDown={handleKeyPress}
          type="text"
          placeholder="Message..."
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
};

export default Chat;
