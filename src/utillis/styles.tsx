import {Dimensions} from 'react-native';
import React from 'react';
import {Primary, white} from './colors';
import {RF} from './theme/Responsive';
import {Secondary, White} from './theme';
const Width: number = Dimensions.get('window').width;

const h1: any = {
  color: white,
  fontSize: 16,
  fontFamily: 'Raleway',
  marginHorizontal: 10,
};

const h2: any = {
  color: white,
  fontSize: 14,
  fontWeight: '500',
};

const h3: any = {
  color: white,
  fontSize: 10,
  fontWeight: 'normal',
};

const h4: any = {
  fontSize: 18,
  fontWeight: '600',
  color: 'black',
};

const h5: any = {
  fontSize: 16,
  fontWeight: '400',
  color: 'black',
};

const h6: any = {
  fontSize: 14,
  fontWeight: '500',
  color: 'black',
};

const h7: any = {
  fontSize: 12,
  fontWeight: '400',
  color: 'black',
};
const h8: any = {
  fontSize: 10,
  fontWeight: '400',
  color: 'black',
};
const linearGradient: any = {
  height: 330,
  width: '100%',
  padding: 20,
};

const logoIcon: any = {
  width: 50,
  height: 50,
};

const movieTitle: any = {
  color: white,
  fontSize: 24,
  fontWeight: '700',
};

const Heading: any = {
  fontSize: RF(18),
  fontStyle: 'normal',
  fontFamily: 'Raleway-SemiBold',
};

const smalltext: any = {
  color: '#313131',
  fontSize: RF(16),
  fontFamily: 'Raleway-Medium',
};
const text: any = {
  // color: '#313131',
  fontSize: RF(13),
  fontFamily: 'Raleway-Regular',
};
const modal_FadeView: any = {
  height: '100%',
  width: '100%',
  position: 'absolute',
  zIndex: 500,
  backgroundColor: 'rgba(0,0,0,0.7)',
};
const modalContainer: any = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: RF(20),
};
const modalCard: any = {
  height: RF(300),
  width: '100%',
  borderRadius: RF(30),
  backgroundColor: White,
  padding: RF(20),
  alignItems: 'center',
};
const button_View: any = {
  flexDirection: 'row',
  justifyContent: 'space-around',
  width: '100%',
  alignItems: 'center',
  marginTop: RF(40),
};
const button: any = {
  height: RF(40),
  width: '45%',
  borderRadius: RF(40),
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: Primary,
};
const signUp_Button: any = {
  backgroundColor: White,
  borderColor: Secondary,
  elevation: 5,
};
const MovieView: any = {
  backgroundColor: 'black',
  height: Dimensions.get('window').height / 5 - 10,
  width: Dimensions.get('window').width / 3 - 10,
  borderWidth: 0.5,
  borderColor: 'white',
  marginHorizontal: RF(5),
  marginVertical: RF(5),
  borderRadius: RF(10),
  overflow: 'hidden',
  justifyContent: 'space-around',
  alignItems: 'center',
  elevation: 3,
  shadowColor: 'white',
};

const overlay: any = {
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
  height: RF(100),
  width: '100%',
  backgroundColor: '#f5e9cd',
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: RF(20),
};
export const SmallIcons = {
  height: RF(20),
  width: RF(20),
};
const container: {
  flex: number;
  paddingHorizontal: number;
} = {
  flex: 1,
  paddingHorizontal: RF(20),
};
export {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  h7,
  h8,
  linearGradient,
  logoIcon,
  movieTitle,
  Heading,
  smalltext,
  MovieView,
  overlay,
  text,
  container,
  modalCard,
  modalContainer,
  modal_FadeView,
  button,
  button_View,
  signUp_Button,
};
