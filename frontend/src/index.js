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
      main: "#f8f5f2",
      background: "#f8f5f2",
      headline: "#232323",
      paragraph: "#222525",
      button: "#078080",
      buttonText: "#232323",
      link: "#078080"
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
      label: "#232323",
      placeholder: "#232323",
      button: "#f45d48",
      buttonText: "#232323"
    }
  }
});





const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode >
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <ScrollToTop />

        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
