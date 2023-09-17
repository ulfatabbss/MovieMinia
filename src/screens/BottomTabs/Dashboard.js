import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  View,
  Platform,
  Alert,
} from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';

import {
  setLoading,
  setAllMoviesData,
  setMoviesData,
  setHindiMoviesData,
  setPunjabiMoviesData,
  setHollywood,
  setUpcommingMoviesData,
  setSliderData,
  setDramaSlider,
  setAnimatedSlider,
  setCartoonData,
  setAnimated2Data,
  setAnimatedData,
  setSouthMoviesData,
  setNewAnimSeason,
  setTrendAnimSeason,
  setPopularAnimSeason,
} from '../../redux/reducers/userReducers';
import { GetMovies, GetSlider, GetUpcomming } from '../../services/AppServices';
import Header from '../../components/Header';
import Carousel from '../../components/ImageCarousel';
import CardsFlatlist from '../../components/CardsFlatlist';
import ScreenPreLoader from '../../components/ScreenPreLoader';
import { useTheme } from 'react-native-paper';
import darkTheme from '../../utillis/theme/darkTheme';
import lightTheme from '../../utillis/theme/lightTheme';
import { store } from '../../redux/store';

const Dashboard = ({ navigation }) => {

  const {
    popularMoviesData,
    hindiMoviesData,
    punjabiMoviesData,
    upcommingMoviesData,
    sliderData,
    hollywood,
    myTheme,
    loading, south, popularAnimSeason
  } = useSelector((state) => state.root.user);
  const dispatch = useDispatch();
  const apiCalledOnMount = useRef(false);
  const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme);
  const [refreshInterval, setRefreshInterval] = useState(12 * 60 * 60 * 1000);

  useEffect(() => {
    const integrate = async () => {
      dispatch(setLoading(true));
      try {
        const result1 = await GetMovies("Hollywood")
        // store.dispatch(setHollywood(result1.data.movies))
        dispatch(setHollywood(result1?.data?.movies))
        const result2 = await GetMovies("English")
        dispatch(setMoviesData(result2?.data?.movies))
        const result3 = await GetMovies("Hindi")
        dispatch(setHindiMoviesData(result3?.data?.movies))
        const result4 = await GetMovies("Tollywood")
        dispatch(setSouthMoviesData(result4?.data?.movies))
        const result5 = await GetMovies("Punjabi")
        dispatch(setPunjabiMoviesData(result5?.data?.movies))
        const [
          upcommingResponse,
          sliderResponse] = await Promise.all([
            GetUpcomming(),
            GetSlider(),
          ]);
        dispatch(setUpcommingMoviesData(upcommingResponse?.data));
        dispatch(setSliderData(sliderResponse?.data[0].poster));
        dispatch(setDramaSlider(sliderResponse?.data[1]?.poster));
        dispatch(setAnimatedSlider(sliderResponse?.data[2]?.poster));
      } catch (error) {
        if (error.message === 'Network Error') {
          Alert.alert('⚠️ Check your internet connection and try again .....!');
        } else {
          Alert.alert('⚠️ An error occurred. Please try again later.');
        }
      } finally {
        dispatch(setLoading(false));
      }
    };
    // Call the API when the component mounts only if it hasn't been called before
    if (!apiCalledOnMount.current) {
      integrate();
      apiCalledOnMount.current = true;
    }

    // Set up an interval to call the API every 12 hours
    const intervalId = setInterval(integrate, refreshInterval);
    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch, refreshInterval]);

  if (loading) {
    return <ScreenPreLoader />;
  }

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme?.colors?.background }]}
    >
      <StatusBar
        backgroundColor={theme?.colors?.background}
        barStyle={myTheme === 'lightTheme' ? 'dark-content' : 'light-content'}
      />
      {Platform.OS === 'ios' && (
        <View
          style={{
            width: '100%',
            height: 100,
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: theme?.colors?.background,
          }}
        />
      )}
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 60 }}>
        <Header navigation={navigation} />
        <Carousel images={sliderData} />
        <CardsFlatlist navigation={navigation} heading={'Movies Trailer'} data={upcommingMoviesData} type={'Movies'} />
        <View style={{ marginVertical: 5, justifyContent: 'center', alignItems: 'center' }}>
          <BannerAd size={BannerAdSize.BANNER} unitId={'ca-app-pub-1700763198948198/9698237176'} />
        </View>
        <CardsFlatlist navigation={navigation} heading={'Hollywood'} data={hollywood} type={'Movies'} />
        <View style={{ marginVertical: 5, justifyContent: 'center', alignItems: 'center' }}>
          <BannerAd size={BannerAdSize.BANNER} unitId={'ca-app-pub-1700763198948198/4396679739'} />
        </View>
        <CardsFlatlist navigation={navigation} heading={'Hindi Dubbed'} data={popularMoviesData} type={'Movies'} />
        <View style={{ marginVertical: 5, justifyContent: 'center', alignItems: 'center' }}>
          <BannerAd size={BannerAdSize.BANNER} unitId={'ca-app-pub-1700763198948198/9698237176'} />
        </View>
        <CardsFlatlist navigation={navigation} heading={'Bollywood'} data={hindiMoviesData} type={'Movies'} />
        <View style={{ marginVertical: 5, justifyContent: 'center', alignItems: 'center' }}>
          <BannerAd size={BannerAdSize.BANNER} unitId={'ca-app-pub-1700763198948198/9698237176'} />
        </View>
        <CardsFlatlist navigation={navigation} heading={'South Indian'} data={south} type={'Movies'} />
        <View style={{ marginVertical: 5, justifyContent: 'center', alignItems: 'center' }}>
          <BannerAd size={BannerAdSize.BANNER} unitId={'ca-app-pub-1700763198948198/4396679739'} />
        </View>
        <CardsFlatlist navigation={navigation} heading={'Punjabi'} data={punjabiMoviesData} type={'Movies'} />
        <View style={{ marginVertical: 5, justifyContent: 'center', alignItems: 'center' }}>
          <BannerAd size={BannerAdSize.BANNER} unitId={'ca-app-pub-1700763198948198/9698237176'} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
