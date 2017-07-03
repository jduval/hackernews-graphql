import React from 'react';
import {shallow} from 'enzyme';
import {AddComment} from '../AddComment';

test('AddComment component', () => {
  const wrapper = shallow(
    <AddComment idNews={1}/>
  );

  expect(wrapper.hasClass('comment-form')).toBeTruthy();
  expect(wrapper.find('textarea').props().placeholder).toBe('What\'s on your mind ?..');

  wrapper.find('textarea').simulate('change', {
    target: {value: 'new value'}
  });
  expect(wrapper.state()).toEqual({value: 'new value'});
});
