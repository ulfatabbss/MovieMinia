import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View, SafeAreaView, TouchableOpacity
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { secondary } from '../utillis/colors';
import Header from '../components/Header';
import { GetDrama } from '../services/AppServices';
import { setDramaData, setHindiSeasons, setHollywoodseasons, setIndianDrama, setTurkishDrama } from '../redux/reducers/userReducers';
import { useSelector } from 'react-redux';
import { store } from '../redux/store';
// import MySlider from '../components/ImageCarousel';
import CardsFlatlist from '../components/CardsFlatlist';
import Loader from '../components/Loader';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import Carousel from '../components/ImageCarousel';
import { Text } from '@rneui/base';
import { useTheme } from 'react-native-paper';
import lightTheme from '../utillis/theme/lightTheme';
import darkTheme from '../utillis/theme/darkTheme';
const TvShowes = ({ navigation }) => {
  const [loding, setLoding] = useState(true);
  const [value, setValue] = useState("season")
  const { dramaData, dramaSlider, indianDrama, turkishDrama, hollywoodseasons, hindiSeasons, myTheme } = useSelector(
    state => state.root.user,
  );
  const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme); // Get the active theme

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoding(true);
        const response = await GetDrama();
        const { data } = response;
        store.dispatch(setDramaData(data.filter(object => object.category === 'Urdu')));
        store.dispatch(setIndianDrama(data.filter(object => object.category === 'Indian')));
        store.dispatch(setTurkishDrama(data.filter(object => object.category === 'Turkish')));
        store.dispatch(setHollywoodseasons(data.filter(object => object.category === 'Season')));
        store.dispatch(setHindiSeasons(data.filter(object => object.category === 'HindiSeason')));

        setLoding(false);
      } catch (error) {
        console.log(error, 'errors');
        setLoding(false);
      }
    };

    fetchData();
  }, []);

  if (loding) {
    return (
      <Loader />
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
