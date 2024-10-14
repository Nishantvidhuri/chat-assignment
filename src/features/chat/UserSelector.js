import React from 'react';
import { Box } from '@mui/material';
import UserCircle from '../../components/UserCircle';

const UserSelector = ({ users = [], onSelect, selectedUserId }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {users.map((user) => (
        <UserCircle
          key={user.id}
          user={user}
          onSelect={onSelect}
          isSelected={selectedUserId === user.id}
        />
      ))}
    </Box>
  );
};

export default UserSelector;
