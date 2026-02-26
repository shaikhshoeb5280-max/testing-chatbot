import { useEffect, useState } from 'react'
import { ChatInput } from './components/ChatInput.jsx'
import ChatMessages from './components/ChatMessages.jsx';
import { Chatbot } from 'supersimpledev';
import './App.css'

function App() {
  const [chatmessages, setchatmessage] = useState(JSON.parse(localStorage.getItem('message')) || []);
  const [isloading, setIsLoading] = useState(false)

  useEffect(() => {
    Chatbot.addResponses({
      'give me a unique id': function () {
        return `sure here's a unique key ${crypto.randomUUID()}`
      },
           'dark mode': function () {
  document.body.classList.add('dark-mode'); // toggle allows on/off
  return 'Dark mode enabled 🌙';
},
    'light mode': function () {
    document.body.classList.remove('dark-mode')
      return 'Light mode enabled ☀️';
    },
    'what can you do':function(){
     return "Currently, I know how to flip a coin, roll a dice  i can toggle themes and i can give a unique id  or get today's date. Let me know how I can help!"
    }

    })
      // Update unsuccessfulResponse to include all known commands
 
  Chatbot.unsuccessfulResponse = `Sorry, I didn't quite understand that. Currently, I only know how to flip a coin, roll a dice  i can toggle themes and i can give a unique id  or get today's date. Let me know how I can help! `;
  }, [])

  useEffect(() => {
    localStorage.setItem('message', JSON.stringify(chatmessages))
  }, [chatmessages])

  return (
    <div className="app-container">
      <div className="chat-header">
        <h2>🤖 Chatbot Assistant</h2>
      </div>
      <ChatMessages chatmessages={chatmessages} isloading={isloading} setIsLoading={setIsLoading} />
      <ChatInput setchatmessage={setchatmessage} chatmessages={chatmessages} isloading={isloading} setIsLoading={setIsLoading} />
    </div>
  );
}

export default App