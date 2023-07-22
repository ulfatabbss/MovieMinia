import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View, SafeAreaView
} from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import { Primary, secondary } from '../utillis/colors';
import Header from '../components/Header';
import { GetDrama } from '../services/AppServices';
import { setDramaData } from '../redux/reducers/userReducers';
import { useSelector } from 'react-redux';
import { store } from '../redux/store';
import { Heading, MovieView, smalltext } from '../utillis/styles';
import MySlider from '../components/MySlider';
const TvShowes = ({ navigation }) => {
  const { dramaData, dramaSlider } = useSelector(
    state => state.root.user,
  );
  const [indian, setIndian] = useState(null);
  const [turkish, setTurkish] = useState(null);

  useEffect(() => {
    GetDrama()
      .then(async ({ data }) => {
        store.dispatch(
          setDramaData(data.filter(object => object.category === 'Urdu')),
        );
        setIndian(data.filter(object => object.category === 'Indian'));
        setTurkish(data.filter(object => object.category === 'Turkish'));
      })
      .catch(err => {
        console.log(err, 'errors');
      });
  }, []);
  const MoviesView = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('MovieDiscription', {
          item: item,
          type: 'Drama',
          data: item,
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
            backgroundColor: 'rgba(0,0,0,0.8)',
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
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="black" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />
        <MySlider Movies={dramaSlider} />
        <View
          style={{
            marginHorizontal: 2,
            borderRadius: 20,
          }}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={Heading}>Pakistani</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ExpandMovies', {
                  upcommingMoviesData: dramaData,
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

          <View style={{ marginTop: 10 }}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={dramaData}
              renderItem={MoviesView}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 2,
            borderRadius: 20,
          }}>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={Heading}>Turkish</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ExpandMovies', {
                  upcommingMoviesData: turkish,
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
          <View style={{ height: 180, marginTop: 10 }}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={turkish}
              renderItem={MoviesView}
            />
          </View>
        </View>
        <View
          style={{
            marginTop: 10,
            marginHorizontal: 2,
            borderRadius: 20,
          }}>
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
                  upcommingMoviesData: indian,
                });
              }}
              style={{
                flexDirection: 'row',
                marginRight: 10,
              }}>
              <Text style={smalltext}>More</Text>
            </TouchableOpacity>
          </View>
          <View style={{ height: 180, marginTop: 10, marginBottom: 60 }}>
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={indian}
              renderItem={MoviesView}
            />
          </View>
        </View>
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
