import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import AddComment from './AddComment';

import {updateScore} from './actions/comment';

export class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idNews: this.props.location.query ? this.props.location.query.idNews : 0,
      bestFirst: false,
    };
  }

  componentWillMount() {
    if (!this.state.idNews)
      return this.props.changePage();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.news.error)
      alert(nextProps.news.error);
  }

  handleVote({idComment, idNews, type}) {
    this.props.updateScore({
      idComment,
      idNews,
      type
    });
  }

  orderByScore(comments) {
    if (!this.state.bestFirst)
      comments.sort((a, b) => b.score - a.score);
    else
      comments.reverse();

    this.setState({
      bestFirst: !this.state.bestFirst,
    });
  }

  displayCommentList({comments, idNews}) {
    return (
      <div>
      <table>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td>
              <button
                className="btn-order-comment"
                onClick={() => this.orderByScore(comments)}>
                order by score
              </button>
            </td>
            <td></td>
            <td></td>
          </tr>
          {comments.map((comment, i) => (
            <tr key={i}>
              <td>
                <button
                  onClick={() => this.handleVote({
                    idComment: comment.id,
                    idNews,
                    type: 'up'
                  })}>
                  /\
                </button>
              </td>
              <td>
                <button
                  onClick={() => this.handleVote({
                    idComment: comment.id,
                    idNews,
                    type: 'down'
                  })}>
                  \/
                </button>
              </td>
              <td>{comment.score}</td>
              <td>{comment.text}</td>
              <td>{moment.unix(comment.creationTime).format('YYYY-MM-DD HH:mm:ss')}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    );
  }

  render() {
    const news = this.props.news.newsObjs[`id-${this.state.idNews}`];
    if (!news)
      return (<div></div>);

    return (
      <div className="App">
        <div className="App-header">
          <h2><a href={news.url}>{news.title}</a></h2>
          <button onClick={() => this.props.changePage()}>back to home</button>
        </div>
        {this.displayCommentList({
          comments: news.comments,
          idNews: news.id
        })}
        {<AddComment idNews={news.id}/>}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  news: state.news
});

const mapDispatchToProps = dispatch => bindActionCreators({
  updateScore,
  changePage: () => push('/')
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment);
