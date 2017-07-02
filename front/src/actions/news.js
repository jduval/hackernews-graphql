import 'whatwg-fetch';
import processResponse from '../utils/process-response';
import handleActionError from '../utils/handle-action-error';
import {
  FETCH_NEWS,
  FETCH_NEWS_FAILURE,
  ADD_NEWS,
  ADD_NEWS_FAILURE,
  UP_VOTE_NEWS,
  UP_VOTE_NEWS_FAILURE,
  DOWN_VOTE_NEWS,
  DOWN_VOTE_NEWS_FAILURE
} from '../constants/ActionTypes';
import { config } from '../constants/config';

const BASE_URL = `${config.back.host}/graphql`;

export const fetchNews = () =>
  dispatch => {
    const url = `${BASE_URL}?query={allNews{id,url,title,creationTime,score,comments{id,text,score,creationTime}}}`;

    return fetch(url)
      .then(processResponse)
      .then(res => dispatch({
        type: FETCH_NEWS,
        res,
      }))
      .catch(error => handleActionError(dispatch, error, FETCH_NEWS_FAILURE));
  };

const POST_OPT = {
  method: 'post',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
};

export const addNews = ({url}) =>
  dispatch => {
    const opt = Object.assign({}, POST_OPT, {
      body: JSON.stringify({
        query: `mutation{addNews(url:"${url}")}`
      })
    });
    return fetch(BASE_URL, opt)
      .then(processResponse)
      .then(res => dispatch({
        type: ADD_NEWS,
        res,
      }))
      .catch(error => handleActionError(dispatch, error, ADD_NEWS_FAILURE));
  };

export const updateScore = ({idNews, type}) =>
  dispatch => {
    const opt = Object.assign({}, POST_OPT, {
      body: JSON.stringify({
        query: `mutation{${type}VoteNews(id:"${idNews}")}`
      })
    });
    return fetch(BASE_URL, opt)
      .then(processResponse)
      .then(res => dispatch({
        type: type === 'up' ? UP_VOTE_NEWS : DOWN_VOTE_NEWS,
        res,
        idNews,
      }))
      .catch(error => handleActionError(dispatch, error, type === 'up' ? UP_VOTE_NEWS_FAILURE : DOWN_VOTE_NEWS_FAILURE));
  };
