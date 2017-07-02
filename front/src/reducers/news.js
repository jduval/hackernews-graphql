import {
  FETCH_NEWS,
  FETCH_NEWS_FAILURE,
  ADD_NEWS,
  ADD_NEWS_FAILURE,
  UP_VOTE_NEWS,
  UP_VOTE_NEWS_FAILURE,
  DOWN_VOTE_NEWS,
  DOWN_VOTE_NEWS_FAILURE,
} from '../constants/ActionTypes';

const initialState = {
  data: [],
  error: ''
};

const news = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_NEWS:
      return {
        data: action.res.data.allNews
      };
    case FETCH_NEWS_FAILURE:
      return {
        error: action.error,
      };
    case ADD_NEWS:
      const data = JSON.parse(action.res.data.addNews);
      return {
        data: [
          ...state.data,
          {
            id: data.insertId,
            title: data.title,
            url: data.url,
            creationTime: data.creationTime,
            score: 0,
            comments: [],
          }
        ]
      };
    case ADD_NEWS_FAILURE:
      return {
        ...state,
        error: action.error,
      };
    case UP_VOTE_NEWS:
      const newsToUpdate = state.data.find(obj =>
        obj.id === action.idNews
      );
      newsToUpdate.score++;
      return {
        ...state,
        data: [
          ...state.data,
          ...newsToUpdate
        ]
      };
    case DOWN_VOTE_NEWS:
      const newsToUpdate2 = state.data.find(obj =>
        obj.id === action.idNews
      );
      newsToUpdate2.score--;
      return {
        ...state,
        data: [
          ...state.data,
          ...newsToUpdate2
        ]
      };
    default:
      return state;
  }
};

export default news;
