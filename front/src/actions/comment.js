import processResponse from '../utils/process-response';
import handleActionError from '../utils/handle-action-error';
import {
  ADD_COMMENT,
  ADD_COMMENT_FAILURE,
  UPDATE_COMMENT,
  UPDATE_COMMENT_FAILURE
} from '../constants/ActionTypes';
import {clientAPI} from './clientAPI';

export const addComment = ({value, idNews}) =>
  dispatch =>
    clientAPI({
      body: JSON.stringify({
        query: `mutation{addComment(idNews:${idNews},input:"${value}")}`
      })
    }).then(processResponse)
      .then(res => dispatch({
        type: ADD_COMMENT,
        idNews,
        value,
        res,
      }))
      .catch(error => handleActionError(dispatch, error, ADD_COMMENT_FAILURE));

export const updateScore = ({idComment, idNews, type}) =>
  dispatch =>
    clientAPI({
      body: JSON.stringify({
        query: `mutation{${type}VoteComment(id:"${idComment}")}`
      })
    }).then(processResponse)
      .then(res => dispatch({
        score: type === 'up' ? 1 : -1,
        type: UPDATE_COMMENT,
        res,
        idComment,
        idNews,
      }))
      .catch(error => handleActionError(dispatch, error, UPDATE_COMMENT_FAILURE));
