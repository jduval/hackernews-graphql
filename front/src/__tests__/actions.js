import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  fetchNews,
  addNews,
  updateScore
} from '../actions/news';
import {
  addComment,
  updateScore as updateScoreComment
} from '../actions/comment';
import * as types from '../constants/ActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const allNews = [{
  id: 1,
  url: 'http://url1.com',
  title: 'title 1',
  score: 1,
  creationTime: 1499100863,
  comments: []
}, {
  id: 2,
  url: 'http://url2.com',
  title: 'title 2',
  score: 10,
  creationTime: 1499100870,
  comments: [{
    id: 1,
    text: 'my comment',
    score: 10,
    creationTime: 1499100700
  }]
}, {
  id: 3,
  url: 'http://googogle.com',
  title: 'title 3',
  score: -5,
  creationTime: 1499100853,
  comments: []
}];
const newsIds = [1, 2, 3];
const newsObjs = {
  ['id-1']: {
    id: 1,
    url: 'http://url1.com',
    title: 'title 1',
    score: 1,
    creationTime: 1499100863,
    comments: []
  },
  ['id-2']: {
    id: 2,
    url: 'http://url2.com',
    title: 'title 2',
    score: 10,
    creationTime: 1499100870,
    comments: [{
      id: 1,
      text: 'my comment',
      score: 10,
      creationTime: 1499100700
    }]
  },
  ['id-3']: {
    id: 3,
    url: 'http://googogle.com',
    title: 'title 3',
    score: -5,
    creationTime: 1499100853,
    comments: []
  },
};

const addedNews = {
  id: 4,
  url: 'http://just-added.com',
  title: 'title 4',
  creationTime: 1499102953,
};

afterEach(() => {
  fetchMock.restore();
});

describe('News actions', () => {
  test('Get all news', () => {
    fetchMock.get('*', {data: {allNews}});

    const expectedActions = [
      {type: types.FETCH_NEWS, newsIds, newsObjs}
    ];

    const store = mockStore();

    return store.dispatch(fetchNews()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('Add news', () => {
    fetchMock.post('*', {
      data: {
        addNews: {
          ...addedNews
        }
      }
    });

    const expectedActions = [
      {type: types.ADD_NEWS, res: addedNews}
    ];

    const store = mockStore();

    return store.dispatch(addNews({url: addedNews.url})).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('increment news score', () => {
    fetchMock.post('*', {
      data: {
        upVoteNews: '{"changedRows":1}'
      }
    });

    const expectedActions = [
      {type: types.UPDATE_NEWS, score: 1, idNews: 1}
    ];

    const store = mockStore();

    return store.dispatch(updateScore({
      idNews: 1, type: 'up'
    })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('decrement news score', () => {
    fetchMock.post('*', {
      data: {
        downVoteNews: '{"changedRows":1}'
      }
    });

    const expectedActions = [
      {type: types.UPDATE_NEWS, score: -1, idNews: 1}
    ];

    const store = mockStore();

    return store.dispatch(updateScore({
      idNews: 1, type: 'down'
    })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});

describe('Comment action tests', () => {
  test('Add comment', () => {
    const res = {
      data: {
        addComment: '1'
      }
    };
    fetchMock.post('*', res);

    const expectedActions = [{
      type: types.ADD_COMMENT,
      res,
      idNews: 1,
      value: 'my first comment !'
    }];

    const store = mockStore();

    return store.dispatch(addComment({
      value: 'my first comment !',
      idNews: 1
    })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('increment comment score', () => {
    const res = {
      data: {
        upVoteComment: '{"changedRows":1}'
      }
    };
    fetchMock.post('*', res);

    const expectedActions = [{
      type: types.UPDATE_COMMENT,
      score: 1,
      idNews: 1,
      idComment: 1,
      res
    }];

    const store = mockStore();

    return store.dispatch(updateScoreComment({
      idComment: 1,
      type: 'up',
      idNews: 1
    })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  test('decrement comment score', () => {
    const res = {
      data: {
        downVoteComment: '{"changedRows":1}'
      }
    };
    fetchMock.post('*', res);

    const expectedActions = [{
      type: types.UPDATE_COMMENT,
      score: -1,
      idNews: 1,
      idComment: 1,
      res
    }];

    const store = mockStore();

    return store.dispatch(updateScoreComment({
      idComment: 1,
      type: 'down',
      idNews: 1
    })).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
