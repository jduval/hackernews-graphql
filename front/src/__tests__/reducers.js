import reducer from '../reducers/news';
import * as types from '../constants/ActionTypes';

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

describe('News reducer', () => {
  test('return initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      newsIds: [],
      newsObjs: {},
      error: ''
    });
  });

  test('fetch news', () => {
    expect(
      reducer({}, {
        type: types.FETCH_NEWS,
        newsIds,
        newsObjs,
      })
    ).toEqual({
      newsIds,
      newsObjs,
    });
  });

  test('add news', () => {
    const res = {
      id: 4,
      title: 'title',
      url: 'http://url.com',
      creationTime: 1499100870,
    };
    expect(
      reducer({
        newsIds,
        newsObjs,
        error: ''
      }, {
        type: types.ADD_NEWS,
        res,
      })
    ).toEqual({
      error: '',
      newsIds: [
        ...newsIds,
        4
      ],
      newsObjs: {
        ...newsObjs,
        ['id-4']: {
          ...res,
          score: 0,
          comments: [],
        }
      }
    });
  });

  test('increment news score', () => {
    expect(
      reducer({
        newsIds,
        newsObjs,
        error: ''
      }, {
        type: types.UPDATE_NEWS,
        idNews: 1,
        score: 1
      })
    ).toEqual({
      error: '',
      newsIds,
      newsObjs: {
        ...newsObjs,
        ['id-1']: {
          ...newsObjs['id-1'],
          score: 2
        },
      }
    });
  });

  test('decrement news score', () => {
    expect(
      reducer({
        newsIds,
        newsObjs,
        error: ''
      }, {
        type: types.UPDATE_NEWS,
        idNews: 1,
        score: -1
      })
    ).toEqual({
      error: '',
      newsIds,
      newsObjs: {
        ...newsObjs,
        ['id-1']: {
          ...newsObjs['id-1'],
          score: 1
        },
      }
    });
  });

  test('add comment', () => {
    const res = {
      data: {
        addComment: 1
      }
    };
    expect(
      reducer({
        newsIds,
        newsObjs,
        error: ''
      }, {
        type: types.ADD_COMMENT,
        idNews: 1,
        value: 'new comment',
        res
      })
    ).toEqual({
      error: '',
      newsIds,
      newsObjs: {
        ...newsObjs,
        ['id-1']: {
          ...newsObjs['id-1'],
          comments: [{
            id: 1,
            text: 'new comment',
            creationTime: new Date().getTime() / 1000 | 0,
            score: 0,
          }]
        },
      }
    });
  });

  test('increment comment score', () => {
    expect(
      reducer({
        newsIds,
        newsObjs,
        error: ''
      }, {
        type: types.UPDATE_COMMENT,
        idNews: 2,
        idComment: 1,
        score: 1,
      })
    ).toEqual({
      error: '',
      newsIds,
      newsObjs: {
        ...newsObjs,
        ['id-2']: {
          ...newsObjs['id-2'],
          comments: [{
            score: 11,
            ...newsObjs['id-2'].comments[0]
          }]
        },
      }
    });
  });

  test('decrement comment score', () => {
    expect(
      reducer({
        newsIds,
        newsObjs,
        error: ''
      }, {
        type: types.UPDATE_COMMENT,
        idNews: 2,
        idComment: 1,
        score: -1,
      })
    ).toEqual({
      error: '',
      newsIds,
      newsObjs: {
        ...newsObjs,
        ['id-2']: {
          ...newsObjs['id-2'],
          comments: [{
            score: 10,
            ...newsObjs['id-2'].comments[0]
          }]
        },
      }
    });
  });
});
