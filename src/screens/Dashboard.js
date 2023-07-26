import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity, SafeAreaView,
  View, Platform, Modal, Pressable
} from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import Carousel from 'react-native-snap-carousel';
import { Primary, secondary } from '../utillis/colors';
import Header from '../components/Header';
import { GetMovies, GetSlider, GetUpcomming } from '../services/AppServices';
import { store } from '../redux/store';
import {
  setAnimated2Data,
  setAnimatedData,
  setAnimatedSlider,
  setCartoonData,
  setDramaSlider,
  setHindiMoviesData,
  setMoviesData,
  setPunjabiMoviesData,
  setSliderData,
  setUpcommingMoviesData,
} from '../redux/reducers/userReducers';
import { useSelector } from 'react-redux';
import { Heading, MovieView, smalltext } from '../utillis/styles';
import MySlider from '../components/MySlider';

const Dashboard = ({ navigation }) => {
  const { width: screenWidth } = Dimensions.get('window');
  const {
    popularMoviesData,
    hindiMoviesData,
    punjabiMoviesData,
    upcommingMoviesData,
    sliderData,
  } = useSelector(state => state.root.user);
  const [loding, setLoding] = useState(true);

  useEffect(() => {
    setLoding(true);
    const integrate = async () => {
      await GetMovies()
        .then(async ({ data }) => {
          store.dispatch(
            setMoviesData(data.filter(object => object.category === 'English')),
          );
          store.dispatch(
            setHindiMoviesData(
              data.filter(object => object.category === 'Hindi'),
            ),
          );
          store.dispatch(
            setPunjabiMoviesData(
              data.filter(object => object.category === 'Punjabi'),
            ),
          );
          const animatedObjects = data.filter(
            object => object.category === 'Animated',
          );
          store.dispatch(setCartoonData(animatedObjects));
          store.dispatch(
            setAnimatedData(
              data.filter(object => object.category === 'Animated1'),
            ),
          );
          store.dispatch(
            setAnimated2Data(
              data.filter(object => object.category === 'Animated2'),
            ),
          );
        })
        .catch(err => {
          console.log(err, 'errors');
        });
      await GetUpcomming()
        .then(async ({ data }) => {
          store.dispatch(setUpcommingMoviesData(data));
        })
        .catch(err => {
          console.log(err, 'errors');
        });
      await GetSlider()
        .then(async ({ data }) => {
          store.dispatch(setSliderData(data[0].poster));
          store.dispatch(setDramaSlider(data[1].poster));
          store.dispatch(setAnimatedSlider(data[2].poster));
        })
        .catch(err => {
          console.log(err, 'errors');
        });
    };
    integrate();
    setLoding(false);
  }, []);
  const MoviesView = ({ item, data }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('MovieDiscription', {
          item: item,
          data: data,
          type: 'Movies',
        })
      }
      style={MovieView}>
      <ImageBackground
        // resizeMode="cover"
        style={{
          height: '100%',
          width: '100%',
          justifyContent: 'flex-end',
        }}
        source={{ uri: item.poster[0].image }}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.9)',
            width: '100%',
            height: '20%',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            padding: 4,
          }}>
          <Text
            numberOfLines={1}
            style={{
              color: 'white',
              fontSize: 14,
              fontFamily: 'BebasNeue-Regular',
            }}>
            {item.title}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  if (loding) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={'large'} color={'red'} />
      </View>
    );
  }
  return (<>
    {Platform.OS === 'ios' &&
      <View style={{
        width: "100%",
        height: 100, // For all devices, even X, XS Max
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: "#000"
      }}
      />}
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />

        <MySlider Movies={sliderData} />
        <View>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',

            }}>
            <Text style={Heading}>Preview</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ExpandMovies', {
                  upcommingMoviesData: upcommingMoviesData,
                  popularMoviesData: popularMoviesData,
                });
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'baseline',
                justifyContent: 'flex-end',
                marginTop: 10,
                marginRight: 10,
              }}>
              <Text style={smalltext}>More</Text>
            </TouchableOpacity>
          </View>


          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={upcommingMoviesData}
            renderItem={({ item }) =>
              MoviesView({ item: item, data: popularMoviesData })
            }
          />
        </View>
        <View>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={Heading}>Popular</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ExpandMovies', {
                  upcommingMoviesData: popularMoviesData,
                  popularMoviesData: popularMoviesData,
                });
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'baseline',
                justifyContent: 'flex-end',

                marginRight: 10,
              }}>
              <Text style={smalltext}>More</Text>

            </TouchableOpacity>
          </View>


          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={popularMoviesData}
            renderItem={({ item }) =>
              MoviesView({ item: item, data: popularMoviesData })
            }
          />
        </View>
        <View
        >
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={Heading}>Indian</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ExpandMovies', {
                  upcommingMoviesData: hindiMoviesData,
                  // popularMoviesData: hindiMoviesData,
                });
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'baseline',
                justifyContent: 'flex-end',
                marginTop: 10,
                marginRight: 10,
              }}>
              <Text style={smalltext}>More</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            showsHorizontalScrollIndicator={false}
            horizontal
            data={hindiMoviesData}
            renderItem={({ item }) =>
              MoviesView({ item: item, data: hindiMoviesData })
            }
          />

        </View>
        <View
        >
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={Heading}>Punjabi</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ExpandMovies', {
                  upcommingMoviesData: punjabiMoviesData,
                  // popularMoviesData: hindiMoviesData,
                });
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'baseline',
                justifyContent: 'flex-end',
                marginTop: 10,
                marginRight: 10,
              }}>
              <Text style={smalltext}>More</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginBottom: 80
            }}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={punjabiMoviesData}
              renderItem={({ item }) =>
                MoviesView({ item: item, data: punjabiMoviesData })
              }
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  </>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: secondary,
    flex: 1
  },
});

