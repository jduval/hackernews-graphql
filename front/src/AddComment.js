import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {addComment} from './actions/comment';

export class AddComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.news.error)
      alert(nextProps.news.error);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.addComment({
      value: this.state.value,
      idNews: this.props.idNews
    });
  }

  render() {
    return (
      <div className="comment-form">
        <form onSubmit={this.handleSubmit}>
          <textarea
            placeholder="What's on your mind ?.."
            onChange={this.handleChange}
            value={this.state.value}
            />
          <button type="submit">Add !</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  news: state.news
});

const mapDispatchToProps = dispatch => bindActionCreators({
  addComment,
  changePage: () => push('/')
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddComment);
