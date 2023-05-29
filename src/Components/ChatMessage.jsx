import React from 'react';
import { HiOutlineClock } from 'react-icons/hi';

function ChatMessage({ message }) {
  //text regex of backticks
  const isCodeBlock = message.message.match(/^```[\s\S]*```$/m);
  const messageContent = isCodeBlock ? 
    <pre className="font-main text-white text-sm font-medium">{message.message.slice(3, -3)}</pre>
    : <p className={`font-main text-white text-sm font-medium`} dangerouslySetInnerHTML={{ __html: message.message.replace(/```([\s\S]*?)```/g, '<pre>$1</pre>').replace(/\n/g, "<br>") }} />;
  
  return (  
    <div>
      <div className={`flex flex-row gap-4 items-center ${message.role === "MIIP" && "bg-[#414141] rounded-3xl p-4"}`}>
        <div
          className={`flex items-center justify-center ${
            message.role === "Meep" ? "bg-slate-700  border border-[#0b141a]" : "bg-[#646464] ml-4"
          } rounded-full w-12 h-12 p-4`}
        >
          <h1 className="text-center font-medium text-white text-xs">
            {message.role}
          </h1>
        </div>
        {messageContent}
      </div>
      <div className="flex justify-end mr-4 gap-2">
        <HiOutlineClock size="20" className="mt-2 text-[#2c2c2c]" />
        <p className="mt-2 text-sm font-medium text-[#2c2c2c]">{message.time}</p>
      </div>
    </div>
  );
}

export default ChatMessage;
