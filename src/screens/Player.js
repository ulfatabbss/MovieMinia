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
const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const Player = ({ navigation, route }) => {
  const { url, data, type } = route.params;
  const [focused, setFocused] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemDetail, setItemDetail] = useState('');
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
        onPress={() =>
          navigation.replace('Player', { url: item?.url, data: data, type: type })
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
              color: url == item.uri ? Primary : 'white',
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
        {url == item?.url ? (
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

  const [show, setShow] = useState(false);

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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color={'red'} />
      </View>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
      <StatusBar translucent backgroundColor="#333333" />
      <View
        style={{
          marginTop: StatusBar.currentHeight,
          height: 300,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <WebView
          onLoadStart={() => setVisible(true)}
          onLoadEnd={() => setVisible(false)}
          source={{
            uri: url,
          }}
          onShouldStartLoadWithRequest={shouldStartLoadWithRequest}
          // injectedJavaScript={extractVideoUrl}
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
        Releated Videos
      </Text>
      <FlatList
        data={type == 'Drama' ? data.episods : data}
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
    width: Dimensions.get('window').width,
    backgroundColor: 'black',
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
