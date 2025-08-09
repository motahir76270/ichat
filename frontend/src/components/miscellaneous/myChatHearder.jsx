import React, { useState } from 'react'
import CreateGroup from '../createGroup'


const MyChatHearder = () => {
  const [open , setOpen ] = useState(false)

   const handleClose = () => {
    setOpen(false)
   }

  return (
    <div className='flex bg-gray-200 h-15 py-3 justify-between px-8'>
        <h1 className='font-bold text-xl mt-1'>My Chats</h1>
        <div>
            <button onClick={() => setOpen(true)} className='border-1 w-[8rem] h-9 rounded-sm cursor-pointer'> Create Group + </button>
        </div>
        <CreateGroup open={open} handleClose={handleClose} />
    </div>
  )
}

export default MyChatHearder