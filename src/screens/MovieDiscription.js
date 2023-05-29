import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

const MovieDiscription = ({navigation, route}) => {
  const {url, thumbnail, detail} = route.params;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        padding: 20,
        alignItems: 'center',
      }}>
      <View
        style={{
          width: '100%',
          height: 400,
        }}>
        <Image
          source={{
            uri: thumbnail,
          }}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: 16,
          }}></Image>
      </View>
      <Text style={styles.h1}>Iron Man</Text>
      <Text style={styles.h2}>A movie by MARVEL STUDIOS</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Player', {
            url: url,
          });
        }}
        style={{
          flexDirection: 'row',
          height: 36,
          width: 120,
          marginTop: 16,
          backgroundColor: 'lightgray',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
        }}>
        <Image
          style={{height: 30, width: 30}}
          source={require('../assets/play.png')}></Image>
        <Text>Play</Text>
      </TouchableOpacity>
      <Text style={styles.h3}>{detail}</Text>
    </View>
  );
};

export default MovieDiscription;

const styles = StyleSheet.create({
  h1: {
    fontSize: 24,
    color: 'white',
    marginTop: 30,
  },
  h2: {
    fontSize: 16,
    color: 'gray',
    marginTop: 16,
  },
  h3: {
    color: 'lightgray',
    marginTop: 16,
    textAlign: 'center',
  },
});
