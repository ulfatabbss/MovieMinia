import {
  ImageBackground,
  StyleSheet,
  StatusBar,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  Modal,
  Text,
  Alert,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { backErrow, caution, clock, disabledPlaylist, play, playFrame, timer } from '../../assets';
import HeadingText from '../../components/CustomText';
import { RF } from '../../utillis/theme/Responsive';
import {
  Gray200,
  Primary,
  Secondary,
  White,
} from '../../utillis/theme';
import { Extra, FlexDirection, Heading, button, button_View, modalCard, modalContainer, modal_FadeView, signUp_Button } from '../../utillis/styles';
import { useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import lightTheme from '../../utillis/theme/lightTheme';
import darkTheme from '../../utillis/theme/darkTheme';
import { Addtoplaylist, GetFeedback, GetPlaylist } from '../../services/AppServices';
import { store } from '../../redux/store';
import { setGuest, setIsLogin } from '../../redux/reducers/userReducers';
import Loader from '../../components/Loader';
import { useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const MovieDetailPage = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { item, data, type } = route.params;
  const {
    myTheme, user, isGuest
  } = useSelector(state => state.root.user);
  const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme); // Get the active theme
  const [feedbackData, setFeedbackData] = useState([])
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };
  const [playlistAdded, setPlaylistAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false)


  useFocusEffect(
    React.useCallback(() => {
      const newCheck = async () => {
        {
          !isGuest && await CheckPlaylist();
        }
        await fetchData();
      };

      newCheck();
    }, [])
  );
  const HandlePlaylist = async () => {
    setIsLoading(true);
    const obj = {
      movieIds: [item?._id],
      userId: user?._id
    }
    try {
      await Addtoplaylist(obj)
      setPlaylistAdded(true);
    } catch (error) {
      Alert.alert(error)
    } finally {
      setIsLoading(false);
    }
  };
  const CheckPlaylist = async () => {
    setIsLoading(true);
    const obj = {
      userId: user?._id
    };
    await GetPlaylist(obj)
      .then(({ data }) => {
        const movies = data[0]?.movies || [];
        const isMovieInPlaylist = movies?.some((movie) => movie?._id === item?._id);
        setPlaylistAdded(isMovieInPlaylist);
      })
      .catch(err => {
        console.log(err, 'errors');
      });
    setIsLoading(false);
  };

  const fetchData = async () => {
    try {
      const FeedBackResponse = await GetFeedback()
      setFeedbackData(FeedBackResponse?.data?.data);
    } catch (error) {
      if (error.message === 'Network Error') {
        Alert.alert('⚠️ Check your internet connection and try again .....!');
      } else {
        Alert.alert('⚠️ An error occurred. Please try again later.');
      }
    }
  };

  const handlePlayButtonPress = () => {
    if (isGuest) {
      setModalVisible(true);
    } else {
      navigation.navigate('Player', {
        name: item.title,
        url: type === 'show' ? item.episods[0].url : type === 'Movies' ? item.url : item.url,
        data: data,
        type: type,
      });
    }
  };


  const Movies_Info_Pattern = () => {
    return (
      <>
        <View style={{ ...FlexDirection, gap: 5, justifyContent: 'space-between', marginHorizontal: 5, alignSelf: 'center', marginTop: 10 }}>
          <Text style={{ ...Heading, color: theme?.colors?.text, fontSize: RF(20), width: "70%" }}>{item.title.replace(/^\s+/, '')}</Text>
          {type == 'Movies' && <TouchableOpacity style={{ ...styles.playframe, backgroundColor: Gray200 }} disabled={playlistAdded || isGuest}
            onPress={() => {
              HandlePlaylist()
            }}>
            <Image style={{
              height: RF(20),
              width: RF(20),
            }} source={isGuest || playlistAdded ? disabledPlaylist : playFrame} />
          </TouchableOpacity>}
        </View>
        <View style={[FlexDirection, Extra.marginTop]}>
          <View style={{ flexDirection: 'row' }}>
            <HeadingText title={'Category :'} regular size={16} R_Margin={10} color={theme?.colors?.text} />
            <HeadingText title={'Hollywood'} regular size={16} color={theme?.colors?.text} />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              style={{ height: RF(18), width: RF(18), marginRight: RF(10) }}
              source={timer}
            />
            <HeadingText title={item.duration} medium size={16} color={theme?.colors?.text} />
          </View>
        </View>
      </>
    );
  };
  const Play_Button = () => {
    return (
      <View style={styles.playButton}>
        {/* <TouchableOpacity onPress={() => isGuest ? setModalVisible(true) : navigation.navigate('Player', { name: item.title, url: type == 'show' ? item.episods[0].url : item.url, data: data, type: type })}> */}
        <TouchableOpacity onPress={() => handlePlayButtonPress()}>
          <Image
            style={{ height: RF(40), width: RF(40) }}
            resizeMode={'contain'}
            source={play}
          />
        </TouchableOpacity>
      </View>
    );
  };
  const renderShots = ({ item }) => {
    return (
      <View style={styles.screenshot_images}>
        <ImageBackground
          style={{ height: '100%', width: '100%' }}
          imageStyle={{ borderRadius: RF(20) }}
          resizeMode={'stretch'}
          source={{ uri: item?.image }} />
      </View>
    );
  };
  const renderEpisods = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('Player', {
          name: item.title,
          url: item.url,
          data: data,
          type: type,
        })} style={{ ...styles.screenshot_images, gap: 10, borderRadius: 5, overflow: 'hidden' }}>
        <ImageBackground
          style={{ height: 100, width: 100 }}
          resizeMode={'stretch'}
          source={{ uri: data?.poster[0]?.image }} >
          <LinearGradient
            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.9)']}
            style={styles.gradientOverlay}
          />
          <Text numberOfLines={1} style={{ ...styles.title, bottom: RF(20) }}>
            Episods No
          </Text>
          <Text numberOfLines={1} style={styles.title}>
            {item.epi_no}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    )
  }
  const renderCast = ({ item }) => {
    return (
      <View style={styles.cast_Images}>
        <Image
          style={{
            height: RF(65),
            width: RF(65),
            borderRadius: 35,
            alignSelf: 'center',
          }}
          resizeMode={'contain'}
          source={{ uri: item?.image }}
        />
        <HeadingText title={item?.name} semi_bold size={16} lines={1} color={theme?.colors?.text} />
      </View>
    );
  };
  const Reviews_Section = () => {
    return (
      <View
        style={{
          height: RF(120),
          width: '100%',
          marginTop: 20,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            style={{ height: RF(40), width: RF(40), borderRadius: 20 }}
            source={{
              uri: feedbackData[0]?.user_id?.profilePicture ? feedbackData[0]?.user_id?.profilePicture : 'https://cdn-icons-png.flaticon.com/128/149/149071.png',
            }}
            resizeMode={'contain'}
          />
          <View style={{ marginLeft: 10 }}>
            <HeadingText title={feedbackData[0]?.user_id?.name} medium size={14} color={theme?.colors?.text} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                style={{ height: RF(15), width: RF(15), marginRight: 5 }}
                source={clock}
                resizeMode={'contain'}
              />
              <HeadingText
                title={formatDate(feedbackData[0]?.timestamp)}
                medium
                size={11}
                regular
                color={theme?.colors?.text}
                top={-5}
              />
            </View>
          </View>
        </View>
        <HeadingText color={theme?.colors?.text}
          title={
            feedbackData[0]?.feedback_text
          }
          light
          size={14}
          top={10}
        />
      </View>
    );
  };
  if (isLoading) {
    return (
      <Loader />
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: theme?.colors?.background }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'light-content'}
      />
      {modalVisible ? <View style={modal_FadeView} /> : null}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={modalContainer}>
          <View style={modalCard}>
            <Image style={{ height: RF(90), width: RF(90) }} source={caution} />
            <HeadingText title={'OPPOSES...'} bold size={20} top={5} />
            <HeadingText
              title={
                'It seems you are using our Guest Mode! Please Login or Signup to perform this action.'
              }
              regular
              size={16}
              top={10}
              alignCenter
            />
            <View style={button_View}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => store.dispatch(setGuest(false)) && store.dispatch(setIsLogin(false))}>
                <HeadingText
                  title={'Login'}
                  semi_bold
                  size={16}
                  color={White}
                />
              </TouchableOpacity>
              <TouchableOpacity style={[button, signUp_Button]}
                onPress={() => setModalVisible(!modalVisible)}>
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
      <ImageBackground
        style={{ height: RF(300), width: '100%' }}
        source={{
          uri: item?.poster[1] ? item?.poster[1]?.image : item?.poster[0]?.image,
        }}
        resizeMode={'stretch'}
      >
        <TouchableOpacity style={{ height: RF(30), width: RF(30), paddingVertical: RF(60), marginHorizontal: RF(10) }} onPress={() => navigation.goBack()}>
          <Image style={{ height: RF(30), width: RF(30), tintColor: '#fff', resizeMode: 'contain' }} source={backErrow} />
        </TouchableOpacity>
        <View style={{ ...styles.chevronTriangle, ...styles.chevronTopLeft, borderLeftColor: theme?.colors?.background }} />
        <View style={{ ...styles.chevronTriangle, ...styles.chevronTopRight, borderLeftColor: theme?.colors?.background }} />
      </ImageBackground>
      <Play_Button />
      <ScrollView
        style={{ ...styles.detail_Container, backgroundColor: theme?.colors?.background }}
        showsVerticalScrollIndicator={false}>
        <Movies_Info_Pattern />
        <HeadingText
          title={item.overView}
          light
          size={14}
          top={20} color={theme?.colors?.text}
        />
        {type == 'show' &&
          <>
            <HeadingText title={'All Episods'} size={16} top={20} color={theme?.colors?.text} />
            <FlatList
              data={data.episods}
              renderItem={renderEpisods}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </>}
        <HeadingText title={'Screenshots'} size={16} top={20} color={theme?.colors?.text} />
        <FlatList
          data={item?.poster}
          renderItem={renderShots}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        <View style={{ paddingBottom: 40 }}>
          <HeadingText title={'Cast'} size={16} semi_bold top={20} color={theme?.colors?.text} />
          <FlatList
            data={item.cast}
            renderItem={renderCast}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          <View style={FlexDirection}>
            <HeadingText title={'Reviews'} size={16} semi_bold top={20} color={theme?.colors?.text} />
            <TouchableOpacity onPress={() => navigation.navigate('Review', { data: feedbackData })}>
              <HeadingText title={'View All'} size={16} medium top={20} color={theme?.colors?.text} />
            </TouchableOpacity>
          </View>
          <Reviews_Section />
          <TouchableOpacity disabled={isGuest} onPress={() => navigation.navigate('AddReview')}>
            <HeadingText
              title={'+ Add Feedback'}
              color={isGuest ? Gray200 : Secondary}
              size={16}
              semi_bold
              self
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default MovieDetailPage;

const styles = StyleSheet.create({
  chevron: {
    width: '100%',
    borderWidth: 1,
    height: 200,
  },

  chevronTriangle: {
    backgroundColor: 'transparent',
    borderTopWidth: 50,
    borderLeftWidth: 200,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: '#fff',
  },
  chevronTopLeft: {
    position: 'absolute',
    left: -10,
    bottom: 0,
  },
  chevronTopRight: {
    position: 'absolute',
    right: -10,
    bottom: 0,
    transform: [{ scaleX: -1 }],
  },
  playButton: {
    height: RF(65),
    alignItems: 'center',
    width: RF(65),
    justifyContent: 'center',
    backgroundColor: White,
    top: RF(260),
    elevation: 1,
    zIndex: 1,
    position: 'absolute',
    borderRadius: 35,
    alignSelf: 'center',
  },

  detail_Container: {
    padding: RF(20),
    height: '100%',
    width: '100%',
    backgroundColor: White,
  },

  playframe: {
    height: RF(30),
    width: RF(30),
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenshot_images: {
    height: RF(95),
    width: RF(93),
    marginTop: 10,
    marginRight: 10,
  },
  cast_Images: {
    height: RF(95),
    marginRight: 10,
    justifyContent: 'center',
    width: RF(95),
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject
  }, title: {
    color: '#FFFFFF',
    fontSize: RF(14),
    fontFamily: 'Raleway-Bold',
    textAlign: 'center',
    position: 'absolute',
    bottom: RF(10),
    left: 0,
    right: 0,
    paddingHorizontal: RF(5),
  },
});
