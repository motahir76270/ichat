import React, { useState ,useContext ,useRef } from 'react'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import { UserContext } from '../contextapi/index'


const CreateGroup = ({open , handleClose}) => {
  const [groupName,setGroupName] = useState();
  const [selectedUser,setSelectedUser] = useState([]);
  const [search ,setSearch] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [loadingState ,setLoadingState] = useState(false); 
  const {chats,setChats} = useContext(UserContext);
  
  const cickedRef =  useRef();

  
  const token = JSON.parse(localStorage.getItem('token'));
const URL = import.meta.env.VITE_SERVER_URL;
  

 
  const handleSearch = async(query) => {
    setSearch(query);
    if(!query){
      return;
    }

    try {
      const {data} = await axios.get(`${URL}/api/data/users?search=${search}`,{
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
              });
              
              console.log(data);
              setSearchResult(data)
              setLoadingState(true);
              // if(data.length > 0){
              //   setSerachResult(data)
              // }
    } catch (error) {
      
    }

  }

  const handleGroup = (addToUser) => {  
    if(selectedUser.includes(addToUser)){
      alert("user already exists");
    }
  
    setSelectedUser([...selectedUser , addToUser]);
  }

  const handleDelete = (deleteUser) => {
    setSelectedUser(selectedUser.filter((sel) => sel._id !== deleteUser._id ))
  }

  const handleSubmit = async() => {
    if(!groupName || !selectedUser ){
      alert("fill group name or user")
      return;
    }
    
    const payloard = {
     name: groupName,
     users: JSON.stringify(selectedUser.map((u) => u._id))
    }
    try {
      const { data } = await axios.post(`${URL}/api/chats/group`, payloard, {
         headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      setChats([data,chats])
      handleClose();
    } catch (error) {
      
    }

  }



  return (
    <Modal
      open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description" 
     >

    <Box sx={style}>
      <form action="">
        <div className='flex flex-col gap-8 mt-10'>
        <TextField id="outlined-basic" onChange={(e)=>{setGroupName(e.target.value)}} label="Goup Name" variant="outlined" />
        <TextField id="outlined-basic" label="add User"  variant="outlined" onChange={(e)=> handleSearch(e.target.value) } />
        </div>
        <div>
            
          {/*  selected user from search result */}
            <div className='flex gap-2 flex-wrap'>
            {selectedUser.map((item,index) => {
              return (
                <div key={index} className='flex px-3  gap-2 border-3 border-green-400 w-20 rounded-2xl mt-2'>
                <h1>{item.name}</h1>
               <button onClick={() => handleDelete(item)} className='text-red-500  cursor-pointer'>X</button> 
               </div>
              )
            })}
              </div> 

          {/* search result */}
          <div className='mt-3 flex flex-col gap-3'>
             {searchResult?.map((item,index) => {
              return(
                <div key={index} onClick={() => handleGroup(item)} className=' w-[21.5rem] flex gap-2 bg-gray-300 rounded-sm p-1 px-2 cursor-pointer hover:bg-green-400 '> 
                <Avatar sx={{width:45 ,height:45}} />
                <div>
                <button>Name: { item.name }</button>
                <h3>Email: {item.email}</h3>
                </div>
                </div>
              )
             } )}
          </div>

        </div>

        <Button onClick={() => handleSubmit() } variant="contained" sx={{left:'6rem' , top:30}}>Create Group</Button>
      </form>
    </Box>    
      
    </Modal>
  )
}

export default  React.memo(CreateGroup)



const style={
    width:'27.65rem' , height:'min-height' , backgroundColor:"#dae3dd", marginTop:17,marginLeft:'35rem',
    borderRadius:"0px 0px 8px 8px", border:'2px solid #359652',padding:6, 
   }
