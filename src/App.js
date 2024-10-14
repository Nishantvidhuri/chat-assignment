import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'; // Import ThemeProvider and createTheme
import store from './app/store';
import Chat from './features/chat/Chat';

const darkTheme = createTheme({
  palette: {
    mode: 'dark', // Set the mode to dark
    background: {
      default: '#121212', // Dark background color
      paper: '#1e1e1e',   // Slightly lighter for elements
    },
    text: {
      primary: '#e0e0e0', // Light text color
      secondary: '#b3b3b3', // Slightly lighter text
    },
    primary: {
      main: '#90caf9', // Light blue for primary buttons
    },
    secondary: {
      main: '#f48fb1', // Light pink for secondary buttons
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 14, // Adjust font size
  },
});

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline /> {/* Ensures the base styles follow the dark theme */}
        <Chat />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
