import React, { Component } from 'react';
import engine from './personalization_engine/engine.js'
import { createMuiTheme } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import { AppBar, IconButton, Toolbar, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import FeedComponent from './components/FeedComponent.jsx';
const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
  },
});


class App extends Component {
  render() {
    var feed = new engine().request_feed();
    // var text = JSON.stringify(feed.request_feed());
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
        <FeedComponent feed={feed}/>
      </ThemeProvider>
    );
  }
}

export default App;
