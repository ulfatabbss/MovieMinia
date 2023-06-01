import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from 'react-native';
import React from 'react';
import {black, gray, white} from '../utillis/colors';
import LinearGradient from 'react-native-linear-gradient';

const MovieDiscription = ({navigation, route}) => {
  const {url, thumbnail, detail, name} = route.params;
  const back = ['rgba(0,0,0,0)', 'rgba(0,0,0,0.5)', 'rgba(0,0,0,0.7)'];
  return (
    <View style={styles.container}>
      <ImageBackground
        style={{}}
        source={{
          uri: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
        }}>
        <LinearGradient
          style={{
            height: '100%',
            width: '100%',
            padding: 20,
          }}
          colors={back}
          start={{x: 0, y: 0.1}}
          end={{x: 0, y: 0.1}}>
          <View style={styles.mainCard}>
            <View
              style={{
                width: 150,
                height: 250,
              }}>
              <Image
                resizeMode="cover"
                source={{
                  uri: thumbnail,
                }}
                style={{
                  width: '100%',
                  height: 250,
                  borderRadius: 16,
                }}></Image>
            </View>
            <View style={styles.movieDetail}>
              <Text style={styles.h1}>John Wick: Chapter 4</Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginBottom: 8,
                }}>
                <View style={styles.TitleTxt}>
                  <Text style={styles.movieDetailTxt}>22 Mar 2023</Text>
                </View>
                <View style={styles.TitleTxt}>
                  <Text style={styles.movieDetailTxt}>2h 50m</Text>
                </View>
              </View>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <View style={styles.TitleTxt}>
                  <Text style={styles.movieDetailTxt}>Action</Text>
                </View>
                <View style={styles.TitleTxt}>
                  <Text style={styles.movieDetailTxt}>Thriller</Text>
                </View>
                <View style={styles.TitleTxt}>
                  <Text style={styles.movieDetailTxt}>Crime</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Player', {
                    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
                  });
                }}
                style={{
                  flexDirection: 'row',
                  height: 36,
                  width: 180,
                  backgroundColor: 'lightgray',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                  marginTop: 20,
                }}>
                <Image
                  style={{height: 30, width: 30}}
                  source={require('../assets/play.png')}></Image>
                <Text
                  style={{
                    color: black,
                    fontSize: 14,
                    fontWeight: '600',
                    marginStart: 5,
                  }}>
                  Play
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.overviewCard}>
            <View style={styles.overviewCardTitle}>
              <Text style={styles.overViewTitle}>Overview</Text>
            </View>
            <Text
              style={[
                styles.overViewTitle,
                {
                  fontWeight: '400',
                  textAlign: 'justify',
                  paddingHorizontal: 5,
                  paddingVertical: 10,
                  color: 'lightgray',
                },
              ]}>
              With the price on his head ever increasing, John Wick uncovers a
              path to defeating The High Table. But before he can earn his
              freedom, Wick must face off against a new enemy with powerful
              alliances across the globe and forces that turn old friends into
              foes.
            </Text>
          </View>
          <View style={styles.overviewCard}>
            <View style={styles.overviewCardTitle}>
              <Text style={styles.overViewTitle}>About movie</Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom:5,}}>
              <Image
                style={{height: 30, width: 30, marginLeft: 10, marginTop: 5}}
                source={require('../assets/play.png')}
              />
              <Image
                style={{height: 30, width: 30, marginLeft: 10, marginTop: 5}}
                source={require('../assets/play.png')}
              />
              <Image
                style={{height: 30, width: 30, marginLeft: 10, marginTop: 5}}
                source={require('../assets/play.png')}
              />
              <Image
                style={{height: 30, width: 30, marginLeft: 10, marginTop: 5}}
                source={require('../assets/play.png')}
              />
            </View>
            <Text
              style={[
                styles.overViewTitle,
                {
                  fontWeight: '600',
                  textAlign: 'justify',
                  paddingHorizontal: 5,
                  color: 'gray',
                },
              ]}>
              Status
            </Text>
            <Text
              style={[
                styles.overViewTitle,
                {
                  fontWeight: '600',
                  textAlign: 'justify',
                  paddingHorizontal: 5,
                  
                  color: 'lightgray',
                },
              ]}>
              Released
            </Text>
            <Text
              style={[
                styles.overViewTitle,
                {
                  fontWeight: '600',
                  textAlign: 'justify',
                  paddingHorizontal: 5,
                  color: 'gray',
                },
              ]}>
              Original Language
            </Text>
            <Text
              style={[
                styles.overViewTitle,
                {
                  fontWeight: '600',
                  textAlign: 'justify',
                  paddingHorizontal: 5,
                  
                  color: 'lightgray',
                },
              ]}>
              English
            </Text>
          </View>
        </LinearGradient>
      </ImageBackground>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Player', {
            url: url,
          });
        }}
        style={{
          flexDirection: 'row',
          height: 36,
          width: 100,
          marginTop: 16,
          backgroundColor: 'lightgray',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
        }}>
        <Image
          style={{height: 30, width: 30}}
          source={require('../assets/play.png')}></Image>
        <Text
          style={{
            color: black,
            fontSize: 14,
            fontWeight: '600',
            marginStart: 5,
          }}>
          Play
        </Text>
      </TouchableOpacity>
      {/* <View>
        <Text style={styles.overTxt}>Overview</Text>
        <Text style={styles.h3}>{detail}</Text>
      </View> */}
    </View>
  );
};

export default MovieDiscription;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  mainCard: {
    width: '100%',
    flexDirection: 'row',
  },
  TitleTxt: {
    paddingHorizontal: 5,
    backgroundColor: gray,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
  },
  movieDetail: {
    marginLeft: 15,
    width: '55%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieDetailTxt: {
    color: white,
    fontSize: 14,
    fontWeight: '600',
  },
  overviewCard: {
    backgroundColor: gray,
    width: '100%',
    paddingBottom:10,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 20,
  },
  overviewCardTitle: {
    width: '100%',
    height: 35,
    // borderColor: 'gray',
    // borderBottomWidth: 1,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  overViewTitle: {
    color: white,
    fontSize: 14,
    fontWeight: '600',
    marginStart: 5,
  },
  h1: {
    fontSize: 16,
    color: 'white',
    fontWeight: '800',
    marginVertical: 10,
  },
  h2: {
    fontSize: 16,
    color: 'gray',
    marginTop: 5,
  },
  h3: {
    fontSize: 14,
    color: 'lightgray',
    marginTop: 10,
    // textAlign: 'justify',
    width: '60%',
  },
  overTxt: {
    fontSize: 18,
    color: white,
    marginTop: 15,
  },
  subContainer: {
    width: '70%',
    marginTop: 20,
    // backgroundColor: 'gray',
  },
  subTitleContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    paddingBottom: 10,
    marginBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '78%',
  },
  personalInfoTxt: {
    color: '#fff',
    fontSize: 14,
    marginVertical: 5,
    fontWeight: 500,
  },
  basicInfoTxt: {
    color: '#fff',
    fontSize: 12,
  },
  employeeInfo: {
    flexDirection: 'row',
    marginVertical: 10,
  },
});
