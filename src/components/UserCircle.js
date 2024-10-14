import React from 'react';
import { Box, Typography } from '@mui/material';

const UserCircle = ({ user, onSelect, isSelected }) => {
  return (
    <Box>
      <Box
        onClick={() => onSelect(user.id)}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          cursor: 'pointer',
          margin: '0 10px',
          width: '240px',
          height: '100px',
          justifyContent: 'flex-start',
          backgroundColor: isSelected ? '#ffcc80' : '#424242',
          borderRadius: '8px',
          padding: '10px',
          transition: 'background-color 0.3s ease, transform 0.2s ease',
          '&:hover': {
            backgroundColor: isSelected ? '#ffb74d' : '#616161',
            transform: 'scale(1.05)',
          },
          position: 'relative',
        }}
      >
        <img
          src={user.dp}
          alt={user.name}
          style={{
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            border: '2px solid #ffffff',
            marginRight: '12px',
          }}
        />
        <Typography
          variant="body2"
          sx={{
            color: '#f0f0f0',
            marginTop: '8px',
            fontWeight: 'bold',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {user.name}
        </Typography>
        {isSelected && (
          <Box
            sx={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#76ff03',
              position: 'absolute',
              right: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
            }}
          />
        )}
      </Box>
    </Box>
  );
};

export default UserCircle;
