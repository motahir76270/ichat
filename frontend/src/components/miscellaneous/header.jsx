import React,{useContext,useState} from 'react'
import Sidedrawer from './sidedrawer';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Avatar from '@mui/material/Avatar';
import { UserContext } from '../../contextapi/index';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useNavigate} from 'react-router-dom';


import Profile from './profile';

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userData'))
   

      const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // Set the anchor to the clicked button
  };

  const menuClose = () => {
    setAnchorEl(null); // Close the menu
  };

  const handleLogout = () => {
    localStorage.removeItem('userdata');
    localStorage.removeItem('token');
    navigate('/');
    alert('you have successfully logout')

  }

    const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

  return (
    <div className='flex w-100% h-15 bg-gray-200 p-4 justify-between  sm:20% sm:px-2 lg:px-14 '>
        <Sidedrawer />
        <h1 className='font-bold text-green-500 text-2xl'>Ichat</h1>
        <main className='flex gap-4 items-center'>
        <NotificationsIcon />
        
       
     <div>
      <Button
        aria-controls={anchorEl ? 'simple-menu' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Avatar alt="User Avatar" src={user.profilePic} />
        
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}                // Anchor the menu to the button
        keepMounted
        open={Boolean(anchorEl)}           // Open if anchor is set
        onClose={menuClose}              // Close handler
      >

        <MenuItem onClick={handleOpen}>Profile</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>

    {open && <Profile open={open} handleClose={handleClose}  />}
  

     
        </main>
    </div>
  )
}

export default Header