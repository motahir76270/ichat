import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';


const Userlist = ({AlluserData}) => {

   
  return ( 
     <Box className='p-2'>
            <List>
                { AlluserData.map((Item,index) => {
                  return(
                    <ListItem key={index} disablePadding className=' border-1 border-gray-200 rounded-sm'>
                        <ListItemButton  className='flex gap-10'>
                            <Avatar src={Item.profilePicture} className='ml-3' />
                            <ListItemText primary={Item.name} secondary={Item.email} />
                        </ListItemButton>
                    </ListItem>
                  )
                } )}
            </List>

            <Divider />
            <List>
        
            </List>
        </Box>
  )
}

export default Userlist