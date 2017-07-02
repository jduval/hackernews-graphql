import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import './App.css';

import {fetchNews, updateScore} from './actions/news';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bestFirst: false
    };

    this.props.fetchNews();

    this.orderByScore = this.orderByScore.bind(this);
  }

  handleVote({idNews, type}) {
    this.props.updateScore({
      idNews, type
    });
  }

  orderByScore(data) {
    if (!this.state.bestFirst)
      data.sort((a, b) => {
        return b.score - a.score;
      });
    else
      data.reverse();

    this.setState({
      bestFirst: !this.state.bestFirst,
    });
  }

  render() {
    const data = this.props.news.data;
    return (
      <div className="App">
        <div className="App-header">
          <div>Hacker News Like w/ GraphQL</div>
          <button onClick={() => this.props.changePage()}>Add news</button>
        </div>
        <div className="App-news">
          <table>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td>
                  <button
                    onClick={() => this.orderByScore(data)}>
                    order by score
                  </button>
                </td>
                <td></td>
                <td></td>
              </tr>
            {this.props.news.data.length
              ? this.props.news.data.map((news, i) => {
                const nbComment = news.comments.length;
                return (
                  <tr key={i}>
                    <td>
                      <button
                        onClick={() => this.handleVote({
                          idNews: news.id,
                          type: 'up'
                        })}>
                        /\
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => this.handleVote({
                          idNews: news.id,
                          type: 'down'
                        })}>
                        \/
                      </button>
                    </td>
                    <td>{news.score}</td>
                    <td>
                      <a href={news.url} target="_blank">{news.title}</a>
                    </td>
                    <td>{moment.unix(news.creationTime).format('YYYY-MM-DD HH:mm:ss')}</td>
                    <td>{`${nbComment} ${nbComment ? 'comments' : 'comment'}`}</td>
                  </tr>
                );
              })
              : null}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  news: state.news,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchNews,
  updateScore,
  changePage: () => push('/add-news')
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
