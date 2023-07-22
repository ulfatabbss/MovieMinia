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
  SafeAreaView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Primary, black, gray, secondary, white } from '../utillis/colors';
import LinearGradient from 'react-native-linear-gradient';
import {
  h1,
  h2,
} from '../utillis/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaylist } from '../redux/reducers/userReducers';

const MovieDiscription = ({ navigation, route }) => {
  const { playlist } = useSelector(state => state.root.user);
  // console.log('ddd........', playlist);

  const [playlistAdded, setPlaylistAdded] = useState(false);
  const { item, data, type } = route.params;
  const CastView = ({ item }) => (
    <View
      style={{
        backgroundColor: 'rgba(0,0,0,0.5)',
        height: 150,
        width: Dimensions.get('window').width / 3 - 10,

        borderRadius: 10,
        alignItems: 'center'
      }}>
      <Image
        resizeMode="cover"
        style={{ height: '60%', width: '60%', borderRadius: 100, marginTop: 5, borderWidth: 2, borderColor: 'white' }}
        source={{ uri: item.image }}
      />
      <Text numbersofline={1} style={[h1, { color: 'white', marginTop: 5 }]}>
        {item.name}
      </Text>
    </View>
  );
  const dispatch = useDispatch();
  const AddPlaylist = () => {
    let clonedArray = JSON.parse(JSON.stringify(playlist));
    clonedArray.push(item);
    dispatch(setPlaylist(clonedArray));
  };
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
    <SafeAreaView style={{ flex: 1 }}>
      {Platform.OS === 'ios' &&
        <View style={{
          width: "100%",
          height: 100, // For all devices, even X, XS Max
          position: 'absolute',
          top: 0,
          left: 0,
          backgroundColor: "#000"
        }}
        />}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />
        <View style={{ paddingBottom: 40 }}>
          <View style={styles.mainCard}>
            <ImageBackground
              resizeMode="stretch"
              style={{
                width: Dimensions.get('window').width,
                height: 330,
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
                  'rgba(0,0,0,0)',
                  'rgba(0,0,0,0))',
                  'rgba(0,0,0,0))',
                  'rgba(0,0,0,0.5)',
                  'rgba(0,0,0,1)',
                ]}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Image resizeMode='contain' source={require('../assets/backf.png')} style={{ height: 30, width: 40, marginTop: 50, marginLeft: 20 }} />
                </TouchableOpacity>
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
              <View
                style={{ height: 40, width: 60, backgroundColor: 'green', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}

              >
                <Image style={{ height: 25, width: 25, tintColor: 'white' }} source={{ uri: "https://img.icons8.com/?size=512&id=9978&format=png" }} />

              </View>
            </TouchableOpacity>
          </View>
          <Text style={[h1, { fontSize: 22 }]}>{item.title}</Text>
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
                    { color: 'green', marginRight: 10, fontWeight: '800' },
                  ]}>
                  3 84% match
                </Text>
                <Text style={[h2, { marginRight: 10 }]}>{item.releaseYear}</Text>
                <Text style={[h2, { marginRight: 10 }]}>{item.duration}</Text>
              </View>

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
            <Text style={[h1, { fontSize: 20 }]}>Cast</Text>
          </View>
          <FlatList
            numColumns={'3'}
            data={item.cast}
            showsVerticalScrollIndicator={false}
            renderItem={CastView}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
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
    zIndex: 1,
    alignSelf: 'center',
  },
  overViewDetail: {
    width: '100%',
    paddingBottom: 10,
    marginTop: 10,
    paddingHorizontal: 10,
  },
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
