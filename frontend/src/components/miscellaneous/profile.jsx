import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import React from 'react';
import { useTheme } from '@mui/material/styles';

const Profile = ({ open, handleClose }) => {
  const theme = useTheme();
  const user = JSON.parse(localStorage.getItem('userData'));

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 500 },
    maxWidth: 500,
    maxHeight: '90vh',
    backgroundColor:"gray",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[24],
    p: 4,
    outline: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflowY: 'auto',
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="profile-modal-title"
      aria-describedby="profile-modal-description"
    >
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <Typography variant="h4" component="h2" sx={{ mb: 3, fontWeight: 600 }}>
          User Profile
        </Typography>

        <Avatar
          src={user?.profilePic}
          alt={user?.profilePic}
          sx={{
            width: 120,
            height: 120,
            mb: 3,
            border: `4px solid ${theme.palette.primary.main}`,
          }}
        />

        <Box sx={{ width: '100%', textAlign: 'center' }}>
          <Typography variant="h5" sx={{ mb: 1, fontWeight: 500 }}>
            {user?.name}
          </Typography>
          
          <Divider sx={{ my: 2 }} />

          <Box sx={{ textAlign: 'left', width: '100%' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
              Account Information
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" color="text.secondary">
                Email
              </Typography>
              <Typography variant="body1">
                {user?.email}
              </Typography>
            </Box>

          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default Profile;