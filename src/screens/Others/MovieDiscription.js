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
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { caution, clock, hide, play, playFrame, timer } from '../../assets';
import HeadingText from '../../components/CustomText';
import { RF } from '../../utillis/theme/Responsive';
import {
  Gray400,
  Primary,
  Primary_Light,
  Secondary,
  White,
} from '../../utillis/theme';
import { Extra, FlexDirection, Heading } from '../../utillis/styles';
import { useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import lightTheme from '../../utillis/theme/lightTheme';
import darkTheme from '../../utillis/theme/darkTheme';
import { Addtoplaylist, GetFeedback, GetPlaylist } from '../../services/AppServices';
import { store } from '../../redux/store';
import { setGuest, setIsLogin } from '../../redux/reducers/userReducers';
import { useToast } from "react-native-toast-notifications";
import Loader from '../../components/Loader';
import { useFocusEffect } from '@react-navigation/native';

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
  const Toast = useToast();
  const [playlistAdded, setPlaylistAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [ischeck, setIsCheck] = useState(false)

  useFocusEffect(
    React.useCallback(() => {
      {
        !isGuest &&
          CheckPlaylist();

      }
    }, [])
  );
  const HandlePlaylist = async () => {
    setIsLoading(true);
    setIsCheck(true);
    const obj = {
      movieIds: [item._id],
      userId: user._id
    }
    try {
      const check = await Addtoplaylist(obj)
      console.log(check, "ghdjhjwekdnkdn");
      setPlaylistAdded(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      setIsCheck(false)
    }
  };
  const CheckPlaylist = async () => {
    setIsLoading(true);
    const obj = {
      userId: user._id
    };
    await GetPlaylist(obj)
      .then(({ data }) => {
        const movies = data[0]?.movies || [];
        const isMovieInPlaylist = movies.some((movie) => movie._id === item._id);
        setPlaylistAdded(isMovieInPlaylist);
      })
      .catch(err => {
        console.log(err, 'errors');
      });
    setIsLoading(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const FeedBackResponse = await GetFeedback()
        // console.log(
        // FeedBackResponse.data.data);
        setFeedbackData(FeedBackResponse.data.data);
      } catch (error) {
        console.log(error, 'errors');
      }
    };

    fetchData();
  }, []);
  const Movies_Info_Pattern = () => {
    return (
      <>
        <View style={{ ...FlexDirection, gap: 5, justifyContent: 'space-between', marginHorizontal: 5, alignSelf: 'center', marginTop: 10 }}>
          <Text style={{ ...Heading, color: theme?.colors?.text, fontSize: 20, width: "70%" }}>{item.title}</Text>
          {/* <HeadingText title={item.title} size={20} semi_bold color={theme?.colors?.text} /> */}
          <TouchableOpacity style={{ ...styles.playframe, backgroundColor: Primary_Light }} disabled={playlistAdded || isGuest}
            onPress={() => {
              HandlePlaylist()
            }}>
            <Image style={{ height: RF(21), width: RF(21) }} source={playlistAdded ? hide : playFrame} />
          </TouchableOpacity>
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
  const Play_Button = ({ setModalVisible }) => {
    return (
      <View style={styles.playButton}>
        <TouchableOpacity onPress={() => !isGuest ? navigation.navigate('Player', { name: item.title, url: type == 'show' ? item.episods[0].url : item.url, data: data, type: type }) : setModalVisible(true)}>
          {/* name, url, data, type */}
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
          source={{ uri: item.image }} />
      </View>
    );
  };
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
              uri: feedbackData[0]?.user_id?.profilePicture,
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
      {modalVisible ? <View style={styles.modal_FadeView} /> : null}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalCard}>
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
            <View style={styles.button_View}>
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
              <TouchableOpacity style={[styles.button, styles.signUp_Button]}
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
          uri: item?.poster[1] ? item.poster[1].image : item?.poster[0]?.image,
        }}
        resizeMode={'stretch'}
      >
        <View style={{ ...styles.chevronTriangle, ...styles.chevronTopLeft, borderLeftColor: theme?.colors?.background }} />
        <View style={{ ...styles.chevronTriangle, ...styles.chevronTopRight, borderLeftColor: theme?.colors?.background }} />
      </ImageBackground>
      <Play_Button setModalVisible={setModalVisible} />
      {/* name, url, data, type */}
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
              color={Secondary}
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
    height: RF(35),
    width: RF(35),
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
  modal_FadeView: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: 500,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  button: {
    height: RF(40),
    width: '45%',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Primary,
  },
  button_View: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',
    marginTop: RF(20),
  },
  signUp_Button: {
    borderWidth: 1,
    backgroundColor: White,
    borderColor: Secondary,
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
});
