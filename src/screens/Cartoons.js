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
import React, {useRef, useEffect, useState} from 'react';
import Carousel from 'react-native-snap-carousel';
import {Primary, secondary} from '../utillis/colors';
import Header from '../components/Header';
import {useSelector} from 'react-redux';
import {Heading, smalltext} from '../utillis/styles';
import MySlider from '../components/MySlider';
const Cartoons = ({navigation}) => {
  const carouselRef = useRef(null);
  const initialIndex = 1; // Index of the item to start from
  const {width: screenWidth} = Dimensions.get('window');
  const {cartoonData, animated1Data, animated2Data, animatedSlider} =
    useSelector(state => state.root.user);
  const MoviesView = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('MovieDiscription', {
          item: item,
          data: cartoonData,
          type: 'Movies',
        })
      }
      style={{
        backgroundColor: 'black',
        height: 160,
        width: 120,
        marginHorizontal: 6,
        borderRadius: 10,
        overflow: 'hidden',
        justifyContent: 'space-around',
        alignItems: 'center',
        elevation: 10,

        shadowColor: 'black',
      }}>
      <ImageBackground
        resizeMode="cover"
        style={{
          height: '100%',
          width: '100%',
          justifyContent: 'flex-end',
        }}
        source={{uri: item.poster[0].image}}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.5)',
            width: '100%',
            height: '20%',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <Text
            numberOfLines={1}
            style={{color: 'white', fontSize: 14, fontWeight: 'bold'}}>
            {item.title}
          </Text>
          {/* <Image
            style={{ height: 20, width: 20, marginVertical: 5 }}
            source={require('../assets/play.png')} /> */}
          {/* <Text style={{color: 'white', fontSize: 8}}>watch Now</Text> */}
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
  const MovieCards = ({item}) => (
    <View
      style={{
        height: 200,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        elevation: 5,
        shadowColor: 'white',
        marginBottom: 10,
      }}>
      <Image
        resizeMode="stretch"
        source={{uri: item.image}}
        style={{height: '100%', width: '100%', borderRadius: 10}}
      />
    </View>
  );
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="black" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        {/* <Carousel
          layout={'default'}
          layoutCardOffset={9}
          ref={carouselRef}
          data={animatedSlider.concat(animatedSlider[0])}
          renderItem={MovieCards}
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth - 45}
          firstItem={initialIndex}
          autoplay={true}
          loop={true}
          autoplayInterval={3000}
          onSnapToItem={index => {
            if (index === animatedSlider.length) {
              carouselRef.current.snapToItem(0, false);
            } else {
            }
          }}
        /> */}
        <MySlider Movies={animatedSlider} />
        <View
          style={{
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

          <View style={{marginTop: 10}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={cartoonData}
              renderItem={MoviesView}
            />
          </View>
        </View>
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

          <View style={{height: 180, marginTop: 20}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={animated2Data}
              renderItem={MoviesView}
            />
          </View>
        </View>
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
          <View style={{height: 180, marginTop: 20, marginBottom: 60}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={animated1Data}
              renderItem={MoviesView}
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
    marginTop: StatusBar.currentHeight,
  },
  Heading: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 16,
  },
});
