import React from 'react';
import {mount} from 'enzyme';

jest.mock('../AddComment', () => 'AddComment');

import {Comment} from '../Comment';

function setup() {
  const props = {
    location: {
      query: {
        idNews: 1
      }
    },
    news: {
      newsIds: [1, 2],
      newsObjs: {
        ['id-1']: {
          url: 'https://testtest.com/',
          title: 'title',
          creationTime: new Date().getTime() / 1000 | 0,
          comments: [{
            id: 1,
            text: 'my comment',
            creationTime: new Date().getTime() / 1000 | 0,
            score: 1
          }, {
            id: 2,
            text: 'my second comment',
            creationTime: new Date().getTime() / 1000 | 0,
            score: 10
          }],
          id: 1,
          score: 1
        },
        ['id-2']: {
          url: 'https://testtest2.com/',
          title: 'title2',
          creationTime: new Date().getTime() / 1000 | 0,
          comments: [],
          id: 2,
          score: 3
        }
      }
    }
  };

  const wrapper = mount(<Comment {...props} />);

  return {
    props,
    wrapper
  };
}

test('Comment component', () => {
  const {wrapper} = setup();

  expect(wrapper.state().idNews).toBe(1);

  wrapper.find('.btn-order-comment').simulate('click');
  expect(wrapper.state().bestFirst).toBeTruthy();

  expect(wrapper.props().news.newsObjs['id-1'].comments[0].id).toBe(2);
  wrapper.find('.btn-order-comment').simulate('click');
  expect(wrapper.props().news.newsObjs['id-1'].comments[0].id).toBe(1);
  expect(wrapper.state().bestFirst).toBeFalsy();
});
