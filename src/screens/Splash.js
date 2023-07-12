import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Image} from '@rneui/base';
import {StatusBar} from 'react-native';
import {Primary, secondary} from '../utillis/colors';

const Splash = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: secondary,
      }}>
      <StatusBar hidden />
      <Image
        resizeMode="contain"
        style={{height: 400, width: 400, tintColor: secondary}}
        source={require('../assets/logo1.png')}
      />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
