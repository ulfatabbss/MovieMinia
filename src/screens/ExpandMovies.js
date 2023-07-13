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
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {MovieView} from '../utillis/styles';

const ExpandMovies = ({route, navigation}) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [deletedItems, setDeletedItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const {popularMoviesData, upcommingMoviesData} = route.params;

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
  const filteredData = data.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const PlayMovie = item => {
    console.log('Movie is Played', item);
  };
  const DeleteMovie = item => {
    setDeletedItems(prevDeletedItems => [...prevDeletedItems, item.id]);
  };

  const toggleModal = item => {
    setIsModalVisible(!isModalVisible);
    setSelectedItem((item = item));
  };
  const handleDeleteConfirm = () => {
    setDeletedItems(prevDeletedItems => [...prevDeletedItems, selectedItem.id]);
    setIsModalVisible(false);
  };
  const Playlist = ({item}) => {
    if (deletedItems.includes(item.id)) {
      return null;
    }
    return (
      <View style={styles.cards}>
        <Image
          style={{height: '100%', width: '30%'}}
          source={{uri: item.uri}}
        />
        <View style={styles.details_View}>
          <Text style={[styles.h2]}>{item.name}</Text>
          <Text style={[styles.h2, {marginTop: 10}]}>{item.duration}</Text>
        </View>
        <View style={styles.assets_Container}>
          <TouchableOpacity onPress={() => PlayMovie((item = item))}>
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
        </View>
      </View>
    );
  };
  const MoviesView = ({item, data}) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('MovieDiscription', {
          item: item,
          data: data,
          type: 'Movies',
        })
      }
      style={[MovieView, {height: 100, width: 90, margin: 5}]}>
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
            backgroundColor: 'rgba(0,0,0,0.9)',
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
              fontSize: 12,
              fontFamily: 'BebasNeue-Regular',
            }}>
            {item.title}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
  const window_Width = Dimensions.get('window').width;
  const window_Height = Dimensions.get('window').height;
  return (
    <ImageBackground
      style={{
        height: window_Height,
        width: window_Width,
      }}
      source={{
        uri: 'https://w0.peakpx.com/wallpaper/863/138/HD-wallpaper-mortal-engines-entertainment-film-hollywood-movie-people-poster-woman.jpg',
      }}>
      <View style={styles.main_View}>
        <Text style={styles.h1}>Playlist</Text>
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
          />
          <Image
            style={[styles.icons, {tintColor: '#fff'}]}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/9479/9479251.png',
            }}
          />
        </View>

        <View style={{alignItems: 'center'}}>
          <FlatList
            numColumns={3}
            data={upcommingMoviesData.filter(item =>
              item.title.toLowerCase().includes(searchQuery.toLowerCase()),
            )}
            renderItem={({item}) =>
              MoviesView({item: item, data: popularMoviesData})
            }
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setIsModalVisible(!isModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Are you sure to delete movie </Text>
            <View
              style={{
                flexDirection: 'row',
                height: '40%',
                alignSelf: 'flex-end',
                width: '100%',
                justifyContent: 'space-between',
              }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setIsModalVisible(!isModalVisible)}>
                <Text style={styles.textStyle}>No</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={handleDeleteConfirm}>
                <Text style={styles.textStyle}>Yes</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
};

export default ExpandMovies;

const styles = StyleSheet.create({
  main_View: {flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', padding: 20},
  cards: {
    height: 100,
    width: '100%',
    borderWidth: 1,
    flexDirection: 'row',
    marginTop: 10,
    borderColor: '#fff',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'space-between',
  },
  h2: {color: '#fff', fontSize: 14},
  h1: {color: '#fff', fontSize: 18},
  icons: {height: 25, width: 25},
  input_Container: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    justifyContent: 'space-around',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  assets_Container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
    width: '25%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    alignItems: 'center',
  },
  modalView: {
    height: 80,
    width: '60%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  button: {
    width: '40%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    marginTop: 5,
    color: '#000',
    fontWeight: '600',
    textAlign: 'center',
  },
  details_View: {
    height: '60%',
    alignSelf: 'flex-end',
    width: '35%',
    paddingLeft: 20,
  },
});
