import React, {useContext, useEffect, useState} from 'react'
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Avatar from '@mui/material/Avatar';
import BackBtn from './backBtn';
import { UserContext } from '../../contextapi/index'
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import ScrollableChat from '../../page/scrollableChat';
import { io } from 'socket.io-client';
import Lottie from "lottie-react"
import animationData from '../../animation/typing.json'
import { getSender } from '../../config/chatLogic';

const Endpoint = "http://localhost:3030";
var socket , selectedChatCompare ; 


const SingleChatbox = () => {

const {user, selectUserChat , setSelectUserChat } = useContext(UserContext);
const [socketConnected , setSocketConnected] =useState(false);

const [message , setMessage] = useState([]); 
const [loading , setLoading] = useState(false);
const [newMessage , setNewMessage] = useState('');

const [typing , setTyping] = useState(false);

const token = JSON.parse(localStorage.getItem('token'))
const URL = import.meta.env.VITE_SERVER_URL;

 //socket.io connection setup 
   useEffect( () => {
        socket = io(Endpoint);
        socket.emit("setup" , user);
        socket.on("connected" , () => setSocketConnected(true) )
        socket.on("typing" , () => setTyping(true));
        socket.on("stop typing" , () => setTyping(false))
  });


const sendMessage = async(e) => {
    e.preventDefault();
    socket.emit("stop typing" ,  selectUserChat._id  );
    console.log(newMessage);
    const payload = {
      content:newMessage  ,
      chatId: selectUserChat._id,

    }
      const {data} = await axios.post(`${URL}/api/message` ,payload, {
             headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
          })
          
          console.log(data)
          socket.emit("new message" , data)
          setMessage([...message , data]);
          setNewMessage("");
}

const fetchMessage = async() => {
    if(! selectUserChat) return ;

    // const id =  !selectUserChat.isGroupChat ? selectUserChat.users[1]._id : selectUserChat._id
      
    try {
       const {data} = await axios.get(`${URL}/api/message/${selectUserChat._id}` , {
             headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
          })
          console.log(data) 
          setLoading(true) 
          setMessage(data)
          socket.emit("join chat" , selectUserChat._id)
    } catch (error) {
      console.log(error) 
    }
  }

useEffect( () => {
  fetchMessage();
 selectedChatCompare = selectUserChat;
},[newMessage,selectUserChat]);



useEffect(() => {
  const handleMessage = (newMessageRecievd) => {
    if (
      !selectedChatCompare ||
      selectedChatCompare._id !== newMessageRecievd.chat._id
    ) {
      // give notification (e.g., toast, badge, sound, etc.)
    } else {
      setMessage((prevMessages) => [...prevMessages, newMessageRecievd]);
    }
  };

  socket.on("message recieved", handleMessage);

  // Clean up to avoid duplicate listeners
  return () => {
    socket.off("message recieved", handleMessage);
  };
}, [selectedChatCompare]);


 const inputHandler =(e)=>{
   setNewMessage(e.target.value);
   
   //message indicator
   if(!socketConnected) return ;

   if(!typing){
    setTyping(true);
    socket.emit("typing" , id);   //selectUserChat._id
   }
  
   let lastTypingTime = new Date().getTime();
   var timeLength = 1000 ;

   setTimeout( () => {
    var nowTime = new Date().getTime();
    var timeDiff = nowTime - lastTypingTime ;

    if(timeDiff >= timeLength && typing ){
    socket.emit("stop typing" , id);  //id = selectUserChat._id
      setTyping(true);
    }

   },[timeLength])

}


    
  return (
    <div className='bg-gray-200 w-full px-4 py-2 rounded-sm'>
        <div className='flex justify-between px-2'>
        {/* <button className='bg-gray-300 rounded-lg p-2 text-center '> <ArrowBackIcon  /> </button> */}
        <div className='flex gap-4'>
            <BackBtn />
        <Avatar className='ml-1' src={selectUserChat.users[0].profilePic} />
        <h1 className='font-bold text-2xl mt-1'>{!selectUserChat.isGroupChat ? getSender(user,selectUserChat).toUpperCase() : selectUserChat.chatName.toUpperCase() } </h1>
        </div>
        <button className='bg-gray-300 rounded-lg p-2 text-center '> <VisibilityIcon  /> </button>
        </div>
        <Box className='w-70% h-118 bg-gray-300 mt-2 rounded-xl'>

          {!loading ? (
            <div className='justify-center items-center  text-center py-60'>loading....</div>
            ):( <ScrollableChat message={message} /> ) } 
          

         <FormControl onClick={sendMessage} type="submit" action="" sx={{width:"60%" , bottom:20 , position:"absolute"}}>
           { typing ? ( 
             <div style={{ width: 130, height: 130,marginTop:40 ,position:"relative"}}>
            <Lottie animationData={animationData}  loop={true} speed={0.5} className='mt-6 ml-6' /> </div> 
          ) : (<></>) }

          <div className='flex gap-2 sm:absolute sm:py-2 md:w-[80%] lg:left-10 md:bottom-[-15px] md:bsolute lg:w-[100%] '>
          <input type="text" placeholder='typping somthing' value={newMessage}  onChange={inputHandler }
          className='typing border-1 border-gray-400  h-10 px-5 rounded-3xl sm:w-[100px]  md:w-[800px] lg:w-[800px] ' />
          <Button type="submit" className='sendBox bottom-2' >  <SendIcon sx={{width:40,height:40}} /> </Button> 
          </div>
         </FormControl>

        </Box>
    </div>
  ) 
}

export default SingleChatbox