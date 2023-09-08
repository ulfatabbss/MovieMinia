import React, { useRef, useEffect } from 'react';
import { View, Image, FlatList, Animated, Dimensions } from 'react-native';

const Carousel = ({ images }) => {
  const scrollX = useRef(new Animated.Value(0)).current;
  const carouselRef = useRef(null);
  const ITEM_WIDTH = Dimensions.get('window').width - 10;
  const ITEM_SPACING = 5;

  const scrollToNextImage = () => {
    if (carouselRef.current) {
      const nextIndex =
        (Math.floor(scrollX._value / ITEM_WIDTH) + 1) % images.length;
      carouselRef.current.scrollToIndex({ index: nextIndex });
    }
  };

  useEffect(() => {
    const autoScrollInterval = setInterval(scrollToNextImage, 5000);

    return () => {
      clearInterval(autoScrollInterval);
    };
  }, []);

  return (
    <View>
      <FlatList
        ref={carouselRef}
        data={images}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToInterval={ITEM_WIDTH + ITEM_SPACING * 2}
        decelerationRate="fast"
        renderItem={({ item }) => (
          <View
            style={{
              width: ITEM_WIDTH,
              height: 172,
              marginHorizontal: ITEM_SPACING,
              borderRadius: 10,
              overflow: 'hidden',
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 1,
              shadowRadius: 14,
            }}>
            <Image
              source={{ uri: item.image }}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </View>
        )}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          {
            useNativeDriver: false,
          },
        )}
        scrollEventThrottle={16}
      />
    </View>
  );
};

export default Carousel;
