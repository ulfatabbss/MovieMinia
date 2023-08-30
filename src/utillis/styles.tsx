import {Dimensions} from 'react-native';
import React from 'react';
import {Primary, white} from './colors';
import {RF} from './theme/Responsive';
import {useTheme} from 'react-native-paper';
import darkTheme from './theme/darkTheme';
const Width: number = Dimensions.get('window').width;
// const theme = useTheme(darkTheme);
const h1: {
  color: string;
  fontSize: number;
  fontFamily: string;
  marginHorizontal: number;
} = {
  color: white,
  fontSize: 16,
  fontFamily: 'Raleway',
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
  // color: string;
  fontSize: number;
  // marginLeft: number;
  fontFamily: string;
  fontStyle: string;
  // fontWeight: string;
} = {
  // color: 'gray',

  fontSize: 18,
  // marginLeft: 16,
  fontStyle: 'normal',
  fontFamily: 'Raleway-SemiBold',
  // fontWeight: '600',
};

const smalltext: {
  color: string;
  // marginRight: number;
  fontFamily: string;
} = {
  color: '#313131',
  // marginRight: 3,
  fontFamily: 'Raleway-Medium',
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

export const FlexDirection = {
  flexDirection: 'row',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-between',
};
export const Extra = {marginTop: {marginTop: RF(20)}};

export const TopBar = {
  height: 140,
  width: '100%',
  backgroundColor: '#f5e9cd',
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 20,
};
export const SmallIcons = {
  height: 24,
  width: 24,
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
