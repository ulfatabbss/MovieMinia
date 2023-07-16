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
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {setPlaylist} from '../redux/reducers/userReducers';
import {secondary} from '../utillis/colors';

const Playlist = ({navigation}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [deletedItems, setDramaSlider] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();

  const {playlist} = useSelector(state => state.root.user);
  // useEffect(() => {
  //   console.log(playlist, 'p');
  // }, []);
  const data = [
    {
      id: 0,
      uri: 'https://w0.peakpx.com/wallpaper/863/138/HD-wallpaper-mortal-engines-entertainment-film-hollywood-movie-people-poster-woman.jpg',
      name: 'movie1',
      duration: '1h 23m',
    },
    {
      id: 1,
      uri: 'https://w0.peakpx.com/wallpaper/828/952/HD-wallpaper-aquaman-poster-jason-momoa-fantasy-movie-hollywood-underwater.jpg',
      name: 'movie2',
      duration: '1h 23m',
    },
    {
      id: 2,
      uri: 'https://w0.peakpx.com/wallpaper/911/788/HD-wallpaper-avatar-2-poster-avatar-2-fantasy-hollywood-blue-movie.jpg',
      name: 'movie3',
      duration: '1h 23m',
    },
    {
      id: 3,
      uri: 'https://w0.peakpx.com/wallpaper/196/795/HD-wallpaper-justice-league-sc-action-dc-hbo-hollywood-justice-league-movie-poster-warner-warner-bros.jpg',
      name: 'movie4',
      duration: '1h 23m',
    },
    {
      id: 4,
      uri: 'https://w0.peakpx.com/wallpaper/785/866/HD-wallpaper-x-men-entertainment-hollywood-movie-poster-thriller.jpg',
      name: 'movie1',
      duration: '1h 23m',
    },
    {
      id: 5,
      uri: 'https://w0.peakpx.com/wallpaper/902/32/HD-wallpaper-heimdall-thor-comics-holi-hollywood-idris-elba-marvel-marvel-cinematic-universe-marvel-comics-marvel-movies-movie-movie-poster-orange-poster-thor-ragnarok.jpg',
      name: 'movie1',
      duration: '1h 23m',
    },
    {
      id: 6,
      uri: 'https://w0.peakpx.com/wallpaper/225/482/HD-wallpaper-wonder-woman-1984-poster-2020-movies-hollywood-wonder-woman-wonder-woman-2-super-hero.jpg',
      name: 'movie1',
      duration: '1h 23m',
    },
  ];
  const filteredData = playlist.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const PlayMovie = item => {
    console.log('Movie is Played', item);
  };
  // const DeleteMovie = item => {
  //   setDeletedItems(prevDeletedItems => [...prevDeletedItems, item.id]);

  //   // Remove the deleted item from the PlaylistData array
  //   setPlaylistData(prevPlaylistData =>
  //     prevPlaylistData.filter(dataItem => dataItem.id !== item.id),
  //   );
  // };

  const toggleModal = item => {
    setIsModalVisible(!isModalVisible);
    setSelectedItem((item = item));
  };
  const handleDeleteConfirm = () => {
    let clonedArray = JSON.parse(JSON.stringify(playlist));
    clonedArray.splice(selectedItem, 1);

    dispatch(setPlaylist(clonedArray));
    // DeleteMovie(selectedItem);
    setIsModalVisible(false);
    ToastAndroid.showWithGravity(
      'remove from list',
      ToastAndroid.LONG,
      ToastAndroid.CENTER,
    );
  };

  // const PlaylistData = playlist;
  const MyPlaylist = item => {
    console.log(item.item.poster[0].image, 'item');
    // if (deletedItems.includes(item.item.id)) {
    //   return null; // Skip rendering the deleted item
    // }

    return (
      <View style={styles.cards}>
        <Image
          style={{
            height: '100%',
            width: '30%',
            borderBottomLeftRadius: 10,
            borderTopLeftRadius: 10,
          }}
          source={{uri: item?.item?.poster[0]?.image}}
          resizeMode={'contain'}
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
            <Text style={{color: 'rgba(255,0,0,0.5)', fontSize: 10}}>
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
            <Text style={{color: 'rgba(255,0,0,0.5)', fontSize: 10}}>
              Duration :
            </Text>
            <Text style={styles.h3}>{item.item.duration}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              zIndex: 5,
              overflow: 'hidden',
              borderColor: 'pink',
            }}>
            <Text style={{color: 'rgba(255,0,0,0.5)', fontSize: 10}}>
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
            onPress={() => navigation.navigate('Player', {url: item.item.url})}>
            <Image
              style={[styles.icons, {alignSelf: 'baseline'}]}
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
        {/* <View style={styles.assets_Container}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Player', {url: item.item.url})}>
            <Image
              style={styles.icons}
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
        </View> */}
      </View>
    );
  };
  const window_Width = Dimensions.get('window').width;
  const window_Height = Dimensions.get('window').height;
  // useEffect(() => {
  //   console.log(playlist, 'myPlaylist');
  // }, []);
  return (
    <View style={{flex: 1, backgroundColor: secondary}}>
      <View
        style={{
          marginTop: StatusBar.currentHeight,
          flex: 1,
          paddingBottom: 10,
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
            style={[styles.icons, {tintColor: 'gray'}]}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/9479/9479251.png',
            }}
          />
        </View>
        <View style={{flex: 1}}>
          <FlatList
            data={filteredData}
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
                  {backgroundColor: 'green', borderTopRightRadius: 10},
                ]}
                onPress={() => setIsModalVisible(!isModalVisible)}>
                <Text style={styles.textStyle}>No</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.button,
                  {backgroundColor: 'red', borderTopLeftRadius: 10},
                ]}
                onPress={handleDeleteConfirm}>
                <Text style={styles.textStyle}>Yes</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Playlist;

const styles = StyleSheet.create({
  main_View: {flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', padding: 20},
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
  },
  h2: {color: '#fff', fontSize: 12, marginVertical: 5},
  h1: {color: '#fff', fontSize: 18},
  icons: {height: 20, width: 20},
  input_Container: {
    height: 50,
    marginVertical: 10,
    paddingHorizontal: 5,
    width: '98%',
    borderWidth: 0.2,
    borderColor: 'red',
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
