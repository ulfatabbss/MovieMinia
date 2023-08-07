import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity, SafeAreaView,
  View, Platform, Modal, Pressable
} from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import Carousel from 'react-native-snap-carousel';
import { Primary, secondary } from '../utillis/colors';
import Header from '../components/Header';
import { GetMovies, GetSlider, GetUpcomming } from '../services/AppServices';
import { store } from '../redux/store';
import {
  setAnimated2Data,
  setAnimatedData,
  setAnimatedSlider,
  setCartoonData,
  setDramaSlider,
  setHindiMoviesData,
  setHollywood,
  setMoviesData,
  setPunjabiMoviesData,
  setSliderData,
  setUpcommingMoviesData,
} from '../redux/reducers/userReducers';
import { useSelector } from 'react-redux';
import MySlider from '../components/MySlider';
import CardsFlatlist from '../components/CardsFlatlist';
import LottieView from 'lottie-react-native';
import Loader from '../components/Loader';
const Dashboard = ({ navigation }) => {
  const {
    popularMoviesData,
    hindiMoviesData,
    punjabiMoviesData,
    upcommingMoviesData,
    sliderData, hollywood
  } = useSelector(state => state.root.user);
  const [loding, setLoding] = useState(true);

  useEffect(() => {
    setLoding(true);
    const integrate = async () => {
      await GetMovies()
        .then(async ({ data }) => {
          store.dispatch(
            setMoviesData(data.filter(object => object.category === 'English')),
          );
          store.dispatch(
            setHindiMoviesData(
              data.filter(object => object.category === 'Hindi'),
            ),
          );
          store.dispatch(
            setPunjabiMoviesData(
              data.filter(object => object.category === 'Punjabi'),
            ),
          );
          store.dispatch(
            setHollywood(
              data.filter(object => object.category === 'Hollywood'),
            ),
          );
          const animatedObjects = data.filter(
            object => object.category === 'Animated',
          );
          store.dispatch(setCartoonData(animatedObjects));
          store.dispatch(
            setAnimatedData(
              data.filter(object => object.category === 'Animated1'),
            ),
          );
          store.dispatch(
            setAnimated2Data(
              data.filter(object => object.category === 'Animated2'),
            ),
          );
        })
        .catch(err => {
          console.log(err, 'errors');
        });
      await GetUpcomming()
        .then(async ({ data }) => {
          store.dispatch(setUpcommingMoviesData(data));
        })
        .catch(err => {
          console.log(err, 'errors');
        });
      await GetSlider()
        .then(async ({ data }) => {
          store.dispatch(setSliderData(data[0].poster));
          store.dispatch(setDramaSlider(data[1].poster));
          store.dispatch(setAnimatedSlider(data[2].poster));
        })
        .catch(err => {
          console.log(err, 'errors');
        });
    };
    integrate();
    setLoding(false);
  }, []);
  if (loding) {
    return (
      <Loader />
    );
  }
  return (<>
    {Platform.OS === 'ios' &&
      <View style={{
        width: "100%",
        height: 100, // For all devices, even X, XS Max
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: "#000"
      }}
      />}
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 70 }}>
        <Header />
        <MySlider Movies={sliderData} />
        <CardsFlatlist navigation={navigation} heading={'Movie Trailers'} data={upcommingMoviesData} type={"Movies"} />
        <CardsFlatlist navigation={navigation} heading={'Hollywood'} data={hollywood} type={"Movies"} />
        <CardsFlatlist navigation={navigation} heading={'Hindi Dubbed'} data={popularMoviesData} type={"Movies"} />
        <CardsFlatlist navigation={navigation} heading={'Bollywood'} data={hindiMoviesData} type={"Movies"} />
        <CardsFlatlist navigation={navigation} heading={'Punjabi'} data={punjabiMoviesData} type={"Movies"} />
      </ScrollView>
    </SafeAreaView>
  </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: secondary,
    flex: 1
  },
});

