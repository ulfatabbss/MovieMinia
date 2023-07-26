import { Dimensions } from 'react-native';
import React from 'react';
import { Primary, white } from './colors';
const Width = Dimensions.get('window').width;
const h1 = {
  color: white,
  fontSize: 16,
  fontFamily: 'BebasNeue-Regular',
  marginHorizontal: 10,
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
const Heading = {
  color: 'white',
  fontSize: 25,
  marginLeft: 16,
  fontFamily: 'BebasNeue-Regular',
  marginVertical: 10,
};
const smalltext = {
  // fontSize: 10,
  color: Primary,
  marginRight: 3,
  fontFamily: 'BebasNeue-Regular',
};
const MovieView = {
  backgroundColor: 'black',
  height: Dimensions.get('window').height / 5 - 10,
  width: Dimensions.get('window').width / 3 - 10,
  borderWidth: 0.5,
  borderColor: 'white',
  marginHorizontal: 5,
  borderRadius: 10,
  overflow: 'hidden',
  justifyContent: 'space-around',
  alignItems: 'center',
  elevation: 3,
  shadowColor: 'white',
};
const overlay = {
  flex: 1,
  backgroundColor: 'rgba(21,20,31, 0.8)',
};
export {
  h1,
  h2,
  h3,
  linearGradient,
  logoIcon,
  movieTitle,
  Heading,
  smalltext,
  MovieView,
  overlay,
};
