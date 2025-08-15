import { useState, useEffect, useRef } from 'react'
import {Chatbot} from 'supersimpledev';
import RobotProfile from "./assets/chatbot.png"
import UserProfile from "./assets/user.png"

function ChatInput({ chatMessages, setChatMessages }) {
    const [input, setInput] = useState("");

    function saveInput(event) {
      setInput(event.target.value);
    }

    function sendMessage() {
      const newChatMessages = [
        ...chatMessages,
        {
          message: input,
          sender: "user",
          id: crypto.randomUUID
        }
      ]
      setChatMessages(newChatMessages);

      const response = Chatbot.getResponse(input)
      setChatMessages([
        ...newChatMessages,
        {
          message: response,
          sender: "robot",
          id: crypto.randomUUID
        }
      ]);

      setInput("");
    }

    return (
      <div className="chat-input-container">
        <input
          placeholder="Send a message to Chatbot"
          size="30"
          onChange={saveInput}
          className="chat-input"
          value={input}
        />
        <button
          onClick={sendMessage}
          className="send-button"
        >
          Send
        </button>
      </div>
    );
}

function ChatMessages({ chatMessages }) {

  const chatMessagesRef = useRef(null);

  useEffect(() => {
    const containerElem = chatMessagesRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [chatMessages])

  return (
    <div className="chat-messages-container"
      ref={chatMessagesRef}>
      {chatMessages.map((chatMessage) => {
        return (
          <ChatMessage
            message={chatMessage.message}
            sender={chatMessage.sender}
            key={chatMessage.id}
          />
        );
      })}
    </div>
  );
}

function ChatMessage({ message, sender }) {
return (
    <div className={sender === "user"
      ? "chat-message-user"
      : "chat-message-robot"
    }>
      {sender === "robot" && (
        <img src={RobotProfile}
          className="chat-message-profile"
        />)}
      <div className="chat-message-text">
        {message}
      </div>
      {sender === "user" && (
        <img src={UserProfile}
          className="chat-message-profile"
        />)}
    </div>
  );
}

function App() {
  const [chatMessages, setChatMessages] = useState(
        [
          {
            message: "Hello chatbot!",
            sender: "user",
            id: "id1"
          },
          {
            message: "Hello! How can I help you?",
            sender: "robot",
            id: "id2"
          },
          {
            message: "Can you get me todays date?",
            sender: "user",
            id: "id3"
          },
          {
            message: "Today is August 11",
            sender: "robot",
            id: "id4"
          }]
      );

      return (
        <div className="app-container">
          <ChatMessages
            chatMessages={chatMessages}
          />
          <ChatInput
            chatMessages={chatMessages}
            setChatMessages={setChatMessages}
          />
        </div>
      );
    
    
}

export default App
