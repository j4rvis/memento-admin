import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'fontsource-roboto';
import reportWebVitals from './reportWebVitals';
import { MemoContextProvider } from "./context/MemoContextProvider";
import { createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core';
import { green, amber } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: green,
    secondary: amber,
  }
})


ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <MemoContextProvider>
      <App />
    </MemoContextProvider>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
