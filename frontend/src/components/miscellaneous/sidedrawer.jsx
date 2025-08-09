import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

import Userlist from '../userlist'
import axios from 'axios';
import { useState ,useContext, useEffect} from 'react';
import { UserContext } from '../../contextapi/index'
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import ChatLoadingSate from '../chatLoadingSate'

export default function Sidedrawer() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [AlluserData, setAlluserData] = useState([]);
  const {selectedChat,setSelectedChat} = useContext(UserContext)
  const [loadingChat , setLoadingChat] = useState(true)

  const {setChats} = useContext(UserContext);
   const {chats} = useContext(UserContext);


  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

   
  const token = JSON.parse(localStorage.getItem('token'));

  const handleSearch = async(e) => {
    e.preventDefault();
    console.log("Search term:", search);
    setSearch(' ')
          const {data} = await axios.get(`http://localhost:3030/api/data/users?search=${search}`,{
                headers: {
                      Authorization: `Bearer ${token}`,
                      'Content-Type': 'application/json'
                  }
              });
              
              try{
                    setAlluserData(data);
                    setLoadingChat(false)
                    console.log(data);
                }catch(err){
                      console.log(err.message);
                  }
           
            }


  const accessChat =  async(userId)=>{
  // const chats = useContext(UserContext);

       const {data} = await axios.post(`http://localhost:3030/api/chats`, {userId}, {
                headers: {
                      Authorization: `Bearer ${token}`,
                      'Content-Type': 'application/json'
                  }
              });

     try {
      if(!chats.find((c) => c._id === data._id)) {
        setChats([chats,...chats])
      } 
       setSelectedChat(data);
       setOpen(false)

     } catch (error) {
        console.log(error.message);
     }
    
  }

  useEffect( () => {
   accessChat();
  },[selectedChat])

 
  return (
    <div>
      <Button onClick={toggleDrawer(true)} > Add New  </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}  > 

        <div className='w-full h-10 m-4'>
             <h1 className='font-bold text-2xl text-blue-400'>Search New User</h1>
        </div>
    <Divider />


        <form onSubmit={handleSearch} className='flex gap-2 mt-4 p-1 mx-4'>
        <input type="text" placeholder='search'  value={search} onChange={(e)=>setSearch(e.target.value)} className='border-1 w-full border-black-400 h-10 rounded-sm px-5' />
        <button className='text-blue-400 border-2 w-20 rounded-sm cursor-pointer'> Go</button>
        </form>
        
        {/* <Userlist AlluserData={AlluserData} />  */}
      {loadingChat && <ChatLoadingSate /> }
        <Box>
              <List>
                { AlluserData?.map((Item,index) => {
                  return(
                    <ListItem onClick={() => setOpen(false)} key={index} disablePadding className=' border-1 border-gray-200 rounded-sm'>
                        <ListItemButton onClick={() => accessChat(Item._id)} className='flex gap-10'>
                            <Avatar src={Item.profilePicture} className='ml-3' />
                            <ListItemText primary={Item.name} secondary={Item.email} />
                        </ListItemButton>
                    </ListItem>
                  )
                } )}
            </List>
        </Box>

      </Drawer>
    </div>
  );
}



