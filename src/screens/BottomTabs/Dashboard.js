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
  const [skip, setSkip] = useState(0)
  const [refreshInterval, setRefreshInterval] = useState(12 * 60 * 60 * 1000);
  let limit = 10;
  let loadMore = true
  useEffect(() => {
    const integrate = async () => {
      dispatch(setLoading(true));
      try {
        const hollywood = await GetMovies("Hollywood")
        dispatch(setHollywood(hollywood.data.movies))
        const english = await GetMovies("English")
        dispatch(setMoviesData(english.data.movies))
        const hindi = await GetMovies("Hindi")
        dispatch(setHindiMoviesData(hindi.data.movies))
        const south = await GetMovies("Tollywood")
        dispatch(setSouthMoviesData(south.data.movies))
        const punjabi = await GetMovies("Punjabi")
        dispatch(...punjabiMoviesData, setPunjabiMoviesData(punjabi.data.movies))
        // const animatedObjects = data.filter((object) => object.category === 'Animated');
        // dispatch(setAllMoviesData(data));
        // dispatch(setMoviesData(data.filter((object) => object.category === 'English')));
        // dispatch(setHindiMoviesData(data.filter((object) => object.category === 'Hindi')));
        // dispatch(setPunjabiMoviesData(data.filter((object) => object.category === 'Punjabi')));
        // dispatch(setHollywood(data.filter((object) => object.category === 'Hollywood')));
        // dispatch(setCartoonData(animatedObjects));
        // dispatch(setAnimatedData(data.filter((object) => object.category === 'Animated1')));
        // dispatch(setAnimated2Data(data.filter((object) => object.category === 'Animated2')));
        // dispatch(setSouthMoviesData(data.filter((object) => object.category === 'Tollywood')));
        // dispatch(setSouthMoviesData(data.filter((object) => object.category === 'Lollywood')));
        const [
          upcommingResponse,
          sliderResponse] = await Promise.all([
            GetUpcomming(),
            GetSlider(),
          ]);
        dispatch(setUpcommingMoviesData(upcommingResponse.data));
        dispatch(setSliderData(sliderResponse.data[0].poster));
        dispatch(setDramaSlider(sliderResponse.data[1].poster));
        dispatch(setAnimatedSlider(sliderResponse.data[2].poster));
      } catch {
        Alert.alert('⚠️ Check your internet connection and try again .....!');
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
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar
        backgroundColor={theme.colors.background}
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
            backgroundColor: theme.colors.background,
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
