import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom'

import ArticleComponent from './components/ArticleComponent'
import FeedComponent from './components/FeedComponent';
import Signin from './components/Signin'

import engine from './personalization_engine/engine.js'
import { Connect } from '@blockstack/connect'
import { UserSession } from '@stacks/auth';
import { appConfig } from './assets/constants';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { AppBar, Link, IconButton, Toolbar, Typography } from '@material-ui/core';
import { deepPurple, lightBlue } from '@material-ui/core/colors';
import MenuIcon from '@material-ui/icons/Menu';
import ProfileButton from './components/ProfileButton';
import Profile from './components/Profile';


const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: lightBlue
  },
});


// const authOptions = 

const userSession = new UserSession({ appConfig });


class App extends Component {
  state = {
    loggedIn: false
  }

  handleSignOut(e) {
    e.preventDefault();
    this.setState({ loggedIn: false });
    engine.setUserData(null)
    userSession.signUserOut(window.location.origin);
    // TODO: Will probably have to notify engine that signout occured.
    
  }

  // Following source from: https://docs.blockstack.org/authentication/building-todo-app
  componentDidMount() {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData) => {
        // window.history.replaceState({}, document.title, "/")
        this.setState({ loggedIn: true})
        engine.setUserData(userData)
      });
    } else if (userSession.isUserSignedIn()) {
      this.setState({ loggedIn: true});
      engine.setUserData(userSession.loadUserData())
    }
  }

  render() {
    const authOptions = {
      finished: ({ userSession }) => {
        this.setState({ loggedIn:true });
        engine.setUserData(userSession.loadUserData())
      },
      appDetails: {
        name: 'Padlock News',
        // TODO, When we get hosting, place the real url there. This is TEMPORARY
        icon: 'https://raw.githubusercontent.com/brendankhoury/Padlock-News/front-end-dev/client/public/logo512.png',
      },
    };
    console.log("Data: " + engine.getUserData())
    return (
      <Connect authOptions={authOptions}>

        <Router>
          <ThemeProvider theme={theme}>
            <AppBar align='center' position="static">
              <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" className="title" >
                  <Link href="/" color ="inherit" underline="none">
                    Padlock News
                  </Link>
                </Typography>
                {!engine.getUserData() ? (
                  <Signin />
                ) : (
                  <ProfileButton/> 
                )}
              </Toolbar>
            </AppBar>
            <Route exact path="/" component={FeedComponent} />
            <Route path="/read/:id" render={props => (<ArticleComponent id={props.match.params.id}/>)}/>
            <Route path="/profile" component={Profile} />
          </ThemeProvider>
        </Router>
      </Connect>
    );
  }

}

export default App;
