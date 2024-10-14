import { createSlice } from '@reduxjs/toolkit';

// Initial mock data for users and their messages
const initialState = {
  users: [
    { id: 1, name: 'Alice Johnson', dp: 'https://images.unsplash.com/photo-1548884655-803db09fcbf6?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 2, name: 'Michael Smith', dp: 'https://images.unsplash.com/photo-1552599886-478b60c5fa61?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 3, name: 'Amily Davis', dp: 'https://images.unsplash.com/photo-1611784237828-7cb6c4d64959?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 4, name: 'David Brown', dp: 'https://images.unsplash.com/photo-1616267624976-b45d3a7bac73?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 5, name: 'Sophia Wilson', dp: 'https://images.unsplash.com/photo-1612311372499-8761ad50c451?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 6, name: 'Alice Brown', dp: 'https://images.unsplash.com/photo-1712847333437-f9386beb83e4?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 7, name: 'Michael Johnson', dp: 'https://plus.unsplash.com/premium_photo-1664461168683-9d2caee74eb0?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 8, name: 'Amily Smith', dp: 'https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  ],
  conversations: {
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
  },
  currentUser: null,
};

  

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    sendMessage: (state, action) => {
      const { userId, text } = action.payload;
      const message = {
        id: Date.now(),
        userId,
        text,
        timestamp: new Date().toLocaleTimeString(),
      };
      state.conversations[userId] = state.conversations[userId] || [];
      state.conversations[userId].push(message);
    },
    receiveMessage: (state, action) => {
      const { userId, text } = action.payload;
      const message = {
        id: Date.now(),
        
        text,
        timestamp: new Date().toLocaleTimeString(),
      };
      state.conversations[userId] = state.conversations[userId] || [];
      state.conversations[userId].push(message);
    },
  },
});

export const { setCurrentUser, sendMessage, receiveMessage } = chatSlice.actions;

export const simulateMessageReception = (userId, messageText) => (dispatch) => {
  setTimeout(() => {
    dispatch(receiveMessage({ userId, text: messageText }));
  }, 2000); 
};

export default chatSlice.reducer;
