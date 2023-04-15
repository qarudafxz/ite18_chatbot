import React from 'react'

function ChatMessage({ message }) {
  return (
    <div>
      <div className="flex flex-row gap-4 items-center">
        <div
          className={`flex items-center justify-center ${
            message.role === "Meep" ? "bg-slate-700" : "bg-[#646464]"
          } rounded-full w-12 h-12`}
        >
          <h1 className="text-center font-medium text-white text-xs">
            {message.role}
          </h1>
        </div>
        <p className="font-main text-white text-sm font-medium">
          {message.message}
        </p>
      </div>
    </div>
  );
}

export default ChatMessage