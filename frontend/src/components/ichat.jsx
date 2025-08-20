import React from 'react'
import { useContext ,memo} from 'react';
import { UserContext } from '../contextapi/index';
import Header from './miscellaneous/header';
import MyChat from './myChat';
import ChatBox from './chatBox';


const Ichat = () => {
  const  {user}  = useContext(UserContext);

  return (
  <>
  <div className='flex flex-col gap-2 bg-gray-300 w-full h-screen p-3'>
      {user ?  <Header />  :  <Header />}
      <div className='flex gap-4'>
      {user ?   <MyChat />   :  <MyChat />}
      {user ? <ChatBox /> :<ChatBox />  }
      
      </div>
  </div>
  </>
  )
}

export default React.memo(Ichat)