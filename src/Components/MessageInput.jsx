import React from 'react'
import { FiSend } from 'react-icons/fi';

function MessageInput({ setInput, handleInput, input }) {
  return (
    <div className="w-full bg-slate-600 text-white font-main text-medium" style={{position: "sticky", top: "900px"}}>
      <form onSubmit={handleInput} className="flex flex-row place-items-center">
        <input type="text" className="w-full bg-slate-600 text-white font-main text-medium py-3 pl-4 rounded-sm focus:outline-none" placeholder="Input prompt to Meep" onChange={(e) => setInput(e.target.value)} value={input}/>
        <FiSend size="25" className="mr-4 cursor-pointer" onClick={handleInput}/>
      </form>
    </div>
  )
}

export default MessageInput