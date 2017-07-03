import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
  fetchNews,
  addNews,
  updateScore
} from '../actions/news';
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

describe('News actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

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

  // test('Add news', () => {
  //   fetchMock.post('*', {data: {allNews}});
  //   // addNews;
  // });
});
