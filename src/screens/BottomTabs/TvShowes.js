import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View, SafeAreaView, TouchableOpacity
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { secondary } from '../../utillis/colors';
import Header from '../../components/Header';
import { GetDrama } from '../../services/AppServices';
import { setDramaData, setHindiSeasons, setHollywoodseasons, setIndianDrama, setLoading, setNewAnimSeason, setPopularAnimSeason, setTrendAnimSeason, setTurkishDrama } from '../../redux/reducers/userReducers';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../redux/store';
// import MySlider from '../components/ImageCarousel';
import CardsFlatlist from '../../components/CardsFlatlist';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import Carousel from '../../components/ImageCarousel';
import { Text } from '@rneui/base';
import { useTheme } from 'react-native-paper';
import lightTheme from '../../utillis/theme/lightTheme';
import darkTheme from '../../utillis/theme/darkTheme';
import ScreenPreLoader from '../../components/ScreenPreLoader';
const TvShowes = ({ navigation }) => {
  const [value, setValue] = useState("season")
  const { dramaData, dramaSlider, indianDrama, turkishDrama, hollywoodseasons, hindiSeasons, myTheme, loading } = useSelector(
    state => state.root.user,
  );
  const dispatch = useDispatch();
  const apiCalledOnMount = useRef(false);
  const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme); // Get the active theme
  const [refreshInterval, setRefreshInterval] = useState(12 * 60 * 60 * 1000);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));
        const response = await GetDrama();
        const { data } = response;
        dispatch(setDramaData(data.filter(object => object.category === 'Urdu')));
        dispatch(setIndianDrama(data.filter(object => object.category === 'Indian')));
        dispatch(setTurkishDrama(data.filter(object => object.category === 'Turkish')));
        dispatch(setHollywoodseasons(data.filter(object => object.category === 'Season')));
        dispatch(setHindiSeasons(data.filter(object => object.category === 'HindiSeason')));
        dispatch(setNewAnimSeason(data.filter((object) => object.category == 'newAnimSeason')));
        dispatch(setTrendAnimSeason(data.filter((object) => object.category == 'trendAnimSeason')));
        dispatch(setPopularAnimSeason(data.filter((object) => object.category == 'popularAnimSeason')));
        dispatch(setLoading(false));
      } catch (error) {
        console.log(error, 'errors');
        dispatch(setLoading(false));
      }
    };
    if (!apiCalledOnMount.current) {
      fetchData();
      apiCalledOnMount.current = true;
    }

    // Set up an interval to call the API every 12 hours
    const intervalId = setInterval(fetchData, refreshInterval);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch, refreshInterval]);

  if (loading) {
    return (
      <ScreenPreLoader />
    );
  }
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <StatusBar backgroundColor={theme.colors.background} barStyle={theme.dark ? 'light-content' : 'dark-content'} />
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 60 }}>
        <Header navigation={navigation} />
        <Carousel images={dramaSlider} />

        <View style={{ height: 40, width: "96%", alignSelf: 'center', marginVertical: 10, flexDirection: 'row', backgroundColor: '#E1E4E8', borderRadius: 50 }}>
          <TouchableOpacity onPress={() => setValue('season')} style={{ width: "50%", backgroundColor: value == 'season' ? '#720808' : '#E1E4E8', borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: value == 'season' ? '#fff' : '#313131', fontFamily: value == 'season' ? 'Raleway-Bold' : 'Raleway-Regular' }}>Seasons</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setValue('tv')} style={{ width: "50%", backgroundColor: value == 'tv' ? '#720808' : '#E1E4E8', borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: value == 'tv' ? '#fff' : '#313131', fontFamily: value == 'tv' ? 'Raleway-Bold' : 'Raleway-Regular' }}>T.V Serials</Text>
          </TouchableOpacity>
        </View>
        {value === 'season' && (
          <>
            <CardsFlatlist navigation={navigation} heading={'Hollywood Seasons'} data={hollywoodseasons} type={"show"} />
            <CardsFlatlist navigation={navigation} heading={'Bollywood Seasons'} data={hindiSeasons} type={"show"} />
            <View style={{ marginVertical: 5, justifyContent: 'center', alignItems: 'center' }}>
              <BannerAd size={BannerAdSize.BANNER} unitId={"ca-app-pub-1700763198948198/4396679739"} />
            </View>
          </>
        )}

        {value === 'tv' && (
          <>
            <CardsFlatlist navigation={navigation} heading={'Pakistani'} data={dramaData} type={"show"} />
            <CardsFlatlist navigation={navigation} heading={'Turkish'} data={turkishDrama} type={"show"} />
            <View style={{ width: "100%", marginVertical: 5, justifyContent: 'center', alignItems: 'center' }}>
              <BannerAd size={BannerAdSize.BANNER} unitId={"ca-app-pub-1700763198948198/9698237176"} />
            </View>
            <CardsFlatlist navigation={navigation} heading={'Indian'} data={indianDrama} type={"show"} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TvShowes;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F8F8F8",
    flex: 1
  },
  Heading: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 16,
  },
});
