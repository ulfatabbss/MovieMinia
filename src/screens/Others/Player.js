import React, { useState, useRef, useEffect } from 'react';

import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Pressable,
  Share,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Image } from '@rneui/base';
import { Primary, white } from '../../utillis/colors';
import AnimatedLottieView from 'lottie-react-native';
import { WebView } from 'react-native-webview';
import { ActivityIndicator } from 'react-native';
import Header2 from '../../components/Header2';
import Loader from '../../components/Loader';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import lightTheme from '../../utillis/theme/lightTheme';
import darkTheme from '../../utillis/theme/darkTheme';
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import PlayImage from '../../assets/play.png';

import { Heading, smalltext, text } from '../../utillis/styles';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const Player = ({ navigation, route }) => {
  const { name, url, data, type } = route.params;
  const { myTheme } = useSelector(state => state.root.user);
  const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme);
  const [focused, setFocused] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemDetail, setItemDetail] = useState('');
  const [currentUrl, setUrl] = useState(url)
  const [currentName, setName] = useState(name)
  const [visible, setVisible] = useState(false);
  const [loding, setLoding] = useState(true);
  const shareData = async item => {
    try {
      await Share.share({
        message: 'Check out this link',
        // url: item.uri,
      });
    } catch (error) {
      alert(error.message);
    }
  };
  const like = () => {
    if (focused == true) {
      setFocused(false);
      setModalVisible(false);
    } else if (focused == false) setFocused(true);
    setModalVisible(false);
  };
  // useEffect(() => {
  //   console.log(url);
  // })
  const PlaylistItem = ({ item }) => (
    <View style={{ ...styles.playlistItemContainer, backgroundColor: theme.colors.tabs, elevation: 2, shadowOffset: 3, gap: 5, padding: 5 }}>
      <Image style={styles.playlistItemImage} resizeMode="contain" source={{
        uri:
          type == 'Movies' ? item.poster[0].image : data?.poster[0].image
      }} />
      <View style={styles.playlistItemInfo}>
        <Text numberOfLines={1} style={{ ...smalltext, color: theme.colors.text }}>
          {type == 'Movies' ? item.title : data?.title}
        </Text>
        <View style={styles.playlistItemDetail}>
          <Text style={{ ...text, color: theme.colors.text }}>Director:</Text>
          <Text numberOfLines={1} style={{ ...text, color: theme.colors.text }}>

            {type == 'Movies' ? item.director : data?.director}
          </Text>
        </View>
        <View style={styles.playlistItemDetail}>
          <Text style={{ ...text, color: theme.colors.text }}>Release year:</Text>
          <Text style={{ ...text, color: theme.colors.text }}>
            {type == 'Movies' ? item.releaseYear : data?.releaseYear}</Text>
        </View>
        <View style={styles.playlistItemDetail}>
          <Text style={{ ...text, color: theme.colors.text }}>Category:</Text>
          <Text numberOfLines={1} style={{ ...text, color: theme.colors.text }}>

            {type == 'Movies' ? item.category : data?.category}
          </Text>
        </View>
      </View>
      <View style={styles.playlistItemActions}>
        <TouchableOpacity style={styles.playlistItemAction} onPress={async () => {
          setUrl(item.url);
          setName(type == 'Movies' ? item.title : data?.title)
        }
        }>
          <Image style={styles.actionIcon} resizeMode="contain" source={PlayImage} />
        </TouchableOpacity>
      </View>
    </View>
  );

  useEffect(
    () => {
      let timer1 = setTimeout(() => setLoding(false), 3 * 1000);

      // this will clear Timeout
      // when component unmount like in willComponentUnmount
      // and show will not change to true
      return () => {
        clearTimeout(timer1);
      };
    },
    // useEffect will run only one time with empty []
    // if you pass a value to array,
    // like this - [data]
    // than clearTimeout will run every time
    // this value changes (useEffect re-run)
    [],
  );
  const adBlockPattern = /ads\.example\.com/; // Add your ad domain pattern here

  const shouldStartLoadWithRequest = request => {
    const { url } = request;

    if (adBlockPattern.test(url)) {
      return false; // Block the request
    }
    return true; // Allow the request
  };

  if (loding) {
    return (
      <Loader />
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar backgroundColor="#333333" />
      {/* <Header2 navigation={navigation} text={currentName} /> */}
      <View
        style={{
          height: "40%",
          alignItems: 'center',
          width: Dimensions.get("window").width, borderRadius: 10,
          justifyContent: 'center',
          //  borderColor: 'red',borderWidth:2
        }}>
        <WebView
          onLoadStart={() => setVisible(true)}
          onLoadEnd={() => setVisible(false)}
          source={{
            uri: currentUrl,
          }}
          allowsLinkPreview={true}
          mediaPlaybackRequiresUserAction={false}
          allowsFullscreenVideo
          style={styles.mediaPlayer}
          scrollEnabled={false}
        />
        {visible && (
          <ActivityIndicator
            size={'large'}
            color={'red'}
            style={{
              position: 'absolute',
              height: height / 2,
              width: width / 2,
            }}></ActivityIndicator>
        )}

      </View>

      <Text style={{ ...Heading, color: theme.colors.text, margin: 10, }}>
        Related Videos
      </Text>
      <View style={{ marginVertical: 5, justifyContent: 'center', alignItems: 'center' }}>
        <BannerAd size={BannerAdSize.BANNER} unitId={"ca-app-pub-1700763198948198/4396679739"} />
      </View>
      <FlatList
        data={type == 'show' ? data.episods : data}
        showsVerticalScrollIndicator={false}
        renderItem={PlaylistItem}
      />
      <View style={{ flex: 1 }}>
        <Modal
          animationType='fade'
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <Pressable
            onPress={() => setModalVisible(false)}
            style={styles.centeredView}>
            <View style={styles.modalView}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderBottomColor: 'gray',
                  borderBottomWidth: 1,
                  paddingBottom: 10,
                }}>
                <Image
                  style={{
                    height: 50,
                    width: 50,
                    marginRight: 10,
                  }}
                  source={{ uri: itemDetail.Image }}></Image>
                <View>
                  <Text
                    style={{ color: 'white', fontSize: 14, fontWeight: '600' }}>
                    {itemDetail.name}
                  </Text>
                  <Text numberOfLines={1} style={{ color: 'gray' }}>

                  </Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => like()}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 12,
                }}>
                <Image
                  style={{
                    width: 18,
                    height: 18,
                    marginRight: 20,
                    tintColor: focused ? Primary : 'gray',
                  }}
                  source={require('../../assets/plus.png')}
                />
                <Text style={{ color: 'white', fontWeight: '500', fontSize: 14 }}>
                  Add to PlayList
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 12,
                }}
                onPress={() => shareData()}>
                <Image
                  style={{
                    width: 18,
                    height: 18,
                    marginRight: 20,
                    tintColor: 'gray',
                  }}
                  source={require('../../assets/share.png')}
                />
                <Text style={{ color: 'white', fontWeight: '500', fontSize: 14 }}>
                  Share
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>
      </View>
      {/* Modal Ends */}
    </SafeAreaView>
  );
};

export default Player;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    height: "40%",
    width: Dimensions.get('window').width, alignSelf: 'center',
  },
  modalContainer: {
    flex: 1,
    width: '100%',
  },
  centeredView: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalView: {
    backgroundColor: '#555555',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    padding: 20,
  },

  textStyle: {
    color: 'white',
    textAlign: 'center',
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
    width: '98%',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20, alignSelf: 'center',
    marginVertical: 5,
  },
  playlistItemImage: {
    height: '100%',
    width: 94,
    // marginHorizontal: '5%',
    borderRadius: 10,
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
    gap: 5
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
    // flexDirection: 'row',
    height: '100%', gap: 10,
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
});
