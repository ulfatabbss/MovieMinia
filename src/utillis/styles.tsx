import {Dimensions} from 'react-native';
import React from 'react';
import {Primary, white} from './colors';

const Width: number = Dimensions.get('window').width;

const h1: {
  color: string;
  fontSize: number;
  fontFamily: string;
  marginHorizontal: number;
} = {
  color: white,
  fontSize: 16,
  fontFamily: 'BebasNeue-Regular',
  marginHorizontal: 10,
};

const h2: {
  color: string;
  fontSize: number;
  fontWeight: string;
} = {
  color: white,
  fontSize: 14,
  fontWeight: '500',
};

const h3: {
  color: string;
  fontSize: number;
  fontWeight: string;
} = {
  color: white,
  fontSize: 10,
  fontWeight: 'normal',
};

const linearGradient: {
  height: number;
  width: string;
  padding: number;
} = {
  height: 330,
  width: '100%',
  padding: 20,
};

const logoIcon: {
  width: number;
  height: number;
} = {
  width: 50,
  height: 50,
};

const movieTitle: {
  color: string;
  fontSize: number;
  fontWeight: string;
} = {
  color: white,
  fontSize: 24,
  fontWeight: '700',
};

const Heading: {
  color: string;
  fontSize: number;
  marginLeft: number;
  fontFamily: string;
  marginVertical: number;
} = {
  color: 'white',
  fontSize: 25,
  marginLeft: 16,
  fontFamily: 'BebasNeue-Regular',
  marginVertical: 10,
};

const smalltext: {
  color: string;
  marginRight: number;
  fontFamily: string;
} = {
  color: Primary,
  marginRight: 3,
  fontFamily: 'BebasNeue-Regular',
};

const MovieView: {
  backgroundColor: string;
  height: number;
  width: number;
  borderWidth: number;
  borderColor: string;
  marginHorizontal: number;
  marginVertical: number;
  borderRadius: number;
  overflow: 'hidden';
  justifyContent: 'space-around';
  alignItems: 'center';
  elevation: number;
  shadowColor: string;
} = {
  backgroundColor: 'black',
  height: Dimensions.get('window').height / 5 - 10,
  width: Dimensions.get('window').width / 3 - 10,
  borderWidth: 0.5,
  borderColor: 'white',
  marginHorizontal: 5,
  marginVertical: 5,
  borderRadius: 10,
  overflow: 'hidden',
  justifyContent: 'space-around',
  alignItems: 'center',
  elevation: 3,
  shadowColor: 'white',
};

const overlay: {
  flex: number;
  backgroundColor: string;
} = {
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
