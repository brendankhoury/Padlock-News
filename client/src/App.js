import React, { Component } from 'react';
import engine from './personalization_engine/engine.js'

import FeedComponent from './components/FeedComponent.jsx';



class App extends Component {
  render() {
    var feed = new engine().request_feed();
    // var text = JSON.stringify(feed.request_feed());
    return (
      <FeedComponent feed={feed}/>
    );
  }
}

export default App;
