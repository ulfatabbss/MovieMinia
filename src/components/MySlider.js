import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { Movies } from '../screens/Dashboard';
import Carousel from 'react-native-snap-carousel';



const MovieCards = ({ item }) => (
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
        }}>
        <Image
            source={{ uri: item.Image }}
            style={{ height: '100%', width: '100%', borderRadius: 10 }} />
    </View>
);
const MySlider = () => {
    const carouselRef = useRef(null);
    const initialIndex = 1;
    const { width: screenWidth } = Dimensions.get('window');

    return (
        <View style={{ flex: 1 }}>
            <Carousel
                ref={carouselRef}
                data={Movies.concat(Movies[0])}
                renderItem={MovieCards}
                sliderWidth={screenWidth}
                sliderHeight={screenWidth}
                itemWidth={screenWidth}
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
            />        </View>
    )
}

export default MySlider

