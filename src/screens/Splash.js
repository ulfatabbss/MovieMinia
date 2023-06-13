import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Image} from '@rneui/base';

const Splash = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        resizeMode="contain"
        style={{height: 300, width: 300}}
        source={require('../assets/logo.png')}></Image>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({});
