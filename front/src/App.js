import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import AddNews from './AddNews';

export default class App extends Component {
  render() {
    return (
      <div>

        <main>
          <Route exact path="/" component={Home} />
          <Route exact path="/add-news" component={AddNews} />
        </main>
      </div>
    );
  }
}
