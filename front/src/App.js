import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import AddNews from './AddNews';
import Comment from './Comment';

export default class App extends Component {
  render() {
    return (
      <div>
        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/add-news" component={AddNews} />
          <Route exact path="/comment" component={Comment} />
        </main>
      </div>
    );
  }
}
