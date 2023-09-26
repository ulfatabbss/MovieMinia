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
  Dimensions, ActivityIndicator, Image
} from 'react-native';

import { WebView } from 'react-native-webview';
import lightTheme from '../../utillis/theme/lightTheme';
import darkTheme from '../../utillis/theme/darkTheme';
import { useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import PlayImage from '../../assets/play.png';
import { Heading, smalltext, text } from '../../utillis/styles';
import EmptyImage from '../../assets/emptyplaylist.png';
import Loader from '../../components/Loader';
import { RF } from '../../utillis/theme/Responsive';
import BannersAdd from '../../components/BannersAdd';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
import { useInterstitialAd, TestIds } from 'react-native-google-mobile-ads';
const adUnitid = 'ca-app-pub-1700763198948198/2979565361';
const Player = ({ navigation, route }) => {
  const { url, data, type } = route.params;
  const { myTheme } = useSelector((state) => state.root.user);
  const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme);
  const [currentUrl, setUrl] = useState(url)
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  const { isLoaded, isClosed, load, show } = useInterstitialAd(adUnitid, {
    requestNonPersonalizedAdsOnly: true,
  });

  useEffect(() => {
    // Start loading the interstitial straight away
    load();
  }, [load]);

  useEffect(() => {
    if (isClosed) {
      // Action after the ad is closed
      console.log('add close');
    }
  }, [isClosed]);

  const PlaylistItem = ({ item }) => (
    <View style={{ ...styles.playlistItemContainer, backgroundColor: theme?.colors?.tabs, elevation: 2, shadowOffset: 3, gap: 5, padding: 5 }}>
      <Image style={styles.playlistItemImage} resizeMode="contain" source={{
        uri:
          type == 'Movies' ? item?.poster[0]?.image : data?.poster[0]?.image
      }} />
      <View style={styles.playlistItemInfo}>
        <Text numberOfLines={1} style={{ ...smalltext, color: theme?.colors?.text }}>
          {type == 'Movies' ? item?.title : data?.title}
        </Text>
        <View style={styles.playlistItemDetail}>
          <Text style={{ ...text, color: theme?.colors?.text }}>Director:</Text>
          <Text numberOfLines={1} style={{ ...text, color: theme?.colors?.text }}>
            {type == 'Movies' ? item?.director : data?.director}
          </Text>
        </View>
        <View style={styles.playlistItemDetail}>
          <Text style={{ ...text, color: theme?.colors?.text }}>Release year:</Text>
          <Text style={{ ...text, color: theme?.colors?.text }}>
            {type == 'Movies' ? item.releaseYear : data?.releaseYear}</Text>
        </View>
        {type == 'Movies' &&
          <View style={styles.playlistItemDetail}>
            <Text style={{ ...text, color: theme?.colors?.text }}>Category:</Text>
            <Text numberOfLines={1} style={{ ...text, color: theme?.colors?.text }}>
              {item?.category}
            </Text>
          </View>
        }
        {type == 'show' &&
          <View style={styles.playlistItemDetail}>
            <Text style={{ ...text, color: theme?.colors?.text }}>Episode No:</Text>
            <Text numberOfLines={1} style={{ ...text, color: theme?.colors?.text }}>
              {item?.epi_no}
            </Text>
          </View>
        }

      </View>
      <View style={styles.playlistItemActions}>
        <TouchableOpacity style={styles.playlistItemAction} onPress={async () => {
          setUrl(item?.url)
        }
        }>
          <Image style={styles.actionIcon} resizeMode="contain" source={PlayImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
  if (loading) {
    return <Loader />
  }
  if (isLoaded) {
    return show();
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme?.colors?.background }}>
      <StatusBar backgroundColor="#333333" />
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
          allowsFullscreenVideo
          style={styles.mediaPlayer}
          scrollEnabled={false}
          javaScriptEnabled={true}
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

      <Text style={{ ...Heading, color: theme?.colors?.text, margin: 10, }}>
        Related Videos
      </Text>
      <BannersAdd id={'ca-app-pub-1700763198948198/2098879910'} />

      {data.length != 0 || data?.episods.length != 0 ?
        <FlatList
          data={type == 'show' ? data?.episods : data}
          showsVerticalScrollIndicator={false}
          renderItem={PlaylistItem}
        /> : <Image resizeMode='contain' style={{ height: RF(300), width: RF(300), alignSelf: 'center' }} source={EmptyImage} />
      }

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
    marginTop: '10%',
    // height: "45%",
    width: Dimensions.get('window').width
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
