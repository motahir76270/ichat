import Input from '@mui/joy/Input';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../contextapi';
import {
  Box,
  Typography,
  Button,
  FormControl,
  Avatar,
  CircularProgress,
  Alert
} from '@mui/joy';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/joy/styles';

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
  const URL = process.env.serverURl;

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
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'center',
        justifyItems:'center',
        minHeight: '70vh',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '400px',
          p: 3,
          borderRadius: 'sm',
          boxShadow: 'sm',
          backgroundColor: '#e0f0f0'
        }}
      >
        <Typography level="h4" component="h1" sx={{ textAlign: 'center', mb: 2 }}>
          Sign Up
        </Typography>

        {error && (
          <Alert color="danger" size="sm" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handlesubmit}>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Button
              component="label"
              variant="outlined"
              size="sm"
              startDecorator={<CloudUploadIcon />}
              sx={{ borderRadius: '20px' }}
            >
              Upload Photo
              <VisuallyHiddenInput
                type="file"
                accept="image/*"
                onChange={handleInputFile}
              />
            </Button>
          </Box>

          {previewImage && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Avatar src={previewImage} size="lg" />
            </Box>
          )}

          <FormControl sx={{ mb: 2 }}>
            <Input
              placeholder="Name"
              name="name"
              onChange={handleChange}
              value={formdata.name}
              size="lg"
              required
            />
          </FormControl>

          <FormControl sx={{ mb: 2 }}>
            <Input
              placeholder="Email"
              type="email"
              name="email"
              onChange={handleChange}
              value={formdata.email}
              size="lg"
              required
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
            />
          </FormControl>

          <Button
            type="submit"
            fullWidth
            size="lg"
            loading={isLoading}
            loadingIndicator={<CircularProgress size="sm" />}
          >
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </Button>
        </form>

      </Box>
    </Box>
  );
};

export default Signup;