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
import React from 'react';

import LinearGradient from 'react-native-linear-gradient';
import Header from '../components/Header';
import { black } from '../utillis/colors';
const back = ['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.7)'];
export const Movies = [
  {
    id: 1,
    name: 'Krish',
    Image:
      'https://yt3.googleusercontent.com/ytc/AGIKgqPHO6X3gYOJR6sgzSN6qHphX0e1ru5iYLn4bh6P=s900-c-k-c0x00ffffff-no-rj',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    detail:
      'When Walt Disney Pictures announced that The Little Mermaid would receive a live-action remake, many super fans worried that the studio would not be able to do the fairytale justice. The redhead mermaid, Ariel, the daughter of King Triton, has been beloved by viewers of all ages for her curiosity, innocence, and wonder. Finding the perfect actress to fill the mermaid’s tail was no small feat. However, Halle Bailey successfully swims into view with a bright voice worthy of the sea princess.',
  },
  {
    id: 2,
    name: 'Jocker',
    Image:
      'https://m.media-amazon.com/images/M/MV5BNTgzNWI1OWEtYWY2Ny00YmRiLTg0NDctMDA5ZWViNDQ4Nzk1XkEyXkFqcGdeQXVyMTI0NzY1MTg5._V1_FMjpg_UX1000_.jpg',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    detail:
      'When Walt Disney Pictures announced that The Little Mermaid would receive a live-action remake, many super fans worried that the studio would not be able to do the fairytale justice. The redhead mermaid, Ariel, the daughter of King Triton, has been beloved by viewers of all ages for her curiosity, innocence, and wonder. Finding the perfect actress to fill the mermaid’s tail was no small feat. However, Halle Bailey successfully swims into view with a bright voice worthy of the sea princess.',
  },
  {
    id: 3,
    name: 'BatMan',
    Image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRShaCrkUtI3vvauPwvNXYsJ3PIFU276-HQtsrFymxHlQ&s',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    detail:
      'When Walt Disney Pictures announced that The Little Mermaid would receive a live-action remake, many super fans worried that the studio would not be able to do the fairytale justice. The redhead mermaid, Ariel, the daughter of King Triton, has been beloved by viewers of all ages for her curiosity, innocence, and wonder. Finding the perfect actress to fill the mermaid’s tail was no small feat. However, Halle Bailey successfully swims into view with a bright voice worthy of the sea princess.',
  },
  {
    id: 4,
    name: 'SherLock Homes',
    Image:
      'https://media.comicbook.com/2017/10/iron-man-movie-poster-marvel-cinematic-universe-1038878.jpg',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    detail:
      'When Walt Disney Pictures announced that The Little Mermaid would receive a live-action remake, many super fans worried that the studio would not be able to do the fairytale justice. The redhead mermaid, Ariel, the daughter of King Triton, has been beloved by viewers of all ages for her curiosity, innocence, and wonder. Finding the perfect actress to fill the mermaid’s tail was no small feat. However, Halle Bailey successfully swims into view with a bright voice worthy of the sea princess.',
  },
  {
    id: 5,
    name: 'Fast & Furrios X',
    Image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRShaCrkUtI3vvauPwvNXYsJ3PIFU276-HQtsrFymxHlQ&s',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    detail:
      'When Walt Disney Pictures announced that The Little Mermaid would receive a live-action remake, many super fans worried that the studio would not be able to do the fairytale justice. The redhead mermaid, Ariel, the daughter of King Triton, has been beloved by viewers of all ages for her curiosity, innocence, and wonder. Finding the perfect actress to fill the mermaid’s tail was no small feat. However, Halle Bailey successfully swims into view with a bright voice worthy of the sea princess.',
  },
  {
    id: 6,
    name: 'Need for Speed',
    Image:
      'https://bollywoodmovieposters.com/wp-content/uploads/2021/02/shahrukh-khan-film-poster-chennai-express.jpg',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    detail:
      'When Walt Disney Pictures announced that The Little Mermaid would receive a live-action remake, many super fans worried that the studio would not be able to do the fairytale justice. The redhead mermaid, Ariel, the daughter of King Triton, has been beloved by viewers of all ages for her curiosity, innocence, and wonder. Finding the perfect actress to fill the mermaid’s tail was no small feat. However, Halle Bailey successfully swims into view with a bright voice worthy of the sea princess.',
  },
  {
    id: 7,
    name: 'Need for Speed',
    Image:
      'https://bollywoodmovieposters.com/wp-content/uploads/2021/02/shahrukh-khan-film-poster-chennai-express.jpg',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    detail:
      'When Walt Disney Pictures announced that The Little Mermaid would receive a live-action remake, many super fans worried that the studio would not be able to do the fairytale justice. The redhead mermaid, Ariel, the daughter of King Triton, has been beloved by viewers of all ages for her curiosity, innocence, and wonder. Finding the perfect actress to fill the mermaid’s tail was no small feat. However, Halle Bailey successfully swims into view with a bright voice worthy of the sea princess.',
  },
  {
    id: 8,
    name: 'Need for Speed',
    Image:
      'https://bollywoodmovieposters.com/wp-content/uploads/2021/02/shahrukh-khan-film-poster-chennai-express.jpg',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    detail:
      'When Walt Disney Pictures announced that The Little Mermaid would receive a live-action remake, many super fans worried that the studio would not be able to do the fairytale justice. The redhead mermaid, Ariel, the daughter of King Triton, has been beloved by viewers of all ages for her curiosity, innocence, and wonder. Finding the perfect actress to fill the mermaid’s tail was no small feat. However, Halle Bailey successfully swims into view with a bright voice worthy of the sea princess.',
  },
  {
    id: 9,
    name: 'Need for Speed',
    Image:
      'https://bollywoodmovieposters.com/wp-content/uploads/2021/02/shahrukh-khan-film-poster-chennai-express.jpg',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    detail:
      'When Walt Disney Pictures announced that The Little Mermaid would receive a live-action remake, many super fans worried that the studio would not be able to do the fairytale justice. The redhead mermaid, Ariel, the daughter of King Triton, has been beloved by viewers of all ages for her curiosity, innocence, and wonder. Finding the perfect actress to fill the mermaid’s tail was no small feat. However, Halle Bailey successfully swims into view with a bright voice worthy of the sea princess.',
  },
  {
    id: 10,
    name: 'Need for Speed',
    Image:
      'https://bollywoodmovieposters.com/wp-content/uploads/2021/02/shahrukh-khan-film-poster-chennai-express.jpg',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    detail:
      'When Walt Disney Pictures announced that The Little Mermaid would receive a live-action remake, many super fans worried that the studio would not be able to do the fairytale justice. The redhead mermaid, Ariel, the daughter of King Triton, has been beloved by viewers of all ages for her curiosity, innocence, and wonder. Finding the perfect actress to fill the mermaid’s tail was no small feat. However, Halle Bailey successfully swims into view with a bright voice worthy of the sea princess.',
  },
];
const TvShowes = ({navigation}) => {
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
        backgroundColor: 'white',
        height: 160,
        width: 140,
        marginHorizontal: 10,
        borderRadius: 10,
        overflow: 'hidden',
      }}>
      <Image
        style={{height: '100%', width: '100%'}}
        source={{uri: item.Image}}></Image>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{height: 450}}>
          <ImageBackground
            style={{
              height: '100%',
              width: '100%',
            }}
            source={{
              uri: 'https://yt3.googleusercontent.com/ytc/AGIKgqPHO6X3gYOJR6sgzSN6qHphX0e1ru5iYLn4bh6P=s900-c-k-c0x00ffffff-no-rj',
            }}>
            <LinearGradient
              style={{
                height: '100%',
                width: '100%',
                position: 'absolute',
                justifyContent: 'space-between',
                padding: 10,
                alignItems: 'center',
              }}
              colors={back}
              start={{x: 0, y: 0.1}}
              end={{x: 0, y: 0.9}}>
              <Header />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Player', {
                    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                  });
                }}
                style={{
                  flexDirection: 'row',
                  height: 36,
                  width: 100,
                  backgroundColor: 'lightgray',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                }}>
                <Image
                  style={{height: 30, width: 30}}
                  source={require('../assets/play.png')}></Image>
                <Text style={{color: black, fontSize:14, fontWeight: '600', marginStart: 5 }}>Play</Text>
              </TouchableOpacity>
            </LinearGradient>
          </ImageBackground>
        </View>
        <View style={{margin: 10}}>
          <Text style={styles.Heading}>Trending</Text>
          <FlatList horizontal data={Movies} renderItem={MoviesView} />
          <Text style={styles.Heading}>Popular</Text>

          <FlatList horizontal data={Movies} renderItem={MoviesView} />
          <Text style={styles.Heading}>Punjabi</Text>
          <FlatList horizontal data={Movies} renderItem={MoviesView} />
        </View>
      </ScrollView>
    </View>
  );
};

export default TvShowes;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
  Heading: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    margin: 20,
  },
});
