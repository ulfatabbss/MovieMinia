import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Text,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Gray200, Gray300, Secondary} from '../utillis/theme';
import {arrow, onBoard1, onBoard2, onBoard3} from '../assets';
import {RF, SCREEN_HEIGHT, SCREEN_WIDTH} from '../utillis/theme/Responsive';
import {Primary} from '../utillis/colors';
import HeadingText from '../components/CustomText';

const OnBoarding1 = ({navigation}) => {
  const [color, setColor] = useState(Secondary);
  const [color2, setColor2] = useState('#fff');
  const [color3, setColor3] = useState('#fff');
  const [change, setChange] = useState(false);
  const [value, setValue] = useState('1');
  const Toggle = () => {
    if (value == 1) {
      console.log(value, 'value 1');
      setValue('2');
    } else if (value == 2) {
      console.log(value, 'value 2');
      setValue('3');
    } else {
      navigation.navigate('AccountType');
    }
    setChange(true);
    setColor('#fff');
    setColor2(Secondary);
    setColor3('#fff');
    if (change) {
      setColor3(Secondary);
      setColor2(Gray200);
      setColor(Gray200);
    }
  };

  return (
    <ImageBackground
      style={styles.Container}
      resizeMode={value == '1' ? 'cover' : value == '2' ? 'cover' : 'contain'}
      imageStyle={
        value == '3'
          ? styles.imageStyle
          : {height: '100%', width: '100%', resizeMode: 'stretch'}
      }
      source={
        value == '1'
          ? onBoard1
          : value == '2'
          ? onBoard2
          : value == '3'
          ? onBoard3
          : null
      }>
      <View
        style={[
          styles.fade_View,
          {backgroundColor: value == '3' ? null : 'rgba(0,0,0,0.5)'},
        ]}>
        <View
          style={{
            width: '100%',
            alignItems: 'flex-end',
            marginTop: RF(50),
          }}>
          <HeadingText
            title={color3 == Secondary ? null : 'Skip'}
            semiBold
            size={RF(18)}
            color={value == '3' ? '#fff' : '#000'}
          />
        </View>

        <View
          style={{
            width: '100%',
            position: 'absolute',
            alignSelf: 'center',
            bottom: RF(40),
          }}>
          <HeadingText
            title={
              value == '1'
                ? 'Unlock Cinematic Wonders!'
                : value == '2'
                ? 'Your Movie Journey Starts Here!'
                : value == '3'
                ? 'Movies, Curated Your Way!'
                : null
            }
            bold
            size={RF(18)}
            color={value == '3' ? '#000' : '#fff'}
          />
          <HeadingText
            title={
              value == '1'
                ? 'Dive into a world of movies tailored just for you. Discover, select, and enjoy with ease.'
                : value == '2'
                ? "Let us guide you through a seamless movie-watching experience. From discovery to delight, we've got you covered."
                : value == '3'
                ? 'Personalized recommendations, hassle-free selection. Elevate your movie nights with our intuitive app.'
                : null
            }
            medium
            top={10}
            size={RF(14)}
            color={value == '3' ? '#000' : '#fff'}
          />

          <View style={styles.bottom_comp}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => setValue('1')}
                style={[
                  styles.rect,
                  {backgroundColor: value == '1' ? Secondary : Gray200},
                ]}
              />
              <TouchableOpacity
                onPress={() => setValue('2')}
                style={[
                  styles.rect,
                  {backgroundColor: value == '2' ? Secondary : Gray200},
                ]}
              />
              <TouchableOpacity
                onPress={() => setValue('3')}
                style={[
                  styles.rect,
                  {backgroundColor: value == '3' ? Secondary : Gray200},
                ]}
              />
            </View>

            <TouchableOpacity style={styles.arrow_Cont} onPress={Toggle}>
              <Image
                style={{width: RF(25)}}
                source={arrow}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default OnBoarding1;

const styles = StyleSheet.create({
  rect: {
    height: RF(10),
    width: RF(25),
    marginLeft: RF(5),
    borderRadius: 5,
  },
  Container: {
    flex: 1,
  },
  bottom_comp: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: RF(20),
  },
  arrow_Cont: {
    height: RF(38),
    width: RF(60),
    borderRadius: RF(40),
    backgroundColor: Primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    height: RF(350),
    marginTop: RF(150),
    justifyContent: 'center',
  },
  fade_View: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    padding: 20,
  },
});
