import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import ArticleComponent from './components/ArticleComponent'
import * as serviceWorker from './serviceWorker';
import { createMuiTheme } from '@material-ui/core/styles';
import { deepPurple, lightBlue } from '@material-ui/core/colors';
import { ThemeProvider } from '@material-ui/styles';
import { AppBar, Button, IconButton, Toolbar, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const theme = createMuiTheme({
  palette: {
    primary: deepPurple,
    secondary: lightBlue
  },
});


const routing = (
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
            <Button variant="contained" color="secondary">Login</Button>
          </Toolbar>
        </AppBar>
        <Route exact path="/" component={App} />
        <Route path="/read" component={ArticleComponent} />
      </ThemeProvider>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
