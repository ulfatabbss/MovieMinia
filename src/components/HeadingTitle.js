import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Heading} from '../utillis/styles';
import {useSelector} from 'react-redux';
import {useTheme} from 'react-native-paper';
import darkTheme from '../utillis/theme/darkTheme';
import lightTheme from '../utillis/theme/lightTheme';
import {RF} from '../utillis/theme/Responsive';
const HeadingTitle = ({title1, titile2}) => {
  const {myTheme} = useSelector(state => state.root.user);
  const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme);
  return (
    <>
      <Text
        style={{
          ...Heading,
          marginTop: RF(10),
          color: theme.colors.text,
          fontSize: RF(16),
          fontFamily: 'Raleway-Bold',
        }}>
        {title1}
      </Text>
      <Text
        style={{
          ...Heading,
          marginTop: RF(5),
          color: theme.colors.text,
          fontSize: RF(14),
          fontFamily: 'Raleway-Regular',
        }}>
        {titile2}
      </Text>
    </>
  );
};

export default HeadingTitle;

const styles = StyleSheet.create({});
