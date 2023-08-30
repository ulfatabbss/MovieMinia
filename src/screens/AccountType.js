import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {RF} from '../utillis/theme/Responsive';
import {FlexDirection, Heading} from '../utillis/styles';
import {useSelector} from 'react-redux';
import {useTheme} from 'react-native-paper';
import darkTheme from '../utillis/theme/darkTheme';
import lightTheme from '../utillis/theme/lightTheme';
import {applogo, guest, user} from '../assets';
import {Primary} from '../utillis/colors';
import Button from '../components/Button';

const AccountType = ({navigation}) => {
  const {myTheme} = useSelector(state => state.root.user);
  const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme);
  const [selectCard, setSelectCard] = useState('guest');
  return (
    <View
      style={[styles.container, {backgroundColor: theme.colors.background}]}>
      <View
        style={{
          height: '100%',
          width: '100%',
          paddingTop: RF(100),
        }}>
        <View
          style={{
            alignSelf: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{
              height: RF(100),
              width: RF(100),
              borderRadius: 100,
              marginBottom: RF(10),
              backgroundColor: theme.colors.tabs,
              alignSelf: 'center',
              tintColor: theme.colors.logo,
            }}
            source={applogo}
          />
          <Text
            style={{
              ...Heading,
              color: theme.colors.text,
              fontSize: RF(20),
              fontFamily: 'Raleway-Bold',
            }}>
            Select Account Type
          </Text>
        </View>
        <View style={{...FlexDirection}}>
          <TouchableOpacity
            onPress={() => setSelectCard('guest')}
            style={[
              styles.selectCard,
              {
                borderColor: selectCard == 'guest' ? theme.colors.logo : '#fff',
                backgroundColor: theme.colors.tabs,
              },
            ]}>
            <Image style={{height: RF(80), width: RF(80)}} source={guest} />
            <Text
              style={{
                ...Heading,
                color: theme.colors.text,
                fontSize: RF(20),
                textAlign: 'center',
                marginTop: RF(10),
              }}>
              Sign in as a Guest
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setSelectCard('user')}
            style={[
              styles.selectCard,
              {
                borderColor: selectCard == 'user' ? theme.colors.logo : '#fff',
                backgroundColor: theme.colors.tabs,
              },
            ]}>
            <Image style={{height: RF(80), width: RF(80)}} source={user} />
            <Text
              style={{
                ...Heading,
                color: theme.colors.text,
                fontSize: 20,
                textAlign: 'center',
                marginTop: RF(10),
              }}>
              Sign in as a User
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          bottom: RF(20),
          width: '100%',
          alignSelf: 'center',
        }}>
        <Button
          title={'Continue'}
          screen={() => navigation.navigate('Signin')}
        />
      </View>
    </View>
  );
};

export default AccountType;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: RF(20),
    justifyContent: 'center',
  },
  selectCard: {
    height: RF(230),
    width: '45%',
    marginTop: RF(40),
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
