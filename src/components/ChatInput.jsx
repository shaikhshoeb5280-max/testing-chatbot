import { useState } from 'react'
import{Chatbot} from 'supersimpledev'
import './ChatInput.css'
export function ChatInput({setchatmessage,chatmessages,isloading,setIsLoading}) {

        const [inputText,setInputText]=useState('')
       

        function saveInputText(event){
            setInputText(event.target.value)
        }
        function onKey(event){
            if(event.key ==='Enter') {
                Sendmessage()
            }
            if(event.key==='Escape'){
                setInputText('')
            }

        }

      async   function Sendmessage() {
        if(isloading||inputText===''){
            return;
        }

        setIsLoading(true)
        

          setInputText('')
         const newChatMessages =     [...chatmessages,
            
             {  message :inputText,
             sender:"user",
             id: crypto.randomUUID()

           }
        ]
            setchatmessage(newChatMessages)

      const response =    await Chatbot.getResponseAsync(inputText)
            setchatmessage(
            [...newChatMessages,
            
             {  message :response,
             sender:"robot",
             id: crypto.randomUUID()

           }
        ])

        setIsLoading(false)
        }
        function clearMessage(){
            setchatmessage([])
        }
        return (
          
          <div className="chat-input-container">
            
            <input type="text" width="50" value={inputText} placeholder="Enter your message" onChange={saveInputText} onKeyDown={onKey} className="chat-input"/>
            <button onClick={Sendmessage} className="send-button">send</button>

            <button onClick={clearMessage} className='clear-btn'>clear</button>
            </div>
         
        );
      }