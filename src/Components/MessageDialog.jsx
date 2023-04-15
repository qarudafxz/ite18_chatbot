import React, { useState } from 'react'
import MessageInput from '../Components/MessageInput'
import ChatMessage from '../Components/ChatMessage'

function MessageDialog() {
  const today = new Date();
  const date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const [ input, setInput ] = useState("");
  const [chatLog, setChatLog] = useState([]);


  const handleInput = async (e) => {
    e.preventDefault();
    //update the chatLog state to map the existing messages and to push the new message
    setChatLog([...chatLog, { role: "Me", message: `${input}`}]);
    setInput("");
    //fetch data
    try {
      const response = await fetch('http://localhost:3001/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          message: input
        })
      });
    const data = await response.json();
    setChatLog([...chatLog, 
      { role: "Me", message: `${input}` },
      { role: "Meep", message: `${data.message}`}
    ]);
    } catch(err) {
      console.log(err);
    }   
  }

  return (
    <div className="flex flex-col bg-[#494949] w-9/12 m-auto mt-10 rounded-md" style={{height: "700px"}}>
      <div className="flex flex-row justify-between items-center px-4 py-2">
        <h1 className="font-main text-white text-2xl tracking-wide font-black">Meep ChatBot</h1>
        <p className="font-main text-white text-sm tracking-wide font-black">{date + " | " + time}</p>
      </div>
      {/* This is for the messages */}
      <div style={{maxHeight: "70vh", overflow: "auto"}}>
        <div className="flex flex-col items-left px-4 py-2 max-h-main gap-8">
        {
          chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))
        }
        </div>
      </div>
      <MessageInput setInput={setInput} handleInput={handleInput} input={input}/>
    </div>
  )
}

export default MessageDialog