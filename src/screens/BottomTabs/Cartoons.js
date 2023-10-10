import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View, Platform
} from 'react-native';
import { secondary } from '../../utillis/colors';
import Header from '../../components/Header';
import { useSelector, useDispatch } from 'react-redux';
import CardsFlatlist from '../../components/CardsFlatlist';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import Carousel from '../../components/ImageCarousel';
import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'react-native-paper';
import lightTheme from '../../utillis/theme/lightTheme';
import darkTheme from '../../utillis/theme/darkTheme';
import { GetDrama, GetMovies } from '../../services/AppServices';
import { setAnimated2Data, setAnimatedData, setCartoonData, setLoading, setNewAnimSeason, setPopularAnimSeason } from '../../redux/reducers/userReducers';
import ScreenPreLoader from '../../components/ScreenPreLoader';
import SectionPreLoader from '../../components/ShimmerPlaceHolder/SectionPreLoader';
import BannersAdd from '../../components/BannersAdd';
const Cartoons = ({ navigation }) => {
  const { cartoonData, animated1Data, animated2Data, animatedSlider, myTheme, popularAnimSeason, newAnimSeason, loading } =
    useSelector(state => state.root.user);
  const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme); // Get the active theme
  const [value, setValue] = useState("movies")
  const dispatch = useDispatch();
  const apiCalledOnMount = useRef(false);
  const [refreshInterval, setRefreshInterval] = useState(12 * 60 * 60 * 1000);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));
        const newAnim = await GetDrama("newAnimSeason");
        dispatch(setNewAnimSeason(newAnim?.data?.dramas))
        const newPopular = await GetDrama("popularAnimSeason")
        dispatch(setPopularAnimSeason(newPopular?.data?.dramas))
        const NEW = await GetMovies("Animated")
        dispatch(setCartoonData(NEW?.data?.movies))
        const Popular = await GetMovies("Animated1")
        dispatch(setAnimatedData(Popular?.data?.movies))
        const Treanding = await GetMovies("Animated2")
        dispatch(setAnimated2Data(Treanding?.data?.movies))
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
  }, [refreshInterval]);
  if (loading) {
    return (
      <SafeAreaView
      style={[styles.container, { backgroundColor: theme?.colors?.background, flex:1 }]}
    >
        <ScreenPreLoader />
        <SectionPreLoader />
        <SectionPreLoader />
    </SafeAreaView>

    )
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
            backgroundColor: theme?.colors?.background, // Use the active theme's background color
          }}
        />
      )}
      <SafeAreaView style={[styles.container, { backgroundColor: theme?.colors?.background }]}>
        <StatusBar backgroundColor={theme?.colors?.background} barStyle={myTheme == 'lightTheme' ? 'dark-content' : 'light-content'} />
        <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: 60 }}>
          <Header navigation={navigation} />
          <Carousel images={animatedSlider} />
          <View style={{ height: 40, width: "96%", alignSelf: 'center', marginVertical: 10, flexDirection: 'row', backgroundColor: '#E1E4E8', borderRadius: 50 }}>
            <TouchableOpacity onPress={() => setValue('movies')} style={{ width: "50%", backgroundColor: value == 'movies' ? '#720808' : '#E1E4E8', borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: value == 'movies' ? '#fff' : '#313131', fontFamily: value == 'movies' ? 'Raleway-Bold' : 'Raleway-Regular' }}>Movies</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setValue('seasons')} style={{ width: "50%", backgroundColor: value == 'seasons' ? '#720808' : '#E1E4E8', borderRadius: 50, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: value == 'seasons' ? '#fff' : '#313131', fontFamily: value == 'seasons' ? 'Raleway-Bold' : 'Raleway-Regular' }}>Seasons</Text>
            </TouchableOpacity>
          </View>
          {value === 'movies' && (
            <>
              <CardsFlatlist navigation={navigation} heading={'Trending'} data={cartoonData} type={"Movies"} />
              <BannersAdd id={'ca-app-pub-1700763198948198/2098879910'} />

              <CardsFlatlist navigation={navigation} heading={'Popular'} data={animated1Data} type={"Movies"} />
              <BannersAdd id={'ca-app-pub-1700763198948198/9661389755'} />
              <CardsFlatlist navigation={navigation} heading={'new'} data={animated2Data} type={"Movies"} />

            </>)}
          {value === 'seasons' && (
            <>
              <CardsFlatlist navigation={navigation} heading={'New Season'} data={newAnimSeason} type={"show"} />
              <BannersAdd id={'ca-app-pub-1700763198948198/4396679739'} />
              <CardsFlatlist navigation={navigation} heading={'Popular Season'} data={popularAnimSeason} type={"show"} />
              <BannersAdd id={'ca-app-pub-1700763198948198/8930762011'} />
            </>)}

        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default Cartoons;

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
