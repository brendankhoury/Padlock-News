import React, { Component } from 'react';
import engine from './personalization_engine/engine.js'

import FeedComponent from './components/FeedComponent.jsx';



class App extends Component {
  render() {
    return (
      <FeedComponent/>
    );
  }
}

export default App;
