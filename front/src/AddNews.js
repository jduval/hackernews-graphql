import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {addNews} from './actions/news';

export class AddNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // news successfully added, redirect to home.
    if (nextProps.news.newsIds.length > this.props.news.newsIds.length)
      this.props.changePage();
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addNews({url: this.state.value});
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div>Add a link</div>
          <button onClick={() => this.props.changePage()}>back to home</button>
        </div>
        <div className="App-form">
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              placeholder="Insert link URL"
              onChange={this.handleChange}
              value={this.state.value}
              />
            <button type="submit">Add !</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  news: state.news,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addNews,
  changePage: () => push('/')
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddNews);
