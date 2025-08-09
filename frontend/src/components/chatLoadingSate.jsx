
import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { ClassNames } from '@emotion/react';

export default function ChatLoadingSate() {
  return (
    <Box sx={{ width: 350 }}   >
      <Skeleton height="45px" className='ml-5' />
      <Skeleton height="45px" className='ml-5' />
      <Skeleton height="45px" className='ml-5' />
      <Skeleton height="45px" className='ml-5' />
     <Skeleton height="45px" className='ml-5' />
      <Skeleton height="45px" className='ml-5' />
      <Skeleton height="45px" className='ml-5' />
      <Skeleton height="45px" className='ml-5' />
      <Skeleton height="45px" className='ml-5' />
      <Skeleton height="45px" className='ml-5' />
     
      <Skeleton animation="wave" height="45px" className='ml-5' />
      <Skeleton animation={false} height="45px" className='ml-5' />
      
    </Box>
  );
}

