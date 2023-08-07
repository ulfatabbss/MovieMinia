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
import { useSelector } from 'react-redux';
import LottieView from 'lottie-react-native';
import { Addtoplaylist, GetPlaylist } from '../services/AppServices';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../components/Loader';
import { setIsLogin } from '../redux/reducers/userReducers';
import { store } from '../redux/store';
import { useToast } from "react-native-toast-notifications";
const MovieDiscription = ({ navigation, route }) => {
  const Toast = useToast();
  const { user } = useSelector(state => state.root.user);
  const [playlistAdded, setPlaylistAdded] = useState(false);
  const { item, data, type } = route.params;
  const [isLoading, setIsLoading] = useState(false)
  const [ischeck, setIsCheck] = useState(false)
  const HandlePlaylist = async () => {
    setIsCheck(true);
    const obj = {
      movieIds: [item._id],
      userId: user._id
    }
    const obj1 = {
      userId: user._id
    };
    try {
      await Addtoplaylist(obj)
      Toast.show(" ⭐ Successfully add to playlist......!", {
        type: "success",
        placement: "top",
        duration: 3000,
        offset: 30,
        animationType: "zoom-in",
      });
      setPlaylistAdded(true);
    } catch (error) {
      Toast.show("🚧 Check your internet connection......!", {
        type: "error",
        placement: "top",
        duration: 3000,
        offset: 30,
        animationType: "zoom-in",
      });
    } finally {
      setIsLoading(false);
      setIsCheck(false)
    }
  };
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
        source={{ uri: item?.image }}
      />
      <Text numbersofline={1} style={[h1, { color: 'white', marginTop: 5 }]}>
        {item?.name}
      </Text>
    </View>
  );
  const CheckPlaylist = async () => {
    setIsLoading(true);
    const obj = {
      userId: user._id
    };
    await GetPlaylist(obj)
      .then(({ data }) => {
        const movies = data[0]?.movies || [];
        const isMovieInPlaylist = movies.some((movie) => movie._id === item._id);
        setPlaylistAdded(isMovieInPlaylist);
      })
      .catch(err => {
        console.log(err, 'errors');
      });
    setIsLoading(false);
  };
  useFocusEffect(
    React.useCallback(() => {
      CheckPlaylist();
    }, [])
  );
  if (isLoading) {
    return (
      <Loader />
    );
  }
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
        <StatusBar />
        <View style={{ paddingBottom: 40 }}>
          <View style={styles.mainCard}>
            <ImageBackground

              style={{
                width: Dimensions.get('window').width,
                height: 330,
                overflow: 'hidden',
              }}
              source={{
                uri: item?.poster[1] ? item.poster[1].image : item?.poster[0]?.image,
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
                <TouchableOpacity onPress={() => navigation.goBack()} style={{
                  height: 30, width: 30, marginTop: 15, marginLeft: 15, backgroundColor: 'rgba(255,255,255,.6)', borderRadius: 15, padding: 5
                }}>
                  <Image resizeMode='contain' source={{ uri: 'https://img.icons8.com/?size=2x&id=79023&format=png' }} style={{ height: "100%", width: "100%", tintColor: 'black' }} />
                </TouchableOpacity>
              </LinearGradient>
            </ImageBackground>
            <TouchableOpacity
              style={styles.overviewCard}
              onPress={() => {
                navigation.navigate('Player', {
                  url: type == 'show' ? item.episods[0].url : item.url,
                  data: data,
                  type: type,
                  name: item.title
                });
              }}>
              <View
                style={{ height: 100, width: 100, justifyContent: 'center', alignItems: 'center' }}

              >
                <LottieView
                  source={require('../assets/animation_lksfc814.json')} autoPlay loop={false} />

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
                  flexDirection: 'row', alignItems: 'center'
                }}>
                <Image style={{ height: 15, width: 15, marginHorizontal: 5 }} source={{ uri: 'https://img.icons8.com/?size=2x&id=PwpEVWVt8I3F&format=png' }} />
                <Text style={[h2, { marginRight: 10 }]}>{item.releaseYear}</Text>
                <Image style={{ height: 15, width: 15, tintColor: 'green', marginHorizontal: 5 }} source={{ uri: 'https://img.icons8.com/?size=2x&id=10058&format=png' }} />
                <Text style={[h2, { marginRight: 10 }]}>{item.duration}</Text>
              </View>

              {ischeck &&
                <View style={{ height: 30, width: 30 }}>
                  <ActivityIndicator />
                </View>}
              {
                user.email == 'guest@example.com' &&
                <TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                  onPress={() => {
                    store.dispatch(setIsLogin(false))
                  }}>
                  <Text style={{ marginRight: 5, color: 'white' }}>Login</Text>
                  <Image
                    style={{
                      height: 20,
                      width: 20,
                      tintColor: 'green',
                    }}
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/128/5087/5087592.png',
                    }}
                  />
                </TouchableOpacity>
              }
              {ischeck == false && type != 'show' && user.email != 'guest@example.com' ?
                <TouchableOpacity
                  style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                  disabled={playlistAdded}
                  onPress={() => {
                    HandlePlaylist()
                  }}>
                  <Text style={{ marginRight: 5, color: 'white' }}>{playlistAdded ? 'Saved' : "Save to playlist"}</Text>
                  <Image
                    style={{
                      height: 20,
                      width: 20,
                      tintColor: playlistAdded ? 'red' : 'white',
                    }}
                    source={{
                      uri: 'https://cdn-icons-png.flaticon.com/128/9131/9131566.png',
                    }}
                  />
                </TouchableOpacity> : null}
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
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Text style={[h1, { alignSelf: 'flex-start', fontSize: 20 }]}>Cast</Text>

            <FlatList
              numColumns={'3'}
              data={item.cast}
              showsVerticalScrollIndicator={false}
              renderItem={CastView}
            />
          </View>
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
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25, overflow: 'hidden'
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
