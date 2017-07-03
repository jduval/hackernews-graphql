import React from 'react';
import {shallow} from 'enzyme';
import {AddNews} from '../AddNews';

test('AddNews component', () => {
  const wrapper = shallow(
    <AddNews />
  );

  expect(wrapper.find('input').props().placeholder).toBe('Insert link URL');

  wrapper.find('input').simulate('change', {
    target: {value: 'new value'}
  });
  expect(wrapper.state()).toEqual({value: 'new value'});
});
