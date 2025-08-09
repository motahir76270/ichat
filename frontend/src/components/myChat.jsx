import React,{useState,useContext, useEffect ,useRef} from 'react'
import MyChatHearder from './miscellaneous/myChatHearder'
import { UserContext } from '../contextapi/index'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import { getSender } from '../config/chatLogic';
 

const MyChat = () => {
  const chatsRef = useRef();
  const {user,setSelectedChat,setChats, setMyChatUser,setSelectUserChat} = useContext(UserContext);
  const {selectedChat,chats,myChatUser,selectUserChat} = useContext(UserContext);
  const  [loggedUser, setLoggedUser] = useState();
 
 

  const fetchChats =  async()=>{
      const token = JSON.parse(localStorage.getItem('token'));
        const {data} = await axios.get(`http://localhost:3030/api/chats`,{
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      
     try {
       
       if(data.length > 0 && data ){
         setChats(data); 
         console.log(data);    
       }
     } catch (error) {
        console.log(error.message);
     }
    
  };

  useEffect( ()=> {
    fetchChats();
  },[selectedChat]  )

  return (
    <Box  sx={{
      display:{    
        xs: selectUserChat ? 'none' : 'flex', 
        sm: "flex", // always show on medium and up 
        md:"flex", // always show on medium and up ,
      },
      width:{xs:"100%",sm:"30%",lg:"32%" },
      height:535
    }}
    className='flex flex-col bg-gray-200  h-150 rounded-lg' >
        <MyChatHearder />
        <Box className="h-135" sx={{overflowY:'scroll'}}>
          
            { chats?.map((item ,index) => {
              return (
             <Box onClick={ () => setSelectUserChat(item)  } className="flex py-[2px] px-5 gap-5 h-16 hover:bg-blue-400" 
             sx={{
              backgroundColor : selectUserChat === item ?"#1680b4":"none",
              color: selectUserChat ===item ? "white":"blue",
              cursor:"pointer",
             }}  key={index}  >
               <Avatar src={item.users[0].profilePic} sx={{width:60 , height:60}} />
               <div className='flex flex-col mt-4'>
               <button className='text-2xl ml-[-.7rem]' > { !item.isGroupChat ? getSender(user,item).toUpperCase() : item.chatName.toUpperCase()  } </button>
               </div>
             </Box> 
           
          
              )
            } )}


        </Box>
       
    
    </Box>
  )
}

export default MyChat;