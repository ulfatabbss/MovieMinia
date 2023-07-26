import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import { Primary, secondary } from '../utillis/colors';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import { Heading, MovieView, smalltext } from '../utillis/styles';
import MySlider from '../components/MySlider';
const Cartoons = ({ navigation }) => {
  const { width: screenWidth } = Dimensions.get('window');
  const { cartoonData, animated1Data, animated2Data, animatedSlider } =
    useSelector(state => state.root.user);
  const MoviesView = ({ item, data }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('MovieDiscription', {
          item: item,
          data: data,
          type: 'Movies',
        })
      }
      style={MovieView}>
      <ImageBackground
        // resizeMode="cover"
        style={{
          height: '100%',
          width: '100%',
          justifyContent: 'flex-end',
        }}
        source={{ uri: item.poster[0].image }}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.9)',
            width: '100%',
            height: '20%',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            padding: 4,
          }}>
          <Text
            numberOfLines={1}
            style={{
              color: 'white',
              fontSize: 14,
              fontFamily: 'BebasNeue-Regular',
            }}>
            {item.title}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        <MySlider Movies={animatedSlider} />
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 2,
            borderRadius: 20,
          }}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={Heading}>Trending</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ExpandMovies', {
                  upcommingMoviesData: cartoonData,
                });
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'baseline',
                justifyContent: 'flex-end',
                marginTop: 10,
                marginRight: 10,
              }}>
              <Text style={smalltext}>More</Text>
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 10 }}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={cartoonData}
              renderItem={({ item }) => MoviesView({ item: item, data: cartoonData })}
            />
          </View>
        </View>
        <View
          style={{
            marginVertical: 10,
            marginHorizontal: 2,
            borderRadius: 20,
          }}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={Heading}>Popular</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ExpandMovies', {
                  upcommingMoviesData: animated2Data,
                });
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'baseline',
                justifyContent: 'flex-end',
                marginTop: 10,
                marginRight: 10,
              }}>
              <Text style={smalltext}>More</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={animated2Data}
            renderItem={({ item }) => MoviesView({ item: item, data: animated2Data })}
          />
        </View>
        <View
          style={{
            marginVertical: 10,
            marginHorizontal: 2,
            borderRadius: 20,
          }}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={Heading}>New This Year</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ExpandMovies', {
                  upcommingMoviesData: animated1Data,

                });
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'baseline',
                justifyContent: 'flex-end',
                marginTop: 10,
                marginRight: 10,
              }}>
              <Text style={smalltext}>More</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 180, marginBottom: 60 }}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={animated1Data}
              renderItem={({ item }) => MoviesView({ item: item, data: animated1Data })}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Cartoons;

const styles = StyleSheet.create({
  container: {
    backgroundColor: secondary,
    flex: 1,
  },
  Heading: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 16,
  },
});
