import React,{useContext} from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Box from '@mui/material/Box';
import { UserContext } from '../../contextapi/index'


const BackBtn = () => {
      const {selectUserChat,setSelectUserChat} = useContext(UserContext);
      const haldlebtn = () => {
       setSelectUserChat(null);
       console.log("back")
      }

  return (
    <Box sx={{
      display:{xs:"flex", sm:"none",md:"none",lg:"none" },
      marginTop:1,
      cursor:"pointer"
    }}
    >
        <button onClick={()=> haldlebtn() }>
        <ArrowBackIcon />
        </button>
    </Box>
  )
}

export default BackBtn