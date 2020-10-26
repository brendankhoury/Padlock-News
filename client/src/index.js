import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import ArticleComponent from './components/ArticleComponent'
import Signin from './components/Signin'
import * as serviceWorker from './serviceWorker';
import { createMuiTheme } from '@material-ui/core/styles';
import { deepPurple, lightBlue } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import { AppBar, IconButton, Toolbar, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import {Connect} from '@blockstack/connect'


const authOptions = {
  redirectTo: '/',
  finished: ({ userSession }) => {
    console.log(userSession.loadUserData());
  },
  appDetails: {
    name: 'Padlock News',
    // TODO, When we get hosting, place the real url there. This is TEMPORARY
    icon: 'https://raw.githubusercontent.com/brendankhoury/Padlock-News/front-end-dev/client/public/logo512.png',
  },
};


const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: lightBlue
  },
});


const routing = (
  <Connect authOptions={authOptions}>
    <Router>
      <ThemeProvider theme={theme}>
          <AppBar align='center' position="static">
            <Toolbar>
              <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className="title"> 
                Padlock News
              </Typography>
              <Signin/>
            </Toolbar>
          </AppBar>
          <Route exact path="/" component={App} />
          <Route path="/read" component={ArticleComponent} />
        </ThemeProvider>
    </Router>
  </Connect>
)

ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
