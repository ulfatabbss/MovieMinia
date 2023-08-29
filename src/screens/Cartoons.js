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
import { secondary } from '../utillis/colors';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import CardsFlatlist from '../components/CardsFlatlist';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import Carousel from '../components/ImageCarousel';
import { useState } from 'react';
import { useTheme } from 'react-native-paper';
import lightTheme from '../utillis/theme/lightTheme';
import darkTheme from '../utillis/theme/darkTheme';
const Cartoons = ({ navigation }) => {
  const { cartoonData, animated1Data, animated2Data, animatedSlider, myTheme } =
    useSelector(state => state.root.user);
  const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme); // Get the active theme
  const [value, setValue] = useState("movies")

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
        <StatusBar backgroundColor={theme.colors.background} barStyle={theme.dark ? 'light-content' : 'dark-content'} />
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

          <CardsFlatlist navigation={navigation} heading={'Trending'} data={cartoonData} type={"Movies"} />
          <View style={{ width: "100%", marginVertical: 5, justifyContent: 'center', alignItems: 'center' }}>
            <BannerAd size={BannerAdSize.BANNER} unitId={"ca-app-pub-1700763198948198/4396679739"} />
          </View>
          <CardsFlatlist navigation={navigation} heading={'Popular'} data={animated1Data} type={"Movies"} />
          <View style={{ marginVertical: 5, justifyContent: 'center', alignItems: 'center' }}>
            <BannerAd size={BannerAdSize.BANNER} unitId={"ca-app-pub-1700763198948198/9698237176"} />
          </View>
          <CardsFlatlist navigation={navigation} heading={'new'} data={animated2Data} type={"Movies"} />
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
