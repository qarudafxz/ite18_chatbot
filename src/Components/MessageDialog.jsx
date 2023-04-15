import React, { useState, useRef, useEffect } from 'react'
import MessageInput from '../Components/MessageInput'
import ChatMessage from '../Components/ChatMessage'
import ClearDialog from '../Components/ClearDialog'

function MessageDialog() {
  const today = new Date();
  const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
  const date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
  const [ input, setInput ] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const messagesEndRef = useRef(null);

  const handleInput = async (e) => {
    e.preventDefault();
    //update the chatLog state to map the existing messages and to push the new message
    setChatLog([...chatLog, { role: "Me", message: `${input}`, time: today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true})}]);
    setInput("");
    //fetch data
    const apiUrl = process.env.NODE_ENV === 'production' ? '/api/chat' : 'http://localhost:3001/api/chat';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          message: input
        })
      });
    const data = await response.json();
    const formattedResponse = formatMessage(data.message); // format the response message
    setChatLog([...chatLog, 
      { role: "Me", message: `${input}`, time: today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true}) },
      { role: "Meep", message: formattedResponse, time: today.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true}) },
       // use the formatted response message
    ]);
    } catch(err) {
      console.log(err);
    }   
  }

  const formatMessage = (message) => {
    return message.replace(/\n/g, "<br>");
  };

  //scroll to bottom of chatlog when new message is added to chatlog
  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  return (
    <div className="flex flex-col bg-[#494949] w-9/12 m-auto my-24 rounded-md overflow-y-auto qdialog" style={{height: "650px"}}>
      <div className="flex flex-row justify-between items-center px-4 py-2 shadow-xl">
        <h1 className="font-main text-white text-2xl tracking-wide font-black">Meep ChatBot</h1>
        <div className="flex flex-row gap-5 items-center">
          <p className="font-main text-white text-sm tracking-wide font-medium">{date + " | " + time}</p>
          <ClearDialog setChatLog={setChatLog}/>  
        </div>
      </div>
      {/* This is for the messages */}
      <div style={{maxHeight: "70vh", overflow: "auto"}}>
        <div className="flex flex-col items-left px-4 py-2 max-h-main gap-8">
        {
          chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))
        }
        <div ref={messagesEndRef} />
        </div>
      </div>
      <MessageInput setInput={setInput} handleInput={handleInput} input={input}/>
    </div>
  )
}

export default MessageDialog
