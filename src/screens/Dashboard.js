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
const back = ['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.7)'];
export const Movies = [
  {
    id: 1,
    name: 'Krish',
    Image:
      'https://media.comicbook.com/2017/10/iron-man-movie-poster-marvel-cinematic-universe-1038878.jpg',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    detail:
      'When Walt Disney Pictures announced that The Little Mermaid would receive a live-action remake, many super fans worried that the studio would not be able to do the fairytale justice. The redhead mermaid, Ariel, the daughter of King Triton, has been beloved by viewers of all ages for her curiosity, innocence, and wonder. Finding the perfect actress to fill the mermaid’s tail was no small feat. However, Halle Bailey successfully swims into view with a bright voice worthy of the sea princess.',
  },
  {
    id: 2,
    name: 'Jocker',
    Image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZlk3SnJbs7RR2-tbuPD7P0mYRzuwHt_LGFcA0j0uCHA&s',
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
const Dashboard = ({navigation}) => {
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
      <ScrollView>
        <View style={{height: 450}}>
          <ImageBackground
            style={{
              height: '100%',
              width: '100%',
            }}
            source={{
              uri: 'https://w0.peakpx.com/wallpaper/902/32/HD-wallpaper-heimdall-thor-comics-holi-hollywood-idris-elba-marvel-marvel-cinematic-universe-marvel-comics-marvel-movies-movie-movie-poster-orange-poster-thor-ragnarok.jpg',
            }}>
            <Header />
            <LinearGradient
              style={{
                height: '100%',
                width: '100%',
                position: 'absolute',
                justifyContent: 'flex-end',
                padding: 10,
                alignItems: 'center',
              }}
              colors={back}
              start={{x: 0, y: 0.1}}
              end={{x: 0, y: 0.9}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Player', {
                    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                  });
                }}
                style={{
                  flexDirection: 'row',
                  height: 36,
                  width: 120,
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
              <Text
                style={{color: 'gray', fontSize: 10, marginTop: 5}}
                numberOfLines={1}
                ellipsizeMode="clip">
                Thor Ragmarok by MARVEL STUDIOS
              </Text>
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

export default Dashboard;

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
