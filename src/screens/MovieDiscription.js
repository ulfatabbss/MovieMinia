import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  FlatList,
} from 'react-native';
import React from 'react';
import {Primary, black, gray, white} from '../utillis/colors';
import LinearGradient from 'react-native-linear-gradient';
import {h1, h2, h3, logoIcon, movieTitle} from '../utillis/styles';
export const Cast = [
  {
    id: 1,
    name: 'Krish',
    Image:
      'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/4D0PpNI0kmP58hgrwGC3wCjxhnm.jpg',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    detail:
      'When Walt Disney Pictures announced that The Little Mermaid would receive a live-action remake, many super fans worried that the studio would not be able to do the fairytale justice. The redhead mermaid, Ariel, the daughter of King Triton, has been beloved by viewers of all ages for her curiosity, innocence, and wonder. Finding the perfect actress to fill the mermaid’s tail was no small feat. However, Halle Bailey successfully swims into view with a bright voice worthy of the sea princess.',
  },
  {
    id: 2,
    name: 'John Wick: Chapter 4 (2023)',
    Image:
      'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/hTlhrrZMj8hZVvD17j4KyAFWBHc.jpg',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    detail:
      'With the price on his head ever increasing, John Wick uncovers a path to defeating The High Table.',
  },
  {
    id: 3,
    name: 'BatMan',
    Image:
      'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/cFQN6rLSSLhGx8NQI7krYWwdRpl.jpg',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    detail:
      'When Walt Disney Pictures announced that The Little Mermaid would receive a live-action remake, many super fans worried that the studio would not be able to do the fairytale justice. The redhead mermaid, Ariel, the daughter of King Triton, has been beloved by viewers of all ages for her curiosity, innocence, and wonder. Finding the perfect actress to fill the mermaid’s tail was no small feat. However, Halle Bailey successfully swims into view with a bright voice worthy of the sea princess.',
  },
  {
    id: 4,
    name: 'SherLock Homes',
    Image:
      'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/q9qKbux5Jo76Sj8g3luxBt6rYtz.jpg',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
    detail:
      'When Walt Disney Pictures announced that The Little Mermaid would receive a live-action remake, many super fans worried that the studio would not be able to do the fairytale justice. The redhead mermaid, Ariel, the daughter of King Triton, has been beloved by viewers of all ages for her curiosity, innocence, and wonder. Finding the perfect actress to fill the mermaid’s tail was no small feat. However, Halle Bailey successfully swims into view with a bright voice worthy of the sea princess.',
  },
  {
    id: 5,
    name: 'Fast & Furrios X',
    Image:
      'https://www.themoviedb.org/t/p/w138_and_h175_face/6XLANVi8CtFaxf1KL3LDZDiW07J.jpg',
    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    detail:
      'When Walt Disney Pictures announced that The Little Mermaid would receive a live-action remake, many super fans worried that the studio would not be able to do the fairytale justice. The redhead mermaid, Ariel, the daughter of King Triton, has been beloved by viewers of all ages for her curiosity, innocence, and wonder. Finding the perfect actress to fill the mermaid’s tail was no small feat. However, Halle Bailey successfully swims into view with a bright voice worthy of the sea princess.',
  },
];
const MovieDiscription = ({navigation, route}) => {
  const {url, thumbnail, detail, name} = route.params;
  const CastView = ({item}) => (
    <View
      style={{
        backgroundColor: white,
        height: 160,
        width: 140,
        marginHorizontal: 10,
        borderRadius: 10,
        overflow: 'hidden',
      }}>
      <Image
        resizeMode="cover"
        style={{height: '100%', width: '100%'}}
        source={{uri: item.Image}}></Image>
    </View>
  );
  const back = ['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.7)'];
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={{paddingBottom: 40}}>
        <View style={styles.mainCard}>
          <ImageBackground
          resizeMode='cover'
            style={{
              width: '100%',
              height: 330,
              borderBottomRightRadius: 25,
              borderBottomLeftRadius: 25,
              overflow: 'hidden',
            }}
            source={{
              uri: thumbnail,
            }}>
            <LinearGradient
              style={{
                height: 330,
                width: '100%',
                padding: 20,
                borderBottomRightRadius: 25,
                borderBottomLeftRadius: 25,
              }}
              colors={back}
              start={{x: 0, y: 4}}
              end={{x: 0, y: 2}}>
              <View style={styles.movieDetail}>
                <Image
                  resizeMode="contain"
                  source={require('../assets/logo.png')}
                  style={[logoIcon, {}]}
                />
                <Text style={movieTitle}>John Wick : Chapter 4</Text>
                <View style={{flexDirection: 'row'}}>
                  <View style={styles.TitleTxt}>
                    <Text style={styles.movieDetailTxt}>Action</Text>
                  </View>
                  <View style={styles.TitleTxt}>
                    <Text style={styles.movieDetailTxt}>Thriller</Text>
                  </View>
                  <View style={styles.TitleTxt}>
                    <Text style={styles.movieDetailTxt}>Crime</Text>
                  </View>
                </View>
              </View>
            </LinearGradient>
          </ImageBackground>
          <View style={styles.overviewCard}>
            <View style={{alignItems: 'center'}}>
              <Image
                style={{
                  height: 20,
                  width: 20,
                  marginBottom: 7,
                  tintColor: Primary,
                }}
                source={require('../assets/shared.png')}
              />
              <Text style={h3}>Share</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Image
                style={{
                  height: 20,
                  width: 20,
                  marginBottom: 7,
                  tintColor: Primary,
                }}
                source={require('../assets/liked.png')}
              />
              <Text style={h3}>Like</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Player', {
                    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                  });
                }}
                style={{}}>
                <Image
                  style={{
                    height: 20,
                    width: 20,
                    marginBottom: 7,
                    tintColor: Primary,
                  }}
                  source={require('../assets/play2.png')}
                />
              </TouchableOpacity>
              <Text style={h3}>Play</Text>
            </View>
            <View style={{alignItems: 'center'}}>
              <Image
                style={{
                  height: 20,
                  width: 20,
                  marginBottom: 7,
                  tintColor: Primary,
                }}
                source={require('../assets/download.png')}
              />
              <Text style={h3}>Download</Text>
            </View>
          </View>
        </View>
        <View style={styles.overViewDetail}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={[
                h2,
                {color: 'green', marginRight: 10, fontWeight: '800'},
              ]}>
              84% match
            </Text>
            <Text style={[h2, {marginRight: 10}]}>2018</Text>
            <Text style={[h2, {marginRight: 10}]}>1h 34m</Text>
          </View>
          <Text
            style={[
              h2,
              {
                marginRight: 10,
                marginTop: 10,
                borderBottomWidth: 1,
                paddingBottom: 15,
                borderColor: 'gray',
              },
            ]}>
            {detail}
          </Text>
        </View>
        <View style={{paddingHorizontal: 10}}>
          <View
            style={{
              borderBottomWidth: 1,
              paddingBottom: 15,
              borderColor: 'gray',
              marginBottom: 15,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 10,
              }}>
              <Text style={[h1, {}]}>Cast & Crew</Text>
              {/* <TouchableOpacity>
                <Text style={[h2, {color: Primary}]}>See All</Text>
              </TouchableOpacity> */}
            </View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={Cast}
              renderItem={CastView}
            />
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              paddingBottom: 15,
              borderColor: 'gray',
              marginTop: 15,
              flexDirection: 'row',
              width: '100%',
            }}>
            <Image
              resizeMode="cover"
              style={{height: 180, width: 150, borderRadius: 10}}
              source={{
                uri: 'https://www.themoviedb.org/t/p/w300_and_h450_bestv2/eRCryGwKDH4XqUlrdkERmeBWPo8.jpg',
              }}
            />
            <View
              style={{
                marginLeft: 10,
                justifyContent: 'space-evenly',
                width: '55%',
              }}>
              <Text style={[h1, {fontWeight: 'normal'}]}>Director</Text>
              <Text style={[h2, {fontWeight: 'normal'}]}>
                Chad Stahelski is an American stuntman and film director. He is
                known for directing 2014 film John Wick along with David Leitch,
                and for doubling Brandon Lee after the fatal accident involving.
              </Text>
              <Text style={[h2, {fontWeight: 'normal', color: Primary}]}>
                Know more
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default MovieDiscription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: gray,
    
  },
  mainCard: {
    width: '100%',
    flexDirection: 'row',
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  TitleTxt: {
    paddingHorizontal: 7,
    paddingVertical: 4,
    backgroundColor: gray,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 7,
    marginRight: 7,
  },
  movieDetail: {
    width: '100%',
    position: 'absolute',
    bottom: 50,
    start: 20,
  },
  movieDetailTxt: {
    color: white,
    fontSize: 14,
    fontWeight: '600',
  },
  overviewCard: {
    backgroundColor: gray,
    width: '100%',
    paddingTop: 10,
    paddingBottom: 7,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '70%',
    position: 'absolute',
    top: '90%',
    left: '15%',
    zIndex: 1,
  },
  overViewDetail: {
    width: '100%',
    paddingBottom: 10,
    marginTop: 50,
    paddingHorizontal: 10,
  },
  // overviewCardTitle: {
  //   width: '100%',
  //   height: 35,
  //   borderColor: 'gray',
  //   // borderBottomWidth: 1,
  //   // justifyContent: 'center',
  //   // paddingLeft: 10,
  // },
  h1: {
    fontSize: 16,
    color: 'white',
    fontWeight: '800',
    marginVertical: 10,
  },
  h2: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
  },
  h3: {
    fontSize: 14,
    color: 'lightgray',
    marginTop: 10,
    // textAlign: 'justify',
    width: '100%',
  },
});
