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
import {GetDrama} from '../services/AppServices';
import {setDramaData} from '../redux/reducers/userReducers';
import {useSelector} from 'react-redux';
import {store} from '../redux/store';
import {data} from 'cheerio/lib/api/attributes';
import {Heading, MovieView, smalltext} from '../utillis/styles';

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
  const initialIndex = 1; // Index of the item to start from
  const {width: screenWidth} = Dimensions.get('window');
  const {dramaData, sliderData, dramaSlider} = useSelector(
    state => state.root.user,
  );
  const [indian, setIndian] = useState(null);
  const [turkish, setTurkish] = useState(null);

  useEffect(() => {
    GetDrama()
      .then(async ({data}) => {
        store.dispatch(
          setDramaData(data.filter(object => object.category === 'Urdu')),
        );
        setIndian(data.filter(object => object.category === 'Indian'));
        setTurkish(data.filter(object => object.category === 'Turkish'));
      })
      .catch(err => {
        console.log(err, 'errors');
      });
  }, []);
  const MoviesView = ({item}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('MovieDiscription', {
          item: item,
          type: 'Drama',
          data: item,
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
        source={{uri: item.poster[0].image}}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.8)',
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
  const MovieCards = ({item}) => (
    <View
      style={{
        height: 200,
        marginBottom: 10,
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
        resizeMode="contain"
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
        <Carousel
          layout={'default'}
          layoutCardOffset={9}
          ref={carouselRef}
          data={dramaSlider.concat(dramaSlider[0])}
          renderItem={MovieCards}
          sliderWidth={screenWidth}
          sliderHeight={screenWidth}
          itemWidth={screenWidth - 45}
          firstItem={initialIndex}
          autoplay={true}
          loop={true}
          autoplayInterval={3000}
          onSnapToItem={index => {
            if (index === dramaSlider.length) {
              carouselRef.current.snapToItem(0, false);
            } else {
            }
          }}
        />
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
            <Text style={Heading}>Pakistani</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ExpandMovies', {
                  upcommingMoviesData: dramaData,
                });
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'baseline',
                justifyContent: 'flex-end',
                marginRight: 10,
              }}>
              <Text style={smalltext}>More</Text>
              {/* <Image
                style={{ height: 10, width: 10, tintColor: Primary }}
                source={require('../assets/expand.png')}></Image> */}
            </TouchableOpacity>
          </View>

          <View style={{marginTop: 10}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={dramaData}
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
            <Text style={Heading}>Turkish</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ExpandMovies', {
                  upcommingMoviesData: turkish,
                });
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'baseline',
                justifyContent: 'flex-end',
                marginRight: 10,
              }}>
              <Text style={smalltext}>More</Text>
              {/* <Image
                style={{ height: 10, width: 10, tintColor: Primary }}
                source={require('../assets/expand.png')}></Image> */}
            </TouchableOpacity>
          </View>

          <View style={{height: 180, marginTop: 10}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={turkish}
              renderItem={MoviesView}
            />
          </View>
        </View>
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
            <Text style={Heading}>Indian</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ExpandMovies', {
                  upcommingMoviesData: indian,
                });
              }}
              style={{
                flexDirection: 'row',
                marginRight: 10,
              }}>
              <Text style={smalltext}>More</Text>
            </TouchableOpacity>
          </View>
          <View style={{height: 180, marginTop: 10, marginBottom: 60}}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={indian}
              renderItem={MoviesView}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TvShowes;

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
