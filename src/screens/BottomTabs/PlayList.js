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
  TouchableOpacity, Modal, Dimensions, Alert
} from 'react-native';
import EmptyImage from '../../assets/emptyplaylist.png';
import PlayImage from '../../assets/play.png';
import TrashImage from '../../assets/dell.png';
import { GetPlaylist } from '../../services/AppServices';
import { useFocusEffect } from '@react-navigation/native';
import { Heading, SmallIcons, smalltext, text } from '../../utillis/styles';
import { useTheme } from 'react-native-paper';
import lightTheme from '../../utillis/theme/lightTheme';
import darkTheme from '../../utillis/theme/darkTheme';
import { caution, searchIcon } from '../../assets';
import PlaylistSkelton from '../../components/ShimmerPlaceHolder/PlaylistSkelton';
import { HP, RF, WP } from '../../utillis/theme/Responsive';
import HeadingText from '../../components/CustomText';
import { Secondary, White } from '../../utillis/theme';
import { Primary } from '../../utillis/colors';

const Playlist = ({ navigation }) => {
  const { myTheme, user, isGuest, isFacebook, isGoogle } = useSelector((state) => state.root.user);
  const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme);
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
          userId: user?._id,
        };
        const response = await GetPlaylist(obj);
        setMyplaylist(response?.data);
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
      userId: user?._id,
    });

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    await fetch(
      `https://backend.movieminia.com/moveminia/playlists/${myplaylist[0]?._id}/movies/${selectedItem?._id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {

        HandlePlaylist();
        setIsModalVisible(false);
      })
      .catch((error) => {
        Alert.alert(error)
      });

    setIsLoading(false);
  };

  const filteredData = myplaylist[0]?.movies?.filter((item) =>
    item?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const searchFilter = (text) => {
    setSearchQuery(text);
  };

  const PlaylistItem = ({ item }) => (
    <View
      style={{
        ...styles.playlistItemContainer,
        backgroundColor: theme?.colors?.tabs,
        elevation: 2,
        shadowOffset: { width: 3, height: 3 },
        marginVertical: RF(5),
        padding: RF(5),
      }}
    >
      <Image
        style={styles.playlistItemImage}
        resizeMode="contain"
        source={{ uri: item?.poster[0]?.image }}
      />
      <View style={styles.playlistItemInfo}>
        <Text numberOfLines={1} style={{ ...smalltext, color: theme?.colors?.text, fontSize: RF(14), }}>
          {item?.title}
        </Text>
        <View style={styles.playlistItemDetail}>
          <Text style={{ ...text, color: theme?.colors?.text, fontSize: RF(12), }}>Director:</Text>
          <Text numberOfLines={1} style={{ ...text, color: theme?.colors?.text, fontSize: RF(12), }}>
            {item?.director}
          </Text>
        </View>
        <View style={styles.playlistItemDetail}>
          <Text style={{ ...text, color: theme?.colors?.text, fontSize: RF(12), }}>Release year:</Text>
          <Text style={{ ...text, color: theme?.colors?.text, fontSize: RF(12), }}>{item?.releaseYear}</Text>
        </View>
        <View style={styles.playlistItemDetail}>
          <Text style={{ ...text, color: theme?.colors?.text, fontSize: RF(12), }}>Category:</Text>
          <Text numberOfLines={1} style={{ ...text, color: theme?.colors?.text, fontSize: RF(12), }}>
            {item?.category}
          </Text>
        </View>
      </View>
      <View style={styles.playlistItemActions}>
        <TouchableOpacity style={styles.playlistItemAction} onPress={() => navigation.navigate('Player1', { url: item?.url })}>
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
    <SafeAreaView style={{ ...styles.container, backgroundColor: theme?.colors?.background }}>
      <StatusBar backgroundColor={theme?.colors?.topbar} barStyle={myTheme == 'lightTheme' ? 'dark-content' : 'light-content'} />
      <View style={{ ...styles.headerContainer, backgroundColor: theme?.colors?.topbar }}>
        <Text style={{ ...styles.headerText, color: theme?.colors?.text }}>My Playlist</Text>
      </View>
      {isModalVisible ? <View style={styles.modal_FadeView} /> : null}
      <Modal animationType="slide" transparent={true} visible={isModalVisible}><View style={styles.modalContainer}>
        <View style={styles.modalCard}>
          <Image style={{ height: RF(90), width: RF(90) }} source={caution} />
          <HeadingText title={'Are you sure?'} bold size={20} top={5} />
          <HeadingText
            title={
              'Do you really want to delete this record?'
            }
            regular
            size={16}
            top={10}
            alignCenter
          />
          <View style={styles.button_View}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleDeleteConfirm()}>
              <HeadingText
                title={'Yes'}
                semi_bold
                size={16}
                color={White}
              />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.signUp_Button]}
              onPress={() => setIsModalVisible(!isModalVisible)}>
              <HeadingText
                title={'Cancel'}
                semi_bold
                size={16}
                color={Secondary}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </Modal>
      <View style={{ ...styles.contentContainer, backgroundColor: theme?.colors?.background }}>
        <View style={{ ...styles.InputView, backgroundColor: theme?.colors?.tabs, elevation: 2, shadowOffset: { width: 3, height: 3 } }}>
          <Image
            style={{ ...SmallIcons, tintColor: theme?.colors?.icon }}
            source={searchIcon}
          />
          <TextInput
            value={searchQuery}
            onChangeText={searchFilter}
            placeholder="Search Movies"
            placeholderTextColor={theme?.colors?.text}
            color="gray"
            style={{ width: '90%' }}
          />
        </View>
        <View style={{ ...styles.playlistContainer, paddingBottom: "36%" }}>
          {!isGuest || !myplaylist[0]?.movies?.length == 0 && <Text style={{ ...Heading, color: theme?.colors?.text, marginHorizontal: RF(10), fontSize: RF(14) }}>
            {`${myplaylist[0]?.movies?.length} Playlists Found`}
          </Text>}
          {isGuest || myplaylist[0]?.movies?.length == 0 || myplaylist?.length == 0 ?
            <View style={{ height: '100%', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
              <Image style={styles.emptyImage} resizeMode="contain" source={EmptyImage} />
              <HeadingText
                title={'Not Found!'}
                semi_bold
                size={16}
                color={'#EAAE23'}
              />
              <Text style={{ ...text, fontSize: RF(14), color: theme?.colors?.text, alignSelf: 'center', textAlign: 'center', paddingHorizontal: 20 }}>Sorry, but your playlist currently doesn't include any movies, TV shows, or sessions.</Text>
            </View>
            : null
          }
          {
            !myplaylist[0]?.movies.length == 0 || !isGuest ?
              <FlatList renderItem={PlaylistItem} data={filteredData} /> : null
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
    fontSize: RF(18),
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
    height: RF(120),
    width: WP(95),
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    alignSelf: 'center',
    marginHorizontal: WP(1),
    marginVertical: WP(2),
    paddingHorizontal: RF(5)
  },
  playlistItemImage: {
    height: '100%',
    width: RF(94),
    borderRadius: RF(10),
    marginRight: RF(10)
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
    height: RF(25),
    width: RF(25),
    borderRadius: 90,
    backgroundColor: '#F8F8F8',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionIcon: {
    height: RF(25),
    width: RF(25),
  },
  emptyImage: {
    height: '40%', resizeMode: 'contain',
    width: Dimensions.get('window').width - 20,
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
  modal_FadeView: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 500,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    height: RF(300),
    width: '100%',
    borderRadius: RF(30),
    backgroundColor: White,
    padding: 20,
    alignItems: 'center',
  },
  button_View: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',
    marginTop: RF(40),
  },
  button: {
    height: RF(40),
    width: '45%',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Primary,
  },
  signUp_Button: {
    backgroundColor: White,
    borderColor: Secondary, elevation: 5
  },
});

export default Playlist;
