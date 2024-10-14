import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Avatar } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, simulateMessageReception } from './chatSlice';
import Message from '../../components/Message';
import './chat.css';

const Chat = () => {
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState(null);
  const [input, setInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const users = useSelector((state) => state.chat.users) || [];
  const conversations = useSelector((state) => state.chat.conversations);
  const messages = conversations[currentUser] || [];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (input.trim() === '' || !currentUser) {
      setErrorMessage('Please enter a message');
      return;
    }
    dispatch(sendMessage({ userId: currentUser, text: input }));
    dispatch(simulateMessageReception(currentUser, `Response from ${users.find(user => user.id === currentUser)?.name}`));
    setInput('');
    setErrorMessage('');
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        maxWidth: '1000px', 
        margin: { xs: '0px auto', md: '50px auto' },
        border: '1px solid #333', 
        borderRadius: '8px', 
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)', 
        height: '700px', 
        backgroundColor: '#121212', 
        color: '#e0e0e0' 
      }}
    >
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          overflowX: 'auto',
          whiteSpace: 'nowrap', 
          padding: '18px 16px',
          backgroundColor: '#1e1e1e',
        }}
      >
        {users.map((user) => (
          <Box
            key={user.id}
            onClick={() => setCurrentUser(user.id)}
            sx={{
              display: 'inline-block',
              cursor: 'pointer',
              marginRight: '16px',
              textAlign: 'center',
            }}
          >
            <Avatar 
              src={user.dp} 
              alt={user.name} 
              sx={{ 
                width: 60, 
                height: 60, 
                border: '2px solid #fff', 
                boxShadow: '0 0 5px rgba(0, 0, 0, 0.5)', 
              }} 
            />
            <Typography variant="caption" sx={{ color: '#e0e0e0' }}>{user.name}</Typography>
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          padding: '16px',
          backgroundColor: '#1e1e1e',
          width: '250px', 
          borderRight: '1px solid #333',
          overflowY: 'auto', 
        }}
      >
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Search users..."
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{
            marginBottom: '16px',
            input: { color: '#e0e0e0' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: '#555' },
              '&:hover fieldset': { borderColor: '#888' },
            },
          }}
          autoComplete="off"
        />
        {filteredUsers.map((user) => (
          <Box
            key={user.id}
            onClick={() => setCurrentUser(user.id)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              marginBottom: '8px',
              padding: '8px',
              borderRadius: '4px',
              backgroundColor: currentUser === user.id ? '#333' : 'transparent',
              '&:hover': { backgroundColor: currentUser !== user.id ? '#555' : '#333' },
            }}
          >
            <Avatar src={user.dp} alt={user.name} sx={{ width: 40, height: 40, marginRight: '8px' }} />
            <Typography variant="body2" sx={{ color: '#e0e0e0' }}>{user.name}</Typography>
          </Box>
        ))}
        {filteredUsers.length === 0 && (
          <Typography color="textSecondary" align="center" sx={{ marginTop: '16px' }}>
            No users found
          </Typography>
        )}
      </Box>

      <Box sx={{ 
        padding: '16px', 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%' 
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          {currentUser ? (
            <>
              <Avatar src={users.find(user => user.id === currentUser)?.dp} alt={users.find(user => user.id === currentUser)?.name} sx={{ width: 40, height: 40, marginRight: '8px' }} />
              <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: '500' }}>{`Chat with ${users.find(user => user.id === currentUser)?.name}`}</Typography>
            </>
          ) : (
            <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: '500', textAlign: 'center', margin:'0px' }}></Typography>
          )}
        </Box>

        <Box sx={{ 
          flexGrow: 1, 
          overflowY: 'auto', 
          padding: '18px', 
          backgroundColor: '#1e1e1e', 
          borderRadius: '8px' 
        }}>
          {currentUser ? (
            messages.length > 0 ? (
              messages.map((message) => (
                <Message key={message.id} message={message} isUserMessage={message.userId === currentUser} />
              ))
            ) : (
              <Typography sx={{ textAlign: 'center', color: '#888', marginTop: '16px' }}>
                No messages yet. Go ahead, break the ice! 😎
              </Typography>
            )
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
              <Typography variant="h6" sx={{ fontSize: '18px', fontWeight: '500', textAlign: 'center', padding: '250px 0 0 0' }}>
                Hey! Looks like you're alone here. Pick someone to chat.
              </Typography>
            </Box>
          )}
        </Box>
        
        {errorMessage && <Typography color="error" sx={{ mb: 1 }}>{errorMessage}</Typography>}

        {currentUser && (
          <Box sx={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            <TextField
              variant="outlined"
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              size="small"
              sx={{ fontSize: '14px', input: { color: '#e0e0e0' }, '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#555' }, '&:hover fieldset': { borderColor: '#888' } } }}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleSendMessage())}
              autoComplete="off"
            />
            <Button variant="contained" onClick={handleSendMessage} size="small" sx={{ padding: '6px 12px', fontSize: '14px', backgroundColor: '#33', '&:hover': { backgroundColor: '#444' } }}>Send</Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Chat;
