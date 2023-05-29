import React from 'react'

function ClearDialog({ setChatLog }) {
  return (
    <div>
      <button className="text-white font-main font-medium text-md bg-[#3b3b3b] px-4 py-2 rounded-md hover:bg-[#303030] duration-300" onClick={() => setChatLog([])}>Clear Note</button>
    </div>
  )
}

export default ClearDialog