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
  TouchableOpacity,
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

const Playlist = () => {
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
    setIsModalVisible(!isModalVisible);
    setSelectedItem(item);
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
      `https://giant-eel-panama-hat.cyclic.app/moveminia/playlists/${myplaylist[0]._id}/movies/${selectedItem.item._id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        HandlePlaylist();
        Toast.show('⭐ Successfully removed from playlist......!', {
          type: 'success',
          placement: 'top',
          duration: 3000,
          offset: 30,
          animationType: 'zoom-in',
        });
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
        <TouchableOpacity style={styles.playlistItemAction}>
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
    return <Loader />;
  }

  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: theme.colors.background }}>
      <StatusBar backgroundColor={theme.colors.topbar} barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <View style={{ ...styles.headerContainer, backgroundColor: theme.colors.topbar }}>
        <Text style={{ ...styles.headerText, color: theme.colors.text }}>My Playlist</Text>
      </View>
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
        <View style={styles.playlistContainer}>
          <Text style={{ ...Heading, color: theme.colors.text }}>
            {myplaylist.length == 0 || isGuest ? null : `${myplaylist[0].movies.length} Playlists Found`}
          </Text>
          {myplaylist?.length == 0 || isGuest ? (
            <Image style={styles.emptyImage} resizeMode="contain" source={EmptyImage} />
          ) : (
            <FlatList renderItem={PlaylistItem} data={filteredData} />
          )}
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
    width: '100%',
  },
});

export default Playlist;
