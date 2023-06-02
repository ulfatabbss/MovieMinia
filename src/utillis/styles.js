import {Dimensions} from 'react-native';
import React from 'react';
import {white} from './colors';
const Width = Dimensions.get('window').width;
const h1 = {
  color: white,
  fontSize: 18,
  fontWeight: '700',
};
const h2 = {
  color: white,
  fontSize: 14,
  fontWeight: '500',
};
const h3 = {
  color: white,
  fontSize: 10,
  fontWeight: 'normal',
};
const linearGradient = {
  height: 330,
  width: '100%',
  padding: 20,
};
const logoIcon = {
  width: 50,
  height: 50,
};
const movieTitle = {
  color: white,
  fontSize: 24,
  fontWeight: '700',
};

export {h1, h2, h3, linearGradient, logoIcon, movieTitle};
