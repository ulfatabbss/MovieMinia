import { Dimensions, StyleSheet, Text, View, Image, NativeEventEmitter } from 'react-native';
import React, { useEffect, useRef, useState, useCallback } from 'react';
import Carousel from 'react-native-snap-carousel';

const MovieCards = ({ item }) => (
  <View style={styles.movieCard}>
    <Image source={{ uri: item?.image }} style={styles.movieImage} />
  </View>
);

const MySlider = ({ Movies }) => {
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [activeSlide, setActiveSlide] = useState(0);

  const updateDimensions = useCallback(() => {
    setScreenWidth(Dimensions.get('window').width);
  }, []);

  useEffect(() => {
    Dimensions.addEventListener('change', updateDimensions);

    return () => {
      Dimensions.removeEventListener('change', updateDimensions);
    };
  }, [updateDimensions]);

  const carouselRef = useRef(null);
  const initialIndex = 3;

  const handleSnapToItem = (index) => {
    setActiveSlide(index);
    if (index === Movies.length) {
      carouselRef.current.snapToItem(0, false);
    }
  };

  return (
    <View style={styles.container}>
      <Carousel
        layout="default"
        ref={carouselRef}
        data={Movies.concat(Movies[0])}
        renderItem={MovieCards}
        sliderWidth={screenWidth}
        itemWidth={screenWidth - 45}
        firstItem={initialIndex}
        autoplay={true}
        loop={true}
        autoplayInterval={5000}
        onSnapToItem={handleSnapToItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  movieCard: {
    height: 200,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    shadowColor: 'black', // Change shadow color to a darker shade
    alignSelf: 'center',
  },
  movieImage: {
    height: '100%',
    width: '100%',
    borderRadius: 5,
  },
});

export default MySlider;
