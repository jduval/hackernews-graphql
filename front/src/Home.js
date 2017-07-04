import React, { Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import _ from 'lodash';
import './App.css';

import {fetchNews, updateScore} from './actions/news';

const styles = {
  tdComment: {
    width: 137
  },
  aComment: {
    cursor: 'pointer'
  },
  tdTitle: {
    textAlign: 'left',
    width: 750
  },
  aTitle: {
    color: 'black',
    textDecoration: 'none'
  }
};

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bestFirst: false,
      sortedNewsIds: [],
    };

    this.props.fetchNews();

    this.orderByScore = this.orderByScore.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.news.error)
      alert(nextProps.news.error);
  }

  handleVote({idNews, type}) {
    this.props.updateScore({
      idNews, type
    });
  }

  orderByScore() {
    let tmp = [];
    if (!this.state.bestFirst)
      tmp = _.orderBy(
        this.props.news.newsObjs,
        ['score'],
        ['desc']
      ).map(obj => obj.id);
    else
      tmp = _.orderBy(
        this.props.news.newsObjs,
        ['score'],
        ['asc']
      ).map(obj => obj.id);

    this.setState({
      bestFirst: !this.state.bestFirst,
      sortedNewsIds: tmp
    });
  }

  render() {
    const newsIds = this.state.sortedNewsIds.length
      ? this.state.sortedNewsIds
      : this.props.news.newsIds;
    return (
      <div className="App">
        <div className="App-header">
          <div>Hacker News like w/ GraphQL</div>
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
                    className="btn-order-news"
                    onClick={() => this.orderByScore()}>
                    order by score
                  </button>
                </td>
                <td></td>
                <td></td>
              </tr>
            {newsIds.map((newsId, i) => {
              const news = this.props.news.newsObjs[`id-${newsId}`];
              const nbComment = news.comments.length;
              return (
                  <tr key={i}>
                    <td>
                      <button
                        onClick={() => this.handleVote({
                          idNews: news.id,
                          type: 'up'
                        })}>
                        +
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => this.handleVote({
                          idNews: news.id,
                          type: 'down'
                        })}>
                        -
                      </button>
                    </td>
                    <td>{news.score}</td>
                    <td style={styles.tdTitle}>
                      <a
                        href={news.url}
                        target="_blank"
                        style={styles.aTitle}
                        >
                        {news.title}
                      </a>
                    </td>
                    <td>{moment.unix(news.creationTime).format('YYYY-MM-DD HH:mm:ss')}</td>
                    <td style={styles.tdComment}>
                      <a style={styles.aComment} onClick={() => this.props.getComment(news.id)}>{`[${nbComment} ${nbComment ? 'comments' : 'comment'}]`}</a>
                    </td>
                  </tr>
              );
            })}
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
  changePage: () => push('/add-news'),
  getComment: (idNews) => push({
    pathname: '/comment',
    query: {idNews}
  })
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
