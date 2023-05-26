import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
const back = ['rgba(0,0,0,0)', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.9)'];
const Movies = [
  {
    id: 1,
    name: 'Krish',
    Image:
      'https://media.comicbook.com/2017/10/iron-man-movie-poster-marvel-cinematic-universe-1038878.jpg',
  },
  {
    id: 2,
    name: 'Krish',
    Image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZlk3SnJbs7RR2-tbuPD7P0mYRzuwHt_LGFcA0j0uCHA&s',
  },
  {
    id: 3,
    name: 'Krish',
    Image:
      'https://bollywoodmovieposters.com/wp-content/uploads/2021/02/shahrukh-khan-film-poster-chennai-express.jpg',
  },
  {
    id: 4,
    name: 'Krish',
    Image:
      'https://media.comicbook.com/2017/10/iron-man-movie-poster-marvel-cinematic-universe-1038878.jpg',
  },
  {
    id: 5,
    name: 'Krish',
    Image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRShaCrkUtI3vvauPwvNXYsJ3PIFU276-HQtsrFymxHlQ&s',
  },
  {
    id: 6,
    name: 'Krish',
    Image:
      'https://media.comicbook.com/2017/10/iron-man-movie-poster-marvel-cinematic-universe-1038878.jpg',
  },
];
const Dashboard = () => {
  const MoviesView = ({item}) => (
    <View
      style={{
        backgroundColor: 'white',

        width: 160,
        marginHorizontal: 10,
        borderRadius: 10,
        overflow: 'hidden',
      }}>
      <Image
        style={{height: '100%', width: '100%'}}
        source={{uri: item.Image}}></Image>
    </View>
  );
  return (
    <View style={styles.container}>
      <Text style={styles.Heading}>Trending</Text>
      <FlatList horizontal data={Movies} renderItem={MoviesView} />
      <Text style={styles.Heading}>Popular</Text>

      <FlatList horizontal data={Movies} renderItem={MoviesView} />
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
