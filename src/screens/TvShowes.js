import {
  ScrollView,
  StatusBar,
  StyleSheet,
  View, SafeAreaView
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { secondary } from '../utillis/colors';
import Header from '../components/Header';
import { GetDrama } from '../services/AppServices';
import { setDramaData, setHindiSeasons, setHollywoodseasons, setIndianDrama, setTurkishDrama } from '../redux/reducers/userReducers';
import { useSelector } from 'react-redux';
import { store } from '../redux/store';
import MySlider from '../components/MySlider';
import CardsFlatlist from '../components/CardsFlatlist';
import Loader from '../components/Loader';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
const TvShowes = ({ navigation }) => {
  const [loding, setLoding] = useState(true);
  const { dramaData, dramaSlider, indianDrama, turkishDrama, hollywoodseasons, hindiSeasons } = useSelector(
    state => state.root.user,
  );

  useEffect(async () => {
    setLoding(true)
    await GetDrama()
      .then(async ({ data }) => {
        store.dispatch(setDramaData(data.filter(object => object.category === 'Urdu')));
        store.dispatch(setIndianDrama(data.filter(object => object.category === 'Indian'))),
          store.dispatch(setTurkishDrama(data.filter(object => object.category === 'Turkish')))
        store.dispatch(setHollywoodseasons(data.filter(object => object.category === 'Season')))
        store.dispatch(setHindiSeasons(data.filter(object => object.category === 'HindiSeason')))

      })
      .catch(err => {
        console.log(err, 'errors');
      });
    setLoding(false)
  }, []);
  if (loding) {
    return (
      <Loader />
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 70 }}>
        <Header />
        <MySlider Movies={dramaSlider} />
        <CardsFlatlist navigation={navigation} heading={'Hollywood Seasons'} data={hollywoodseasons} type={"show"} />
        <CardsFlatlist navigation={navigation} heading={'Bollywood Seasons'} data={hindiSeasons} type={"show"} />
        <View style={{ marginVertical: 5, justifyContent: 'center', alignItems: 'center' }}>
          <BannerAd size={BannerAdSize.BANNER} unitId={"ca-app-pub-1700763198948198/4396679739"} />
        </View>
        <CardsFlatlist navigation={navigation} heading={'Pakistani'} data={dramaData} type={"show"} />
        <CardsFlatlist navigation={navigation} heading={'Turkish'} data={turkishDrama} type={"show"} />
        <View style={{ width: "100%", marginVertical: 5, justifyContent: 'center', alignItems: 'center' }}>
          <BannerAd size={BannerAdSize.BANNER} unitId={"ca-app-pub-1700763198948198/9698237176"} />
        </View>
        <CardsFlatlist navigation={navigation} heading={'Indian'} data={indianDrama} type={"show"} />

      </ScrollView>
    </SafeAreaView>
  );
};

export default TvShowes;

const styles = StyleSheet.create({
  container: {
    backgroundColor: secondary,
    flex: 1,
  },
  Heading: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    marginLeft: 16,
  },
});
