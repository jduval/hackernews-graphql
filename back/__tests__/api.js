const request = require('supertest');
const {app} = require('../app');

const firstNews = {};

describe('News', () => {
  test('add news', () => {
    const url = 'https://techcrunch.com/2017/07/02/first-apple-store-taiwan/';
    const query = `mutation{
        addNews(url:"${url}"){
          id,
          url,
          title,
          creationTime,
        }
      }`;

    return request(app)
      .post('/graphql')
      .send({query})
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body)
          .toHaveProperty('data.addNews.id', expect.anything());
        expect(res.body)
          .toHaveProperty('data.addNews.title', expect.anything());
        expect(res.body)
          .toHaveProperty('data.addNews.creationTime', expect.any(Number));
        expect(res.body)
          .toHaveProperty('data.addNews.url', url);
      });
  });

  test('get all news w/ comments', () => {
    return request(app)
      .get(`/graphql?query={
        allNews{
          id,
          url,
          title,
          score,
          creationTime,
          comments{
            id,
            text,
            score,
            creationTime
          }
        }
      }`.replace(/\s/g, ''))
      .then(res => {
        const {
          id,
          title,
          url,
          score,
          creationTime
        } = res.body.data.allNews[0];
        Object.assign(firstNews, {
          id,
          title,
          url,
          score,
          creationTime
        });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body).toHaveProperty('data.allNews');
      });
  });

  test('upvote an article', () => {
    const query = `mutation{
      upVoteNews(id:${firstNews.id})
    }`;
    return request(app)
      .post('/graphql')
      .send({query})
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
          'data': {
            'upVoteNews': '{"changedRows":1}'
          }
        });
      });
  });

  test('downvote an article', () => {
    const query = `mutation{
      downVoteNews(id:${firstNews.id})
    }`;
    return request(app)
      .post('/graphql')
      .send({query})
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
          'data': {
            'downVoteNews': '{"changedRows":1}'
          }
        });
      });
  });
});

let commentId = 0;
describe('Comment', () => {
  test('add a comment', () => {
    const query = `mutation{
      addComment(idNews:${firstNews.id}, input:"nice article !")
    }`;
    return request(app)
      .post('/graphql')
      .send({query})
      .then(res => {
        commentId = res.body.data.addComment;
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body).toHaveProperty('data.addComment');
      });
  });

  test('upvote a comment', () => {
    const query = `mutation{
      upVoteComment(id:${commentId})
    }`;
    return request(app)
      .post('/graphql')
      .send({query})
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
          'data': {
            'upVoteComment': '{"changedRows":1}'
          }
        });
      });
  });

  test('downvote a comment', () => {
    const query = `mutation{
      downVoteComment(id:${commentId})
    }`;
    return request(app)
      .post('/graphql')
      .send({query})
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
          'data': {
            'downVoteComment': '{"changedRows":1}'
          }
        });
      });
  });
});
