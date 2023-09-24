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
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

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
import SectionPreLoader from '../../components/ShimmerPlaceHolder/SectionPreLoader';
import BannersAdd from '../../components/BannersAdd';

const Dashboard = ({ navigation }) => {

  const {
    popularMoviesData,
    hindiMoviesData,
    punjabiMoviesData,
    upcommingMoviesData,
    sliderData,
    hollywood,
    myTheme,
    loading, south
  } = useSelector((state) => state.root.user);
  const [list1, setList1] = useState(false)
  const [list2, setList2] = useState(false)
  const [list3, setList3] = useState(false)
  const [list4, setList4] = useState(false)
  const [list5, setList5] = useState(false)
  const [list6, setList6] = useState(false)

  const dispatch = useDispatch();
  const apiCalledOnMount = useRef(false);
  const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme);
  const [refreshInterval, setRefreshInterval] = useState(12 * 60 * 60 * 1000);

  useEffect(() => {
    const integrate = async () => {
      try {
        dispatch(setLoading(true));
        setList1(true)
        setList2(true)
        setList3(true)
        setList4(true)
        setList5(true)
        setList6(true)
        const sliderResponse = await GetSlider()
        dispatch(setSliderData(sliderResponse?.data[0].poster));
        dispatch(setDramaSlider(sliderResponse?.data[1]?.poster));
        dispatch(setAnimatedSlider(sliderResponse?.data[2]?.poster));
        dispatch(setLoading(false));
        const upCommingMovies = await GetUpcomming()
        dispatch(setUpcommingMoviesData(upCommingMovies?.data));
        setList1(false)
        const result1 = await GetMovies("Hollywood")
        dispatch(setHollywood(result1?.data?.movies))
        setList2(false)
        const result2 = await GetMovies("English")
        dispatch(setMoviesData(result2?.data?.movies))
        setList3(false)
        const result3 = await GetMovies("Hindi")
        dispatch(setHindiMoviesData(result3?.data?.movies))
        setList4(false)
        const result4 = await GetMovies("Tollywood")
        dispatch(setSouthMoviesData(result4?.data?.movies))
        setList5(false)
        const result5 = await GetMovies("Punjabi")
        dispatch(setPunjabiMoviesData(result5?.data?.movies))
        setList6(false)
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
        {
          loading ?
            <>
              <ScreenPreLoader />
              <SectionPreLoader />
            </> :
            <>
              <Header navigation={navigation} />
              <Carousel images={sliderData} />
            </>}
        {list1 ?
          <>
            <SectionPreLoader />
          </>
          :
          <CardsFlatlist navigation={navigation} heading={'Movies Trailer'} data={upcommingMoviesData} type={'Movies'} />
        }
        {list2 ?
          <>
            <SectionPreLoader />
          </>
          :
          <>
            <BannersAdd id={'ca-app-pub-1700763198948198/9698237176'} />
            <CardsFlatlist navigation={navigation} heading={'Hollywood'} data={hollywood} type={'Movies'} />
          </>
        }
        {list3 ?
          <>
            <SectionPreLoader />
            <SectionPreLoader />
          </>
          :
          <>
            <BannersAdd id={'ca-app-pub-1700763198948198/4396679739'} />
            <CardsFlatlist navigation={navigation} heading={'Hindi Dubbed'} data={popularMoviesData} type={'Movies'} />

          </>
        }
        {list4 ?
          <>
            <SectionPreLoader />
            <SectionPreLoader />

          </>
          :
          <>
            <BannersAdd id={'ca-app-pub-1700763198948198/2284343051'} />
            <CardsFlatlist navigation={navigation} heading={'Bollywood'} data={hindiMoviesData} type={'Movies'} />

          </>
        }
        {list5 ?
          <>
            <SectionPreLoader />
            <SectionPreLoader />
          </>
          :
          <>
            <BannersAdd id={'ca-app-pub-1700763198948198/4976324693'} />
            <CardsFlatlist navigation={navigation} heading={'South Indian'} data={south} type={'Movies'} />
          </>
        }
        {list6 ?
          <>
            <SectionPreLoader />
          </>
          :
          <>
            <BannersAdd id={'ca-app-pub-1700763198948198/8723998019'} />
            <CardsFlatlist navigation={navigation} heading={'Punjabi'} data={punjabiMoviesData} type={'Movies'} />
            <BannersAdd id={'ca-app-pub-1700763198948198/2158589664'} />
          </>
        }
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
