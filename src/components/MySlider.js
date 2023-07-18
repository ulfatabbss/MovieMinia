import {Dimensions, StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import Carousel from 'react-native-snap-carousel';

const MovieCards = ({item}) => (
  <View
    style={{
      height: 200,
      width: Dimensions.get('window').width - 40,
      backgroundColor: 'white',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      elevation: 5,
      shadowColor: 'white',
      marginBottom: 10,
      alignSelf: 'center',
    }}>
    <Image
      source={{uri: item.image}}
      style={{height: '100%', width: '100%', borderRadius: 10}}
    />
  </View>
);
const MySlider = ({Movies}) => {
  useEffect(() => {
    Movies;
  }, []);
  console.log(Movies, 'my slide');
  const carouselRef = useRef(null);
  const initialIndex = 1;
  const {width: screenWidth} = Dimensions.get('window');

  return (
    <View style={{flex: 1}}>
      <Carousel
        layout={'default'}
        layoutCardOffset={9}
        ref={carouselRef}
        data={Movies.concat(Movies[0])}
        renderItem={MovieCards}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 45}
        firstItem={initialIndex}
        autoplay={true}
        loop={true}
        autoplayInterval={3000}
        onSnapToItem={index => {
          if (index === Movies.length) {
            carouselRef.current.snapToItem(0, false);
          } else {
          }
        }}
      />
    </View>
  );
};

export default MySlider;
