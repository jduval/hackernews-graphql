import {
  FETCH_NEWS,
  FETCH_NEWS_FAILURE,
  ADD_NEWS,
  ADD_NEWS_FAILURE,
  UPDATE_NEWS,
  UPDATE_NEWS_FAILURE,
  ADD_COMMENT,
  ADD_COMMENT_FAILURE,
  UPDATE_COMMENT,
  UPDATE_COMMENT_FAILURE
} from '../constants/ActionTypes';

const initialState = {
  newsIds: [],
  newsObjs: {},
  error: ''
};

const news = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NEWS:
      return {
        newsIds: action.newsIds,
        newsObjs: action.newsObjs,
      };
    case FETCH_NEWS_FAILURE:
      return {
        ...initialState,
        error: action.error,
      };
    case ADD_NEWS:
      return {
        newsIds: [
          ...state.newsIds,
          action.res.id,
        ],
        newsObjs: {
          ...state.newsObjs,
          [`id-${action.res.id}`]: {
            id: action.res.id,
            title: action.res.title,
            url: action.res.url,
            creationTime: action.res.creationTime,
            score: 0,
            comments: [],
          }
        },
        error: '',
      };
    case ADD_NEWS_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case UPDATE_NEWS:
      const newsToUpdate = state.newsObjs[`id-${action.idNews}`];
      if (action.score > 0)
        newsToUpdate.score++;
      else
        newsToUpdate.score--;
      return {
        ...state,
        newsObjs: {
          ...state.newsObjs,
          ...newsToUpdate
        }
      };
    case UPDATE_NEWS_FAILURE:
      return {
        ...state,
        error: action.res
      };
    case ADD_COMMENT:
      const newsPayload = state.newsObjs[`id-${action.idNews}`];
      return {
        ...state,
        newsObjs: {
          ...state.newsObjs,
          [`id-${action.idNews}`]: {
            ...newsPayload,
            comments: [
              ...newsPayload.comments,
              {
                id: action.res.data.addComment,
                text: action.value,
                creationTime: new Date().getTime() / 1000 | 0,
                score: 0,
              }
            ]
          }
        }
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        error: action.res,
      };
    case UPDATE_COMMENT:
      const commentToUpdate = state.newsObjs[`id-${action.idNews}`].comments.find(cmt =>
        cmt.id === action.idComment
      );
      if (action.score > 0)
        commentToUpdate.score++;
      else
        commentToUpdate.score--;
      return {
        ...state,
        newsObjs: {
          ...state.newsObjs,
          [`id-${action.idNews}`]: {
            ...state.newsObjs[`id-${action.idNews}`],
            comments: [
              ...state.newsObjs[`id-${action.idNews}`].comments,
              ...commentToUpdate,
            ]
          }
        }
      };
    case UPDATE_COMMENT_FAILURE:
      return {
        ...state,
        error: action.res
      };
    default:
      return state;
  }
};

export default news;
