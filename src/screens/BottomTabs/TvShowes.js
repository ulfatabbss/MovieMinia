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
import SectionPreLoader from '../../components/ShimmerPlaceHolder/SectionPreLoader';
import BannersAdd from '../../components/BannersAdd';
const TvShowes = ({ navigation }) => {
  const [value, setValue] = useState("season")
  const { dramaData, dramaSlider, indianDrama, turkishDrama, hollywoodseasons, hindiSeasons, myTheme, loading } = useSelector(
    state => state.root.user,
  );
  const dispatch = useDispatch();
  const apiCalledOnMount = useRef(false);
  const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme); // Get the active theme
  const [refreshInterval, setRefreshInterval] = useState(12 * 60 * 60 * 1000);
  const [prevValue, setPrevValue] = useState(value);
  const [loadHindi, setloadHindi] = useState(false)
  const [pakistni, setPakistni] = useState(false)
  const [indian, setIndian] = useState(false)
  const [turkish, setTurkish] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true))
        setloadHindi(true)
        setPakistni(true)
        setIndian(true)
        setTurkish(true)

        const hollywooodSeasons1 = await GetDrama("Season");
        dispatch(setHollywoodseasons(hollywooodSeasons1?.data?.dramas));
        dispatch(setLoading(false));
        const hindiSeasons1 = await GetDrama("HindiSeason");
        dispatch(setHindiSeasons(hindiSeasons1?.data?.dramas));
        setloadHindi(false)
        // Fetch season data
        const pakistani = await GetDrama("Urdu");
        dispatch(setDramaData(pakistani?.data?.dramas));
        setPakistni(false)
        const indian = await GetDrama("Indian");
        dispatch(setIndianDrama(indian?.data?.dramas));
        setIndian(false)
        const turkish = await GetDrama("Turkish");
        dispatch(setTurkishDrama(turkish?.data?.dramas));
        setTurkish(false)

      } catch (error) {
        console.log(error, 'errors');
        dispatch(setLoading(false));
      }
    };

    // Fetch data initially and set up an interval
    fetchData();
    const intervalId = setInterval(fetchData, refreshInterval);

    // Cleanup the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, [dispatch, refreshInterval, prevValue]);
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme?.colors?.background }]}>
      <StatusBar backgroundColor={theme?.colors?.background} barStyle={theme.dark ? 'light-content' : 'dark-content'} />
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
          loading ? (
            <>
              <SectionPreLoader />
            </>
          ) : (
            <>
              <CardsFlatlist navigation={navigation} heading={'Hollywood Seasons'} data={hollywoodseasons} type={"show"} />
              <BannersAdd id={'ca-app-pub-1700763198948198/7724371994'} />
            </>
          )
        )}

        {value === 'season' && (
          loading && loadHindi ? (
            <>
              <SectionPreLoader />
            </>
          ) : (
            <>
              <CardsFlatlist navigation={navigation} heading={'Bollywood Seasons'} data={hindiSeasons} type={"show"} />
              <BannersAdd id={'ca-app-pub-1700763198948198/1158963648'} />
            </>
          )
        )}


        {value === 'tv' && (
          pakistni ? (
            <>
              <SectionPreLoader />
            </>
          ) : (
            <>
              <CardsFlatlist navigation={navigation} heading={'Pakistani'} data={dramaData} type={"show"} />
              <BannersAdd id={'ca-app-pub-1700763198948198/3479124783'} />
            </>
          )
        )}
        {value === 'tv' && (
          indian ? (
            <>
              <SectionPreLoader />
            </>
          ) : (
            <>
              <CardsFlatlist navigation={navigation} heading={'Turkish'} data={turkishDrama} type={"show"} />
              <BannersAdd id={'ca-app-pub-1700763198948198/3986676654'} />
            </>
          )
        )}
        {value === 'tv' && (
          turkish ? (
            <>
              <SectionPreLoader />
            </>
          ) : (
            <>
              <CardsFlatlist navigation={navigation} heading={'Indian'} data={indianDrama} type={"show"} />
              <BannersAdd id={'ca-app-pub-1700763198948198/4396679739'} />
            </>
          )
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
