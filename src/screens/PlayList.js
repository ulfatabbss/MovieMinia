import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  Pressable,
  Modal,
  StatusBar,
  Alert,
  ToastAndroid,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaylist } from '../redux/reducers/userReducers';
import { secondary } from '../utillis/colors';
import LottieView from 'lottie-react-native';
import { DellfromPlaylist, GetPlaylist } from '../services/AppServices';
import { useFocusEffect } from '@react-navigation/native';
import Loader from '../components/Loader';
import { useToast } from "react-native-toast-notifications";

const Playlist = ({ navigation }) => {
  const Toast = useToast();

  const [myplaylist, setMyplaylist] = useState('');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [sortedPlaylist, setSortedPlaylist] = useState([]);
  const { user } = useSelector(state => state.root.user);
  const [isLoading, setIsLoading] = useState(false)


  const filteredData = sortedPlaylist.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  useFocusEffect(
    React.useCallback(() => {
      HandlePlaylist();
    }, [])
  );

  const HandlePlaylist = async () => {
    setIsLoading(true);
    const obj = {
      userId: user._id
    };
    await GetPlaylist(obj)
      .then(({ data }) => {
        setMyplaylist(data); // Set the myplaylist state with the data
      })
      .catch(err => {
        console.log(err, 'errors');
      });
    setIsLoading(false);
  };
  const toggleModal = item => {
    setIsModalVisible(!isModalVisible);
    setSelectedItem((item = item));
  };
  const handleDeleteConfirm = async () => {
    setIsLoading(true)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      "userId": user._id
    });

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    await fetch(`https://giant-eel-panama-hat.cyclic.app/moveminia/playlists/${myplaylist[0]._id}/movies/${selectedItem.item._id}`, requestOptions)
      .then(responce => {
        HandlePlaylist();
        Toast.show("⭐ Successfully remove from playlist......!", {
          type: "success",
          placement: "top",
          duration: 3000,
          offset: 30,
          animationType: "zoom-in",
        });
        setIsModalVisible(false);
        setIsLoading(false)
      })
      .catch(error => {
        Toast.show(error, {
          type: "error",
          placement: "top",
          duration: 3000,
          offset: 30,
          animationType: "zoom-in",
        });
      });
    await HandlePlaylist();
    setIsModalVisible(false);
    setIsLoading(false)
  };
  const MyPlaylist = item => {
    return (
      <View style={styles.cards}>
        <Image
          style={{
            height: '100%',
            width: '30%',
            borderBottomLeftRadius: 10,
            borderTopLeftRadius: 10,
          }}
          source={{ uri: item?.item?.poster[0]?.image }}
        />

        <View style={styles.details_View}>
          <Text style={styles.h2} numberOfLines={1}>
            {item.item.title}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              borderColor: 'pink',
            }}>
            <Text style={{ color: 'rgba(255,0,0,1)', fontSize: 10 }}>
              Genre :
            </Text>
            <Text style={styles.h3}>{item.item.genre}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              overflow: 'hidden',
              zIndex: 1,
              borderColor: 'pink',
            }}>
            <Text style={{ color: 'rgba(255,0,0,1)', fontSize: 10 }}>
              Director :
            </Text>
            <Text style={styles.h3}>{item.item.director}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              width: '100%',
              overflow: 'hidden',
              zIndex: 1,
              borderColor: 'pink',
            }}>
            <Text style={{ color: 'rgba(255,0,0,1)', fontSize: 10 }}>
              Release Year :
            </Text>
            <Text style={styles.h3}>{item.item.releaseYear}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              zIndex: 5,
              overflow: 'hidden',
              borderColor: 'pink',
            }}>
            <Text style={{ color: 'rgba(255,0,0,1)', fontSize: 10 }}>
              Category :
            </Text>
            <Text style={styles.h3}>{item.item.category}</Text>
          </View>
          {/* <Text style={styles.h2}>{item.item.duration}</Text> */}
        </View>

        <View
          style={{
            width: 100,
            position: 'absolute',
            right: 0,
            bottom: 5,
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-evenly',
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Player1', { url: item.item.url })}>
            <Image
              style={[styles.icons, { alignSelf: 'baseline' }]}
              resizeMode={'contain'}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/1709/1709973.png',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleModal((item = item))}>
            <Image
              style={styles.icons}
              resizeMode={'contain'}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/6460/6460112.png',
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  if (myplaylist[0]?.movies?.length == 0 || user.email == 'guest@example.com') {
    return (
      <View style={{ flex: 1, backgroundColor: secondary, }}>
        <View style={styles.input_Container}>
          <TextInput
            style={{
              height: '100%',
              width: '80%',
              color: '#fff',
              borderColor: '#fff',
            }}
            autoCapitalize={'none'}
            onChangeText={text => setSearchQuery(text)}
            value={searchQuery}
            placeholder={'search'}
            placeholderTextColor={'gray'}
          />
          <Image
            style={[styles.icons, { tintColor: 'gray' }]}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/9479/9479251.png',
            }}
          />
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image style={{ height: 100, width: 100, tintColor: 'red' }} source={{ uri: 'https://cdn-icons-png.flaticon.com/128/10018/10018527.png' }} />
        </View>

      </View>
    )
  }

  if (isLoading) {
    return (
      <Loader />
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: secondary }}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <View
        style={{
          flex: 1,
          marginBottom: 80
        }}>
        <View style={styles.input_Container}>
          <TextInput
            style={{
              height: '100%',
              width: '80%',
              color: '#fff',
              borderColor: '#fff',
            }}
            autoCapitalize={'none'}
            onChangeText={text => setSearchQuery(text)}
            value={searchQuery}
            placeholder={'search'}
            placeholderTextColor={'gray'}
          />
          <Image
            style={[styles.icons, { tintColor: 'gray' }]}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/9479/9479251.png',
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <FlatList
            data={myplaylist[0]?.movies}
            renderItem={MyPlaylist}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setIsModalVisible(!isModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure to delete movie </Text>
            <View
              style={{
                flexDirection: 'row',
                height: '35%',
                width: '100%',
                position: 'absolute',
                bottom: 0,
                alignSelf: 'flex-end',
                borderColor: '#fff',
                justifyContent: 'space-between',
              }}>
              <Pressable
                style={[
                  styles.button,
                  { backgroundColor: 'green', borderTopRightRadius: 10 },
                ]}
                onPress={() => setIsModalVisible(!isModalVisible)}>
                <Text style={styles.textStyle}>No</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.button,
                  { backgroundColor: 'red', borderTopLeftRadius: 10 },
                ]}
                onPress={handleDeleteConfirm}>
                <Text style={styles.textStyle}>Yes</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Playlist;

const styles = StyleSheet.create({
  main_View: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', padding: 20 },
  cards: {
    height: 100,
    width: '95%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    borderRadius: 10,
    borderColor: '#fff',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderWidth: .5
  },
  h2: { color: '#fff', fontSize: 12, marginVertical: 5 },
  h1: { color: '#fff', fontSize: 18 },
  icons: { height: 20, width: 20 },
  input_Container: {
    height: 50,
    marginVertical: 10,
    paddingHorizontal: 5,
    width: '95%',
    borderWidth: 1, borderColor: '#fff',
    // borderColor: 'red',
    justifyContent: 'space-around',
    flexDirection: 'row',
    borderRadius: 10,
    alignSelf: 'center',
    alignItems: 'center',
  },
  assets_Container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
    alignItems: 'center',
  },
  modalView: {
    height: 100,
    width: '60%',
    borderRadius: 10,
    borderWidth: 0.4,
    borderColor: 'gray',
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
  button: {
    width: '45%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  h3: {
    color: 'gray',
    marginLeft: 5,
    fontSize: 8,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'red',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginTop: 15,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },
  details_View: {
    height: '100%',
    width: '68%',
  },
});
