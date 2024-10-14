import React from 'react';
import { Box, Typography } from '@mui/material';

const Message = ({ message, isUserMessage }) => {
  return (
    <Box
      sx={{
        margin: '8px 0',
        display: 'flex',
        flexDirection: isUserMessage ? 'row-reverse' : 'row',
        alignItems: 'flex-start',
      }}
    >
      <Typography
        sx={{
          backgroundColor: isUserMessage ? '#1e4d4a' : '#3c3c3c',
          color: '#f0f0f0',
          borderRadius: '8px',
          padding: '8px 12px',
          maxWidth: '70%',
          wordBreak: 'break-word',
          fontSize: '14px',
        }}
      >
        {message.text}
      </Typography>
      <Typography
        variant="caption"
        sx={{
          marginLeft: '12px',
          color: '#b0b0b0',
        }}
      >
        {message.timestamp}
      </Typography>
    </Box>
  );
};

export default Message;
