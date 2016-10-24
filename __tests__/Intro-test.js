// __tests__/Intro-test.js
import 'react-native';
import React from 'react';
import Intro from '../Intro';
import {Instructions} from '../Instructions'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Instructions title={'instructions'} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});