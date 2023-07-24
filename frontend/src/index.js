import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from "@mui/material"
import ScrollToTop from "./ScrollToTop";

// Color theme for MUI components. 
const theme = createTheme({
  palette: {
    primary: {
      main: "#fffffe",
      background: "#fffffe",
      headline: "#2b2c34",
      paragraph: "#2b2c34",
      button: "#078080",
      buttonText: "#232323",
      link: "#6246ea",
      like: "#e45858"
    },
    card: {
      main: "#f8f5f2",

      background: "#fffffe",
      headline: "#232323",
      paragraph: "#222525",
      tagBackground: "#078080",
      tagText: "#fffffe",
      highlight: "#078080"
    },
    form: {
      main: "#f8f5f2",

      input: "#fffffe",
      label: "#2b2c34",
      placeholder: "#2b2c34",
      button: "#6246ea",
      buttonText: "#fffffe"
    }
  }
});





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode >
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {/* scrolls to the top of page after every transition. */}
        <ScrollToTop />

        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
