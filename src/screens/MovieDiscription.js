import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  FlatList,
  StatusBar,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Primary, black, gray, secondary, white} from '../utillis/colors';
import LinearGradient from 'react-native-linear-gradient';
import {
  Heading,
  h1,
  h2,
  h3,
  logoIcon,
  movieTitle,
  smalltext,
} from '../utillis/styles';
import {useDispatch, useSelector} from 'react-redux';
import {setPlaylist} from '../redux/reducers/userReducers';
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
  const {playlist} = useSelector(state => state.root.user);
  // console.log('ddd........', playlist);

  const [playlistAdded, setPlaylistAdded] = useState(false);
  const {item, data, type} = route.params;
  const CastView = ({item}) => (
    <View
      style={{
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: 150,
        width: Dimensions.get('window').width / 3 - 10,
        marginHorizontal: 5,
        borderRadius: 10,
        alignItems: 'center',
      }}>
      <Image
        resizeMode="cover"
        style={{height: 100, width: 100, borderRadius: 50, marginTop: 10}}
        source={{uri: item.image}}
      />
      <Text numbersofline={1} style={[h1, {color: 'white', marginTop: 5}]}>
        {item.name}
      </Text>
    </View>
  );
  // useEffect(() => {
  //   console.log('my props item', item);
  // }, []);
  const dispatch = useDispatch();
  const AddPlaylist = () => {
    let clonedArray = JSON.parse(JSON.stringify(playlist));
    clonedArray.push(item);
    dispatch(setPlaylist(clonedArray));
  };
  const back = ['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.7)'];
  const handleCheck = () => {
    const result = playlist?.some(i => i?.title === item?.title);
    if (result) {
      setPlaylistAdded(true);
      console.log('added');
    } else {
      setPlaylistAdded(false);
    }
  };
  useEffect(() => {
    handleCheck();
  }, [playlist]);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={{paddingBottom: 40}}>
        <View style={styles.mainCard}>
          <ImageBackground
            resizeMode="stretch"
            style={{
              width: Dimensions.get('window').width,
              height: 330,
              // borderBottomRightRadius: 25,
              // borderBottomLeftRadius: 25,
              overflow: 'hidden',
            }}
            source={{
              uri: item.poster[0].image,
            }}>
            <LinearGradient
              style={{
                height: 330,
                width: '100%',
              }}
              colors={[
                'rgba(0,0,0,0.5)',
                'rgba(0,0,0,0.7))',
                'rgba(0,0,0,0.5)',
                'rgba(0,0,0,1)',
              ]}>
              <View style={styles.movieDetail}>
                {/* <Image
                  resizeMode="contain"
                  source={require('../assets/logo.png')}
                  style={logoIcon}
                /> */}

                {/* <View style={{flexDirection: 'row'}}>
                  <View style={styles.TitleTxt}>
                    <Text style={styles.movieDetailTxt}>Action</Text>
                  </View>
                  <View style={styles.TitleTxt}>
                    <Text style={styles.movieDetailTxt}>Thriller</Text>
                  </View>
                  <View style={styles.TitleTxt}>
                    <Text style={styles.movieDetailTxt}>Crime</Text>
                  </View>
                </View> */}
              </View>
            </LinearGradient>
          </ImageBackground>
          <TouchableOpacity
            style={styles.overviewCard}
            onPress={() => {
              navigation.navigate('Player', {
                url: type == 'Drama' ? item.episods[0].url : item.url,
                data: data,
                type: type,
              });
            }}>
            <Image
              style={{height: 60, width: 60}}
              source={require('../assets/play.png')}
            />
            {/* <Text style={Heading}>Play Now</Text> */}
            {/* <View style={{alignItems: 'center'}}>
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
                    url: type == 'Drama' ? item.episods[0].url : item.url,
                    data: data,
                    type: type,
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
            </View> */}
          </TouchableOpacity>
        </View>
        <Text style={[h1, {fontSize: 22}]}>{item.title}</Text>
        <View style={styles.overViewDetail}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingRight: 30,
              width: '100%',
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text
                style={[
                  h2,
                  {color: 'green', marginRight: 10, fontWeight: '800'},
                ]}>
                3 84% match
              </Text>
              <Text style={[h2, {marginRight: 10}]}>{item.releaseYear}</Text>
              <Text style={[h2, {marginRight: 10}]}>{item.duration}</Text>
            </View>
            {/* Playlist_Button Here */}
            <View
              style={{
                flexDirection: 'row',
                borderWidth: playlistAdded ? 0.2 : 0,
                padding: 2,
                borderColor: 'gray',
              }}>
              {playlistAdded ? (
                <Text
                  numberOfLines={2}
                  style={{
                    color: 'green',
                    fontSize: 12,
                    fontWeight: 'bold',
                  }}>
                  Added in Playlist
                </Text>
              ) : (
                <TouchableOpacity
                  disabled={playlistAdded}
                  onPress={() => {
                    AddPlaylist(item);
                  }}>
                  <Image
                    style={{
                      height: 25,
                      width: 25,
                      tintColor: playlistAdded ? 'green' : null,
                    }}
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/128/7719/7719900.png',
                    }}
                  />
                </TouchableOpacity>
              )}
            </View>
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
            {item.overView}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <Text style={[h1, {fontSize: 20}]}>Cast</Text>
          {/* <TouchableOpacity>
                <Text style={[h2, {color: Primary}]}>See All</Text>
              </TouchableOpacity> */}
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={item.cast}
          renderItem={CastView}
        />

        {/* <View
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
              style={{ height: 180, width: 150, borderRadius: 10 }}
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
              <Text style={[h1, { fontWeight: 'normal' }]}>Director</Text>
              <Text style={[h2, { fontWeight: 'normal' }]}>
                Chad Stahelski is an American stuntman and film director. He is
                known for directing 2014 film John Wick along with David Leitch,
                and for doubling Brandon Lee after the fatal accident involving.
              </Text>
              <Text style={[h2, { fontWeight: 'normal', color: Primary }]}>
                Know more
              </Text>
            </View>
          </View> */}
      </View>
    </ScrollView>
  );
};

export default MovieDiscription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
    backgroundColor: secondary,
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
    width: 60,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    // left: '15%',
    zIndex: 1,
    elevation: 5,
    alignSelf: 'center',
    // shadowColor: 'white',
  },
  overViewDetail: {
    width: '100%',
    paddingBottom: 10,
    marginTop: 10,
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
    marginHorizontal: 12,
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
