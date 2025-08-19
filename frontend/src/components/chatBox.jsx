import React, {useContext} from 'react'
import Box from '@mui/material/Box';
import { UserContext } from '../contextapi/index'
import DemoChating from '../page/demoChating';
import SingleChatbox from './miscellaneous/singleChatbox';


const ChatBox = () => {
  const { selectUserChat } = useContext(UserContext);

  return (
<Box
  sx={{
    display: { xs: selectUserChat ? 'flex' : 'none', md: 'flex' },
    width: { xs: '100%', md: '69%',lg:"68%" },
    height:535,
    backgroundColor: '#fcf5eb',
    borderRadius: '8px',  
  }}
>
  { selectUserChat ? (<SingleChatbox/>): (<DemoChating />) }
</Box>
  );
};

export default ChatBox;