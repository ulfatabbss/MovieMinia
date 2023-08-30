import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RF} from '../utillis/theme/Responsive';
import {Black} from '../utillis/theme';

const HeadingText = ({
  title,
  size,
  weight,
  color,
  R_Margin,
  regular,
  bold,
  semi_bold,
  light,
  medium,
  top,
  lines,
  self,
  alignCenter,
}) => {
  return (
    <Text
      numberOfLines={lines ? lines : null}
      style={{
        fontFamily: regular
          ? 'Raleway-Regular'
          : null || bold
          ? 'Raleway-Bold'
          : null || semi_bold
          ? 'Raleway-SemiBold'
          : null || light
          ? 'Raleway-Light'
          : null || medium
          ? 'Raleway-Medium'
          : null,
        fontSize: RF(size),
        alignSelf: self ? 'center' : 'auto',
        fontWeight: weight ? weight : '600',
        color: color ? color : Black,
        marginRight: R_Margin ? R_Margin : 0,
        marginTop: top ? top : 0,
        textAlign: alignCenter ? 'center' : 'auto',
      }}>
      {title}
    </Text>
  );
};

export default HeadingText;

const styles = StyleSheet.create({});
