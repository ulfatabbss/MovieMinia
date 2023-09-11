import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  SafeAreaView,
  TouchableOpacity, Modal, Pressable, Dimensions
} from 'react-native';
import EmptyImage from '../../assets/emptyplaylist.png';
import PlayImage from '../../assets/play.png';
import TrashImage from '../../assets/dell.png';
import { DellfromPlaylist, GetPlaylist } from '../../services/AppServices';
import { useFocusEffect } from '@react-navigation/native';
import { useToast } from 'react-native-toast-notifications';
import Loader from '../../components/Loader';
import { Heading, SmallIcons, smalltext, text } from '../../utillis/styles';
import { useTheme } from 'react-native-paper';
import lightTheme from '../../utillis/theme/lightTheme';
import darkTheme from '../../utillis/theme/darkTheme';
import { searchIcon } from '../../assets';
import PlaylistSkelton from '../../components/ShimmerPlaceHolder/PlaylistSkelton';

const Playlist = ({ navigation }) => {
  const { myTheme, user, isGuest } = useSelector((state) => state.root.user);
  const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme);
  const Toast = useToast();
  const [myplaylist, setMyplaylist] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      HandlePlaylist();
    }, [])
  );
  const HandlePlaylist = async () => {
    setIsLoading(true);
    if (!isGuest) {
      try {
        const obj = {
          userId: user._id,
        };
        const response = await GetPlaylist(obj);
        setMyplaylist(response.data);
      } catch (error) {
        console.error('Error fetching playlist:', error);
      }
    }

    setIsLoading(false);
  };

  const toggleModal = (item) => {
    setSelectedItem(item);
    setIsModalVisible(!isModalVisible);

  };

  const handleDeleteConfirm = async () => {
    setIsLoading(true);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      userId: user._id,
    });

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    await fetch(
      `https://giant-eel-panama-hat.cyclic.app/moveminia/playlists/${myplaylist[0]._id}/movies/${selectedItem._id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {

        HandlePlaylist();
        setIsModalVisible(false);
      })
      .catch((error) => {
        Toast.show(error.message, {
          type: 'error',
          placement: 'top',
          duration: 3000,
          offset: 30,
          animationType: 'zoom-in',
        });
      });

    setIsLoading(false);
  };

  const filteredData = myplaylist[0]?.movies.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const searchFilter = (text) => {
    setSearchQuery(text);
  };

  const PlaylistItem = ({ item }) => (
    <View
      style={{
        ...styles.playlistItemContainer,
        backgroundColor: theme.colors.tabs,
        elevation: 2,
        shadowOffset: { width: 3, height: 3 },
        marginVertical: 5,
        padding: 5,
      }}
    >
      <Image
        style={styles.playlistItemImage}
        resizeMode="contain"
        source={{ uri: item?.poster[0]?.image }}
      />
      <View style={styles.playlistItemInfo}>
        <Text numberOfLines={1} style={{ ...smalltext, color: theme.colors.text }}>
          {item?.title}
        </Text>
        <View style={styles.playlistItemDetail}>
          <Text style={{ ...text, color: theme.colors.text }}>Director:</Text>
          <Text numberOfLines={1} style={{ ...text, color: theme.colors.text }}>
            {item?.director}
          </Text>
        </View>
        <View style={styles.playlistItemDetail}>
          <Text style={{ ...text, color: theme.colors.text }}>Release year:</Text>
          <Text style={{ ...text, color: theme.colors.text }}>{item?.releaseYear}</Text>
        </View>
        <View style={styles.playlistItemDetail}>
          <Text style={{ ...text, color: theme.colors.text }}>Category:</Text>
          <Text numberOfLines={1} style={{ ...text, color: theme.colors.text }}>
            {item?.category}
          </Text>
        </View>
      </View>
      <View style={styles.playlistItemActions}>
        <TouchableOpacity style={styles.playlistItemAction} onPress={() => navigation.navigate('Player1', { url: item.url })}>
          <Image style={styles.actionIcon} resizeMode="contain" source={PlayImage} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.playlistItemAction}
          onPress={() => toggleModal(item)}
        >
          <Image style={styles.actionIcon} resizeMode="contain" source={TrashImage} />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (isLoading) {
    return <PlaylistSkelton />;
  }

  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: theme.colors.background }}>
      <StatusBar backgroundColor={theme.colors.topbar} barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <View style={{ ...styles.headerContainer, backgroundColor: theme.colors.topbar }}>
        <Text style={{ ...styles.headerText, color: theme.colors.text }}>My Playlist</Text>
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
      <View style={{ ...styles.contentContainer, backgroundColor: theme.colors.background }}>
        <View style={{ ...styles.InputView, backgroundColor: theme.colors.tabs, elevation: 2, shadowOffset: { width: 3, height: 3 } }}>
          <Image
            style={{ ...SmallIcons, tintColor: theme.colors.icon }}
            source={searchIcon}
          />
          <TextInput
            value={searchQuery}
            onChangeText={searchFilter}
            placeholder="Search Movies"
            placeholderTextColor={theme.colors.text}
            color="gray"
            style={{ width: '90%' }}
          />
        </View>
        <View style={{ ...styles.playlistContainer, paddingBottom: "36%" }}>
          <Text style={{ ...Heading, color: theme.colors.text }}>
            {myplaylist[0]?.movies?.length == 0 && isGuest == false ? null : `${myplaylist[0]?.movies?.length} Playlists Found`}
          </Text>
          {myplaylist[0]?.movies?.length == 0 || isGuest ?
            <Image style={styles.emptyImage} resizeMode="contain" source={EmptyImage} /> : null
          }
          {
            !myplaylist[0]?.movies?.length == 0 && !isGuest &&
            <FlatList renderItem={PlaylistItem} data={filteredData} />
          }
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5e9cd',
  },
  headerContainer: {
    height: 100,
    width: '100%',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'black',
    marginLeft: '5%',
  },
  contentContainer: {
    backgroundColor: '#F8F8F8',
    flex: 2,
    alignItems: 'center',
  },
  InputView: {
    height: 40,
    width: '92%',
    alignSelf: 'center',
    backgroundColor: '#E1E4E8',
    borderRadius: 60,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    margin: 10,
    paddingHorizontal: 10,
  },
  playlistItemContainer: {
    height: 110,
    width: '98%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 5,
  },
  playlistItemImage: {
    height: '100%',
    width: 94,
    borderRadius: 10,
    marginRight: 10
  },
  playlistItemInfo: {
    width: '40%',
    height: '95%', gap: 5
  },
  playlistItemDetail: {
    flexDirection: 'row',
    gap: 5,
  },
  playlistItemActions: {
    width: '25%',
    height: '100%',
    gap: 10,
    justifyContent: 'space-around',
  },
  playlistItemAction: {
    height: 25,
    width: 25,
    borderRadius: 90,
    backgroundColor: '#F8F8F8',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    height: 30,
    width: 30,
  },
  emptyImage: {
    height: 298,
    width: Dimensions.get('window').width,
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

export default Playlist;
