import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {LinearTextGradient} from 'react-native-text-gradient';
const GradientText = ({text}) => {
  return (
    <View>
      <LinearTextGradient
        style={{fontWeight: 'bold', fontSize: 20}}
        locations={[0, 1]}
        colors={['red', 'blue']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}>
        THIS IS TEXT GRADIENT
      </LinearTextGradient>
    </View>
  );
};

export default GradientText;

const styles = StyleSheet.create({});
