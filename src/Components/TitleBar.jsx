import React from 'react'
import Meep from '../assets/meep.png';

function TitleBar() {
  return (
    <div className="flex flex-row bg-[#272727] shadow-2xl py-8 px-40 justify-between items-center">
      <img src={Meep} alt="Meep" className="w-1/12 h-auto" />
      <div>
        <h1 className="font-main text-white text-5xl tracking-wide font-black">Meep ChatBot</h1>
        <p className="mt-2 text-white font-main font-medium bg-[#494949] px-4 py-2 rounded-xl">ITE18 Requirement | Made by Francis Tin-ao</p>
      </div>
    </div>
  )
}

export default TitleBar