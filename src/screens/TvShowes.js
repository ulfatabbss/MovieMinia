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
import {Primary} from '../utillis/colors';
import Header from '../components/Header';

export const Movies = [
  {
    id: 1,
    name: 'Krish',
    Image:
      'https://c4.wallpaperflare.com/wallpaper/1022/525/87/movies-the-lord-of-the-rings-aragorn-viggo-mortensen-movie-posters-posters-the-return-of-the-king-entertainment-movies-hd-art-wallpaper-preview.jpg',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    detail:
      'When Walt Disney Pictures announced that The Little Mermaid would receive a live-action remake, many super fans worried that the studio would not be able to do the fairytale justice. The redhead mermaid, Ariel, the daughter of King Triton, has been beloved by viewers of all ages for her curiosity, innocence, and wonder. Finding the perfect actress to fill the mermaid’s tail was no small feat. However, Halle Bailey successfully swims into view with a bright voice worthy of the sea princess.',
  },
  {
    id: 2,
    name: 'Jocker',
    Image:
      'https://c4.wallpaperflare.com/wallpaper/675/275/718/joker-2019-movie-joker-joaquin-phoenix-actor-men-hd-wallpaper-preview.jpg',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    detail:
      'When Walt Disney Pictures announced that The Little Mermaid would receive a live-action remake, many super fans worried that the studio would not be able to do the fairytale justice. The redhead mermaid, Ariel, the daughter of King Triton, has been beloved by viewers of all ages for her curiosity, innocence, and wonder. Finding the perfect actress to fill the mermaid’s tail was no small feat. However, Halle Bailey successfully swims into view with a bright voice worthy of the sea princess.',
  },
  {
    id: 3,
    name: 'BatMan',
    Image:
      'https://c4.wallpaperflare.com/wallpaper/649/1012/960/john-wick-movie-poster-wallpaper-preview.jpg',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    detail:
      'When Walt Disney Pictures announced that The Little Mermaid would receive a live-action remake, many super fans worried that the studio would not be able to do the fairytale justice. The redhead mermaid, Ariel, the daughter of King Triton, has been beloved by viewers of all ages for her curiosity, innocence, and wonder. Finding the perfect actress to fill the mermaid’s tail was no small feat. However, Halle Bailey successfully swims into view with a bright voice worthy of the sea princess.',
  },
  {
    id: 4,
    name: 'SherLock Homes',
    Image:
      'https://c4.wallpaperflare.com/wallpaper/462/216/45/movies-dark-wednesday-addams-wednesday-tv-series-movie-poster-hd-wallpaper-preview.jpg',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    detail:
      'When Walt Disney Pictures announced that The Little Mermaid would receive a live-action remake, many super fans worried that the studio would not be able to do the fairytale justice. The redhead mermaid, Ariel, the daughter of King Triton, has been beloved by viewers of all ages for her curiosity, innocence, and wonder. Finding the perfect actress to fill the mermaid’s tail was no small feat. However, Halle Bailey successfully swims into view with a bright voice worthy of the sea princess.',
  },
  {
    id: 5,
    name: 'Fast & Furrios X',
    Image:
      'https://c4.wallpaperflare.com/wallpaper/796/310/540/jurassic-park-logos-movie-posters-1972x3014-entertainment-movies-hd-art-wallpaper-preview.jpg',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    detail:
      'When Walt Disney Pictures announced that The Little Mermaid would receive a live-action remake, many super fans worried that the studio would not be able to do the fairytale justice. The redhead mermaid, Ariel, the daughter of King Triton, has been beloved by viewers of all ages for her curiosity, innocence, and wonder. Finding the perfect actress to fill the mermaid’s tail was no small feat. However, Halle Bailey successfully swims into view with a bright voice worthy of the sea princess.',
  },
  {
    id: 6,
    name: 'Need for Speed',
    Image:
      'https://c4.wallpaperflare.com/wallpaper/144/450/423/star-wars-movies-star-wars-the-last-jedi-poster-wallpaper-preview.jpg',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    detail:
      'When Walt Disney Pictures announced that The Little Mermaid would receive a live-action remake, many super fans worried that the studio would not be able to do the fairytale justice. The redhead mermaid, Ariel, the daughter of King Triton, has been beloved by viewers of all ages for her curiosity, innocence, and wonder. Finding the perfect actress to fill the mermaid’s tail was no small feat. However, Halle Bailey successfully swims into view with a bright voice worthy of the sea princess.',
  },
  {
    id: 7,
    name: 'Need for Speed',
    Image:
      'https://c4.wallpaperflare.com/wallpaper/913/715/744/godzilla-vs-kong-godzilla-king-kong-movies-battle-hd-wallpaper-preview.jpg',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    detail:
      'When Walt Disney Pictures announced that The Little Mermaid would receive a live-action remake, many super fans worried that the studio would not be able to do the fairytale justice. The redhead mermaid, Ariel, the daughter of King Triton, has been beloved by viewers of all ages for her curiosity, innocence, and wonder. Finding the perfect actress to fill the mermaid’s tail was no small feat. However, Halle Bailey successfully swims into view with a bright voice worthy of the sea princess.',
  },
  {
    id: 8,
    name: 'Need for Speed',
    Image:
      'https://c4.wallpaperflare.com/wallpaper/929/709/303/aquaman-dc-comics-justice-league-warner-brothers-wallpaper-preview.jpg',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    detail:
      'When Walt Disney Pictures announced that The Little Mermaid would receive a live-action remake, many super fans worried that the studio would not be able to do the fairytale justice. The redhead mermaid, Ariel, the daughter of King Triton, has been beloved by viewers of all ages for her curiosity, innocence, and wonder. Finding the perfect actress to fill the mermaid’s tail was no small feat. However, Halle Bailey successfully swims into view with a bright voice worthy of the sea princess.',
  },
  {
    id: 9,
    name: 'Need for Speed',
    Image:
      'https://c4.wallpaperflare.com/wallpaper/687/356/960/joker-2019-movie-joker-smile-digital-art-poster-hd-wallpaper-preview.jpg',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    detail:
      'When Walt Disney Pictures announced that The Little Mermaid would receive a live-action remake, many super fans worried that the studio would not be able to do the fairytale justice. The redhead mermaid, Ariel, the daughter of King Triton, has been beloved by viewers of all ages for her curiosity, innocence, and wonder. Finding the perfect actress to fill the mermaid’s tail was no small feat. However, Halle Bailey successfully swims into view with a bright voice worthy of the sea princess.',
  },
  {
    id: 10,
    name: 'Need for Speed',
    Image:
      'https://c4.wallpaperflare.com/wallpaper/472/602/561/moana-2016-film-poster-movie-man-wallpaper-preview.jpg',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    detail:
      'When Walt Disney Pictures announced that The Little Mermaid would receive a live-action remake, many super fans worried that the studio would not be able to do the fairytale justice. The redhead mermaid, Ariel, the daughter of King Triton, has been beloved by viewers of all ages for her curiosity, innocence, and wonder. Finding the perfect actress to fill the mermaid’s tail was no small feat. However, Halle Bailey successfully swims into view with a bright voice worthy of the sea princess.',
  },
];
const TvShowes = ({navigation}) => {
  const carouselRef = useRef(null);
  const [entries, setEntries] = useState([]);
  const sliderWidth = Dimensions.get('window').width; // Replace with your desired value
  const itemWidth = Dimensions.get('window').width - 90; // Replace with your desired value
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const initialIndex = 1; // Index of the item to start from

  const MoviesView = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('MovieDiscription', {
          url: item.uri,
          thumbnail: item.Image,
          detail: item.detail,
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
        source={{uri: item.Image}}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.7)',

            width: '100%',

            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 12}}>{item.name}</Text>
          <Image
            style={{height: 20, width: 20}}
            source={require('../assets/play.png')}></Image>
          <Text style={{color: 'white', fontSize: 8}}>watch Now</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
  const MovieCards = ({item}) => (
    <View
      style={{
        height: 220,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',

        overflow: 'hidden',
        elevation: 10,
        shadowColor: 'white',
        marginBottom: 20,
        marginTop: 10,
      }}>
      <Image
        resizeMode="stretch"
        source={{uri: item.Image}}
        style={{height: '100%', width: '100%', borderRadius: 10}}></Image>
    </View>
  );
  return (
    <View style={styles.container}>
      <ScrollView>
        <Header />
        <Carousel
          ref={carouselRef}
          data={Movies.concat(Movies[0])}
          renderItem={MovieCards}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
          firstItem={initialIndex}
          autoplay={true}
          loop={true}
          autoplayInterval={3000}
          onSnapToItem={index => {
            if (index === Movies.length) {
              carouselRef.current.snapToItem(0, false);
              setCurrentIndex(0);
            } else {
              setCurrentIndex(index);
            }
          }}
        />
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 2,

            borderRadius: 20,
          }}>
          <Text style={styles.Heading}>Trending</Text>
          <View style={{height: 180, marginTop: 20}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={Movies}
              renderItem={MoviesView}
            />
          </View>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'baseline',

              alignSelf: 'flex-end',
            }}>
            <Text style={{color: Primary, marginRight: 2}}>More</Text>
            <Image
              source={require('../assets/expand.png')}
              style={{
                height: 10,
                width: 10,
                tintColor: Primary,
                marginRight: 10,
              }}></Image>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 2,

            borderRadius: 20,
          }}>
          <Text style={styles.Heading}>Popular</Text>
          <View style={{height: 180, marginTop: 20}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={Movies}
              renderItem={MoviesView}
            />
          </View>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'baseline',

              alignSelf: 'flex-end',
            }}>
            <Text style={{color: Primary, marginRight: 2}}>More</Text>
            <Image
              source={require('../assets/expand.png')}
              style={{
                height: 10,
                width: 10,
                tintColor: Primary,
                marginRight: 10,
              }}></Image>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 2,
            borderRadius: 20,
          }}>
          <Text style={styles.Heading}>New This Year</Text>
          <View style={{height: 180, marginTop: 20}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={Movies}
              renderItem={MoviesView}
            />
          </View>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'baseline',

              alignSelf: 'flex-end',
            }}>
            <Text style={{color: Primary, marginRight: 2}}>More</Text>
            <Image
              source={require('../assets/expand.png')}
              style={{
                height: 10,
                width: 10,
                tintColor: Primary,
                marginRight: 10,
              }}></Image>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default TvShowes;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333333',
    flex: 1,
  },
  Heading: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 16,
  },
});
