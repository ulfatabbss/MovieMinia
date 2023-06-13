import React, {useState, useRef} from 'react';

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
} from 'react-native';

import Video from 'react-native-video';
// import Modal from 'react-native-modal';
//Media Controls to control Play/Pause/Seek and full screen
import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import {Movies} from './Dashboard';
import {Image} from '@rneui/base';
import {Primary, white} from '../utillis/colors';
import AnimatedLottieView from 'lottie-react-native';
const Player = ({navigation, route}) => {
  const {url} = route.params;
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [Full, setFull] = useState(false);
  const [screenType, setScreenType] = useState('content');
  const [focused, setFocused] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [itemDetail, setItemDetail] = useState('');
  const onSeek = seek => {
    videoPlayer.current.seek(seek);
  };
  const shareData = async item => {
    try {
      await Share.share({
        message: 'Check out this link',
        // url: item.uri,
        //here we can add our app link to share our app with peoples
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const onPaused = playerState => {
    setPaused(!paused);
    setPlayerState(playerState);
  };

  const onReplay = () => {
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.current.seek(0);
  };

  const onProgress = data => {
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = data => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = data => setIsLoading(true);

  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

  const onFullScreen = () => {
    setFull(true);

    if (screenType == 'content') {
      setScreenType('cover'), setFull(true);
    } else {
      setScreenType('content');
      setFull(false);
    }
  };

  const renderToolbar = () => (
    <View>
      <Text style={styles.toolbar}> toolbar </Text>
    </View>
  );

  const onSeeking = currentTime => setCurrentTime(currentTime);
  const like = () => {
    if (focused == true) {
      setFocused(false);
      setModalVisible(false);
    } else if (focused == false) setFocused(true);
    setModalVisible(false);
  };
  const MovieListView = ({item}) => (
    <View
      style={{
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginTop: 20,
        backgroundColor: 'black',
        justifyContent: 'space-around',
      }}>
      <Text style={{color: 'gray', margin: 8}}>{item.id}</Text>
      <TouchableOpacity
        style={{flexDirection: 'row', alignItems: 'center'}}
        onPress={() => navigation.replace('Player', {url: item.uri})}>
        <Image
          style={{height: 50, width: 50, marginRight: 10, borderRadius: 90}}
          source={{uri: item.Image}}></Image>
        <View>
          <Text style={{color: url == item.uri ? Primary : 'white'}}>
            {item.name}
          </Text>
          <Text numberOfLines={1} style={{color: 'gray'}}>
            Artist | song | Arjit singh from india
          </Text>
        </View>
      </TouchableOpacity>
      <View style={{width: 30}}>
        {url == item.uri ? (
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

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      <View style={{height: Full ? '100%' : '30%'}}>
        <Video
          onEnd={onEnd}
          onLoad={onLoad}
          onLoadStart={onLoadStart}
          onProgress={onProgress}
          paused={paused}
          ref={videoPlayer}
          resizeMode={screenType}
          onFullScreen={isFullScreen}
          source={{
            uri: url,
          }}
          style={styles.mediaPlayer}
          volume={10}
        />
        <MediaControls
          duration={duration}
          isLoading={isLoading}
          mainColor="#333"
          onFullScreen={onFullScreen}
          onPaused={onPaused}
          onReplay={onReplay}
          onSeek={onSeek}
          onSeeking={onSeeking}
          playerState={playerState}
          progress={currentTime}
          toolbar={renderToolbar()}
        />
      </View>
      <Text style={{color: white, margin: 10, fontSize: 16}}>
        Releated Videos
      </Text>
      <FlatList
        data={Movies}
        showsVerticalScrollIndicator={false}
        renderItem={MovieListView}
      />
      {/* Modal Start */}

      <View style={{flex: 1}}>
        <Modal
          animationType="slide"
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
                  source={{uri: itemDetail.Image}}></Image>
                <View>
                  <Text
                    style={{color: 'white', fontSize: 14, fontWeight: '600'}}>
                    {itemDetail.name}
                  </Text>
                  <Text numberOfLines={1} style={{color: 'gray'}}>
                    Artist | song | Arjit Singh
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
                <Text style={{color: 'white', fontWeight: '500', fontSize: 14}}>
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
                <Text style={{color: 'white', fontWeight: '500', fontSize: 14}}>
                  Share
                </Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </Modal>
      </View>
      {/* Modal Ends */}
    </View>
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
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
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
