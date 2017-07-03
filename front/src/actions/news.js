import 'whatwg-fetch';
import processResponse from '../utils/process-response';
import handleActionError from '../utils/handle-action-error';
import {
  FETCH_NEWS,
  FETCH_NEWS_FAILURE,
  ADD_NEWS,
  ADD_NEWS_FAILURE,
  UPDATE_NEWS,
  UPDATE_NEWS_FAILURE,
} from '../constants/ActionTypes';
import {clientAPI} from './clientAPI';

export const fetchNews = () =>
  dispatch =>
    clientAPI({
      query: 'query={allNews{id,url,title,creationTime,score,comments{id,text,score,creationTime}}}'
    }).then(processResponse)
      .then(res => {
        const newsObjs = {};
        const newsIds = res.data.allNews.map(news => {
          newsObjs[`id-${news.id}`] = news;
          return news.id;
        });
        return dispatch({
          type: FETCH_NEWS,
          newsIds,
          newsObjs,
        });
      })
      .catch(error => handleActionError(dispatch, error, FETCH_NEWS_FAILURE));

export const addNews = ({url}) =>
  dispatch =>
    clientAPI({
      body: JSON.stringify({
        query: `mutation{addNews(url:"${url}"){id,url,title,creationTime}}`
      })
    }).then(processResponse)
      .then(res => dispatch({
        type: ADD_NEWS,
        res: res.data.addNews,
      }))
      .catch(error => handleActionError(dispatch, error, ADD_NEWS_FAILURE));

export const updateScore = ({idNews, type}) =>
  dispatch =>
    clientAPI({
      body: JSON.stringify({
        query: `mutation{${type}VoteNews(id:"${idNews}")}`
      })
    }).then(processResponse)
      .then(res => dispatch({
        type: UPDATE_NEWS,
        score: type === 'up' ? 1 : -1,
        res,
        idNews,
      }))
      .catch(error => handleActionError(dispatch, error, UPDATE_NEWS_FAILURE));
