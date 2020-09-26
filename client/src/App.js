import React, { Component } from 'react';
import engine from './personalization_engine/engine.js'
import { createMuiTheme } from '@material-ui/core/styles';
import { purple, deepPurple } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import { AppBar, IconButton, Toolbar, Typography, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
  },
});


class App extends Component {
  render() {
    var feed = new engine();
    var text = JSON.stringify(feed.request_feed());
    return (
      <ThemeProvider theme={theme}>
        <AppBar align='center' position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" > 
              Padlock News
            </Typography>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    );
  }
}

export default App;
