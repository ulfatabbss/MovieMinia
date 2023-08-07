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
import { Primary, white } from '../utillis/colors';
import AnimatedLottieView from 'lottie-react-native';
import { WebView } from 'react-native-webview';
import { ActivityIndicator } from 'react-native';
import LottieView from 'lottie-react-native';
import Header2 from '../components/Header2';
import Loader from '../components/Loader';
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const Player = ({ navigation, route }) => {
  const { name, url, data, type } = route.params;
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
  const MovieListView = ({ item }) => (
    <View
      style={{
        height: 60,
        width: Dimensions.get('window').width - 30,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        marginHorizontal: 10,
        backgroundColor: 'black',
        justifyContent: 'space-around',
      }}>
      {/* {console.log(item?.poster[0]?.image)} */}
      {/* <Text style={{ color: 'gray', margin: 8 }}>{item.epi_no}</Text> */}
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center' }}
        onPress={async () => {
          setUrl(item.url);
          setName(type == 'Movies' ? item.title : data?.title)
        }
        }>
        <Image
          resizeMode="contain"
          style={{
            height: 50,
            width: 50,
            marginRight: 10,
            borderRadius: 90,
            borderWidth: 1,
            borderColor: '#fff',
          }}
          source={{
            uri:
              type == 'Movies' ? item.poster[0].image : data?.poster[0].image,
          }}
        />
        <View>
          <Text
            numberOfLines={1}
            style={{
              width: Dimensions.get('window').width / 2,
              color: currentUrl == item.uri ? Primary : 'white',
            }}>
            {type == 'Movies' ? item.title : data?.title}
          </Text>
          <Text
            numberOfLines={1}
            style={{ color: 'gray', width: Dimensions.get('window').width / 2 }}>
            {type == 'Movies' ? type : `Episode No ${item?.epi_no}`}
          </Text>
        </View>
      </TouchableOpacity>
      <View style={{ width: 30 }}>
        {currentUrl == item?.url ? (
          <AnimatedLottieView
            autoPlay
            loop
            source={require('../assets/14805-playing-status.json')}
            style={{
              width: 30,
              height: 30,
              marginTop: 4,
            }}></AnimatedLottieView>
        ) : null}
      </View>
      <TouchableOpacity
        onPress={() => setModalVisible(true) || setItemDetail(item)}>
        <Image
          source={require('../assets/more.png')}
          style={{
            width: 20,
            height: 20,
            tintColor: 'gray',
            marginTop: 5,
            marginStart: 15,
          }}
        />
      </TouchableOpacity>
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
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <StatusBar backgroundColor="#333333" />
      <Header2 navigation={navigation} text={currentName} />
      <View
        style={{
          height: 300,
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
          onShouldStartLoadWithRequest={shouldStartLoadWithRequest}
          allowsFullscreenVideo
          style={styles.mediaPlayer}
          scrollEnabled={false}
          mediaPlaybackRequiresUserAction={true}
          javaScriptEnabled={true}
          domStorageEnabled={true}
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
      <Text style={{ color: white, margin: 10, fontSize: 16 }}>
        Related Videos
      </Text>
      <FlatList
        data={type == 'show' ? data.episods : data}
        showsVerticalScrollIndicator={false}
        renderItem={MovieListView}
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
                  source={require('../assets/plus.png')}
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
                  source={require('../assets/share.png')}
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
    height: 300,
    width: Dimensions.get('window').width - 10,
    backgroundColor: 'black', alignSelf: 'center',
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
});
