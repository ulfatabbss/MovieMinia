import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  StatusBar,
  SafeAreaView, ScrollView
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaylist } from '../redux/reducers/userReducers';
import EmptyImage from '../assets/emptyplaylist.png';
import SearchImage from '../assets/search.png';
import PlayImage from '../assets/play.png';
import TrashImage from '../assets/dell.png';
import { DellfromPlaylist, GetPlaylist } from '../services/AppServices';
import { useFocusEffect } from '@react-navigation/native';
import { useToast } from "react-native-toast-notifications";
import Loader from '../components/Loader';
import { Gray400, White } from '../utillis/theme';
import { SmallIcons } from '../utillis/styles';
import { useTheme } from 'react-native-paper';
import lightTheme from '../utillis/theme/lightTheme';
import darkTheme from '../utillis/theme/darkTheme';

const Playlist = () => {
  const {
    myTheme, user
  } = useSelector(state => state.root.user);
  const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme); // Get the active theme
  const Toast = useToast();
  const [myplaylist, setMyplaylist] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [sortedPlaylist, setSortedPlaylist] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState('');
  const filteredData = sortedPlaylist.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  useFocusEffect(
    useCallback(() => {
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

  const searchFilter = text => {
    if (text) {
      const newData = masterData.filter(item => {
        const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        if (textData.length > 1) {
          setIsRecent(false)
        }
        else {
          setIsRecent(true)
        }
        return itemData.indexOf(textData) > -1;
      });
      setEmp(newData);
      setSearch(text);
    } else {
      setEmp(masterData);
      setSearch(text);
    }
  };
  const PlaylistItem = ({ item }) => (
    <View style={styles.playlistItemContainer}>
      <Image style={styles.playlistItemImage} resizeMode="contain" source={{ uri: item?.poster[0]?.image }} />
      <View style={styles.playlistItemInfo}>
        <Text numberOfLines={1} style={styles.playlistItemName}>
          {item.title}
        </Text>
        <View style={styles.playlistItemDetail}>
          <Text style={styles.playlistItemLabel}>Director:</Text>
          <Text numberOfLines={1} style={styles.playlistItemValue}>
            {item?.director}
          </Text>
        </View>
        <View style={styles.playlistItemDetail}>
          <Text style={styles.playlistItemLabel}>Release year:</Text>
          <Text style={styles.playlistItemValue}>{item.releaseYear}</Text>
        </View>
        <View style={styles.playlistItemDetail}>
          <Text style={styles.playlistItemLabel}>Category:</Text>
          <Text numberOfLines={1} style={styles.playlistItemValue}>
            {item.category}
          </Text>
        </View>
      </View>
      <View style={styles.playlistItemActions}>
        <View style={styles.playlistItemAction}>
          <Image style={styles.actionIcon} resizeMode="contain" source={PlayImage} />
        </View>
        <View style={styles.playlistItemAction}>
          <Image style={styles.actionIcon} resizeMode="contain" source={TrashImage} />
        </View>
      </View>
    </View>
  );
  if (isLoading) {
    return (
      <Loader />
    );
  }
  return (
    <SafeAreaView style={{ ...styles.container, backgroundColor: theme.colors.background }}>
      <StatusBar backgroundColor={theme.colors.topbar} barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <View style={{ ...styles.headerContainer, backgroundColor: theme.colors.topbar }}>
        <Text style={{ ...styles.headerText, color: theme.colors.text }}>My Playlist</Text>
      </View>
      <View style={{ ...styles.contentContainer, backgroundColor: theme.colors.background }}>
        <View style={{ ...styles.InputView, backgroundColor: theme.colors.topbar }}>
          <Image
            style={{ ...SmallIcons, tintColor: theme.colors.icon }}
            source={require('../assets/appIcons/search.png')}></Image>
          <TextInput
            value={search}
            onChangeText={text => searchFilter(text)}
            placeholder="Search Movies"
            placeholderTextColor={theme.colors.text}
            color="gray"
            style={{ width: '90%' }} />
        </View>
        <View style={styles.playlistContainer}>
          <Text style={styles.playlistCount}>
            {myplaylist[0]?.movies?.length == 0 || user.email == 'guest@example.com' ? null : '08 Playlists Found'}
          </Text>
          <ScrollView style={styles.playlistListContainer}>
            {myplaylist[0]?.movies?.length == 0 || user.email == 'guest@example.com' ? (
              <Image style={styles.emptyImage} resizeMode="contain" source={EmptyImage} />
            ) : (
              <FlatList renderItem={PlaylistItem} data={myplaylist[0]?.movies} />
            )}
          </ScrollView>
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
  },
  searchContainer: {
    marginTop: '5%',
    width: '90%',
    height: 45,
    backgroundColor: '#F0F2F3',
    alignSelf: 'center',
    borderRadius: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchImage: {
    height: 17,
    width: 17,
    marginHorizontal: '5%',
  },
  searchInput: {
    width: '80%',
    fontSize: 10,
    fontWeight: '400',
    color: 'balck',
  },
  playlistContainer: {
    width: '95%',
    height: '100%',
    alignSelf: 'center',
  },
  playlistCount: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
    margin: '5%',
  },
  playlistListContainer: {
    width: '100%',
    marginTop: 10,
  },
  emptyImage: {
    height: 298,
    width: '100%',
  },
  playlistItemContainer: {
    height: 110,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,

    marginTop: '3%',
  },
  playlistItemImage: {
    height: 105,
    width: 94,
    marginHorizontal: '5%',
    borderRadius: 20,
  },
  playlistItemInfo: {
    width: '40%',
    height: '95%',
  },
  playlistItemName: {
    fontSize: 14,
    fontWeight: '500',
    color: 'black',
    fontWeight: '600',
    marginTop: '10%',
  },
  playlistItemDetail: {
    flexDirection: 'row',
    marginTop: '2%',
  },
  playlistItemLabel: {
    fontSize: 10,
    fontWeight: '400',
    color: 'black',
  },
  playlistItemValue: {
    fontSize: 10,
    fontWeight: '400',
    color: 'black',
    marginLeft: '2%',
  },
  playlistItemActions: {
    width: '25%',
    flexDirection: 'row',
    height: '60%',
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
    height: 17.5,
    width: 17.5,
  },
  InputView: {
    height: 40,
    width: '92%', alignSelf: 'center',
    backgroundColor: '#E1E4E8',
    borderRadius: 60,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center', marginTop: 20,
    margin: 10, paddingHorizontal: 10
  },
});

export default Playlist;
