import React from 'react';
import {mount} from 'enzyme';
import {Home} from '../Home';

function setup() {
  const props = {
    fetchNews: jest.fn(),
    news: {
      newsIds: [1, 2],
      newsObjs: {
        ['id-1']: {
          url: 'https://testtest.com/',
          title: 'title',
          creationTime: new Date().getTime() / 1000 | 0,
          comments: [],
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

  const wrapper = mount(<Home {...props} />);

  return {
    props,
    wrapper
  };
}

test('Home component', () => {
  const {wrapper} = setup();

  expect(wrapper.state().sortedNewsIds.length).toBe(0);

  wrapper.find('.btn-order-news').simulate('click');
  expect(wrapper.state().bestFirst).toBeTruthy();
  expect(wrapper.state().sortedNewsIds).toHaveLength(2);
  expect(wrapper.state().sortedNewsIds[0]).toBe(2);
  expect(wrapper.state().sortedNewsIds[1]).toBe(1);
  wrapper.find('.btn-order-news').simulate('click');
  expect(wrapper.state().bestFirst).toBeFalsy();
  expect(wrapper.state().sortedNewsIds[0]).toBe(1);
  expect(wrapper.state().sortedNewsIds[1]).toBe(2);
});
