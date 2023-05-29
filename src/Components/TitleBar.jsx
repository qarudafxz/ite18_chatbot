import React from 'react'
import logo from '../../public/logo.png';

function TitleBar() {
  return (
    <div className="flex flex-row bg-[#272727] shadow-2xl py-8 px-40 justify-between items-center">
      <div>
        <img src={logo} alt="Logo" className="w-3/12 h-100px" />
        <h1 className="font-main text-white text-5xl tracking-wide font-black">Notesumarrizer</h1>
        <p className="mt-2 text-white font-main font-medium bg-[#494949] px-4 py-2 rounded-xl">"Let your note be summarize"</p>
        
      </div>
    </div>
  )
}

export default TitleBar