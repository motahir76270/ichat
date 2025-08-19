import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../contextapi';
import {
  Box,
  Typography,
  Button,
  FormControl,
  Avatar,
  CircularProgress,
  Alert,
  Input,
  Card
} from '@mui/joy';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/joy/styles';
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

const Signup = () => {
  const URL = import.meta.env.VITE_SERVER_URL;

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const [formdata, setFormdata] = useState({
    name: '',
    email: '',
    password: '',
    profilePic: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value
    });
  };

  const handleInputFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);

    try {
      const res = new FormData();
      res.append('file', file);
      res.append('upload_preset', "uploadProfile");
      res.append('cloud_name', "dugdqb2bk");

      const { data } = await axios.post(
        'https://api.cloudinary.com/v1_1/dugdqb2bk/image/upload',
        res
      );

      setFormdata({
        ...formdata,
        profilePic: data.url
      });
    } catch (err) {
      setError('Image upload failed');
      console.error(err);
    }
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const payload = {
        name: formdata.name,
        email: formdata.email,
        password: formdata.password,
        profilePic: formdata.profilePic || 'default_profile_pic.jpg'
      };

      const { data } = await axios.post(
        `${URL}/api/data/register`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json'
          },
        }
      );

      setUser(data);
      localStorage.setItem('token', JSON.stringify(data.token));
      localStorage.setItem('userData', JSON.stringify(data));
      navigate('/ichat');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        paddingTop: { xs: 2.9, sm: 2}
      }}
      className="bg-gray-800 "
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: '450px',
          height:{  xs: '100%', sm: 'auto' },
          p: { xs: 1, sm: 2.2 },
          px:{ xs: 3, sm: 4 },
          borderRadius: 'xl',
          boxShadow: 'lg',
          border: '2px solid #1e40af !important' ,
          borderColor: 'divider',
          backgroundColor: 'inherit'
        }}
      >
        {/* Mobile back button */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', mb: 2 }}  >
          <Button
            variant="plain"
            onClick={() => navigate(-1)}
            startDecorator={<FiArrowLeft />}
            sx={{ color: 'text.secondary' }}
          >
            Back
          </Button>
        </Box>

        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 3 }} >
          <Typography level="h3" component="h1" sx={{ mb: 1, fontWeight: 'bold',color:"white" }}>
            Create Account
          </Typography>
          <Typography level="body-sm" sx={{ color:"white"  }}>
            Join us to start chatting
          </Typography>
        </Box>

        {error && (
          <Alert color="danger" size="sm" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handlesubmit}>
          {/* Profile picture upload */}
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
            <Avatar
              src={previewImage}
              sx={{
                width: 80,
                height: 80,
                mb: 2,
                backgroundColor: previewImage ? 'transparent' : 'neutral.100',
                '&:hover': {
                  opacity: 0.8,
                  cursor: 'pointer'
                }
              }}
              onClick={() => document.getElementById('profile-upload').click()}
            >
              {!previewImage && <FiCamera size={24} />}
            </Avatar>
            
            <Button
              component="label"
              variant="outlined"
              size="sm"
              startDecorator={<CloudUploadIcon />}
              sx={{ borderRadius: 'lg' }}
            >
              Upload Photo
              <VisuallyHiddenInput
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleInputFile}
              />
            </Button>
          </Box>

          {/* Form fields */}
          <FormControl sx={{ mb: 2 }}>
            <Input
              placeholder="Full Name"
              name="name"
              onChange={handleChange}
              value={formdata.name}
              size="lg"
              required
              startDecorator={<FiUser />}
              sx={{
                borderRadius: 'lg',
                backgroundColor: 'transparent',
                 color: 'white',
              }}
            />
          </FormControl>

          <FormControl sx={{ mb: 2 }}>
            <Input
              placeholder="Email Address"
              type="email"
              name="email"
              onChange={handleChange}
              value={formdata.email}
              size="lg"
              required
              startDecorator={<FiMail />}
              sx={{
                borderRadius: 'lg',
                backgroundColor: 'transparent',
                 color: 'white',
              }}
            />
          </FormControl>

          <FormControl sx={{ mb: 3 }}>
            <Input
              placeholder="Password"
              type="password"
              name="password"
              onChange={handleChange}
              value={formdata.password}
              size="lg"
              required
              startDecorator={<FiLock />}
              sx={{
                borderRadius: 'lg',
                backgroundColor: 'transparent',
                color: 'white',
              }}
            />
          </FormControl>

          <Button
            type="submit"
            fullWidth
            size="lg"
            loading={isLoading}
            loadingIndicator={<CircularProgress size="sm" />}
            sx={{
              borderRadius: 'lg',
              fontWeight: 'bold',
              py: 1.5,
              backgroundColor: 'primary.500',
              '&:hover': {
                backgroundColor: 'primary.600',
                transform: 'translateY(-1px)',
                boxShadow: 'md'
              },
              transition: 'all 0.2s ease'
            }}
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </form>

        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Typography level="body-sm" sx={{ color:"white"  }}>
            Already have an account?{' '}
            <Link 
              to="/" 
              style={{ 
                color: '#1976d2', 
                textDecoration: 'none',
                fontWeight: 'bold'
              }}
            >
              Sign in
            </Link>
          </Typography>
        </Box>
      </Card>
    </Box>
  );
};

export default Signup;