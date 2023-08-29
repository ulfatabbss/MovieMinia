import {
  ScrollView,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  View, Platform,
} from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import { secondary } from '../utillis/colors';
import Header from '../components/Header';
import { GetMovies, GetSlider, GetUpcomming } from '../services/AppServices';
import { store } from '../redux/store';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import {
  setAllMoviesData,
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
import CardsFlatlist from '../components/CardsFlatlist';
import Loader from '../components/Loader';
import Carousel from '../components/ImageCarousel';
import { useTheme } from 'react-native-paper';
import darkTheme from '../utillis/theme/darkTheme';
import lightTheme from '../utillis/theme/lightTheme';
const Dashboard = ({ navigation }) => {
  const {
    popularMoviesData,
    hindiMoviesData,
    punjabiMoviesData,
    upcommingMoviesData,
    sliderData, hollywood, myTheme
  } = useSelector(state => state.root.user);
  const [loding, setLoding] = useState(true);
  const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme);
  useEffect(() => {
    setLoding(true);
    const integrate = async () => {
      try {
        const moviesResponse = await GetMovies();
        const upcommingResponse = await GetUpcomming();
        const sliderResponse = await GetSlider();
        store.dispatch(setAllMoviesData(moviesResponse.data));
        store.dispatch(setMoviesData(moviesResponse.data.filter(object => object.category === 'English')));
        store.dispatch(setHindiMoviesData(moviesResponse.data.filter(object => object.category === 'Hindi')));
        store.dispatch(setPunjabiMoviesData(moviesResponse.data.filter(object => object.category === 'Punjabi')));
        store.dispatch(setHollywood(moviesResponse.data.filter(object => object.category === 'Hollywood')));
        const animatedObjects = moviesResponse.data.filter(object => object.category === 'Animated');
        store.dispatch(setCartoonData(animatedObjects));
        store.dispatch(setAnimatedData(moviesResponse.data.filter(object => object.category === 'Animated1')));
        store.dispatch(setAnimated2Data(moviesResponse.data.filter(object => object.category === 'Animated2')));
        store.dispatch(setUpcommingMoviesData(upcommingResponse.data));
        store.dispatch(setSliderData(sliderResponse.data[0].poster));
        store.dispatch(setDramaSlider(sliderResponse.data[1].poster));
        store.dispatch(setAnimatedSlider(sliderResponse.data[2].poster));
      } catch (error) {
        console.log(error, 'errors');
      }
    };

    integrate().then(() => setLoding(false));
  }, []);

  if (loding) {
    return (
      <Loader />
    );
  }

  return (
    <>
      {Platform.OS === 'ios' && (
        <View
          style={{
            width: '100%',
            height: 100,
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: theme.colors.background, // Use the active theme's background color
          }}
        />
      )}
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <StatusBar backgroundColor={theme.colors.background} barStyle={myTheme == 'lightTheme' ? 'dark-content' : 'light-content'} />
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 60 }}>
          <Header navigation={navigation} />
          <Carousel images={sliderData} />
          <CardsFlatlist navigation={navigation} heading={'Movies Trailer'} data={upcommingMoviesData} type={"Movies"} />
          <CardsFlatlist navigation={navigation} heading={'Hollywood'} data={hollywood} type={"Movies"} />
          <View style={{ marginVertical: 5, justifyContent: 'center', alignItems: 'center' }}>
            <BannerAd size={BannerAdSize.BANNER} unitId={"ca-app-pub-1700763198948198/4396679739"} />
          </View>
          <CardsFlatlist navigation={navigation} heading={'Hindi Dubbed'} data={popularMoviesData} type={"Movies"} />
          <CardsFlatlist navigation={navigation} heading={'Bollywood'} data={hindiMoviesData} type={"Movies"} />
          <View style={{ marginVertical: 5, justifyContent: 'center', alignItems: 'center' }}>
            <BannerAd size={BannerAdSize.BANNER} unitId={"ca-app-pub-1700763198948198/9698237176"} />
          </View>
          <CardsFlatlist navigation={navigation} heading={'Punjabi'} data={punjabiMoviesData} type={"Movies"} />
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

