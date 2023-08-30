import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {setTheme} from '../redux/reducers/userReducers';
import {store} from '../redux/store';
import {useTheme} from 'react-native-paper';
import lightTheme from '../utillis/theme/lightTheme';
import darkTheme from '../utillis/theme/darkTheme';

const CustomDrawerContent = ({props, navigation}) => {
  const {myTheme, user} = useSelector(state => state.root.user);
  const theme = useTheme(myTheme == 'lightTheme' ? lightTheme : darkTheme);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.tabs,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
      }}>
      <View style={{flex: 1}}>
        <View style={styles.profileContainer}>
          <View style={styles.profileImageWrapper}>
            <Image
              style={styles.profileImage}
              source={require('../assets/guest.png')}
            />
            <Text style={{...styles.profileName, color: theme.colors.text}}>
              {user.email == 'guest@example.com' ? 'Guest User' : 'John Duo'}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() =>
            store.dispatch(
              setTheme(myTheme == 'drakTheme' ? 'lightTheme' : 'drakTheme'),
            )
          }
          style={styles.othercontainer}>
          <Image
            style={{...styles.logoutImage}}
            source={require('../assets/them.png')}
          />
          <Text style={{...styles.otherText, color: theme.colors.text}}>
            Switch Theme
          </Text>
        </TouchableOpacity>
        <View style={styles.othercontainer}>
          <Image
            style={{...styles.logoutImage, tintColor: theme.colors.icon}}
            source={require('../assets/settings.png')}
          />
          <Text style={{...styles.otherText, color: theme.colors.text}}>
            Settings
          </Text>
        </View>
      </View>
      {/* Other content */}
      <View style={styles.bottomContainer}>
        <Image
          resizeMode="contain"
          style={{...styles.logoutImage, tintColor: theme.colors.icon}}
          source={require('../assets/logout.png')}
        />
        <Text style={{...styles.logoutText, color: theme.colors.text}}>
          {user.email == 'guest@example.com' ? 'Login' : 'Logout'}
        </Text>
      </View>
    </View>
  );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
  profileContainer: {
    height: 100,
    borderBottomColor: '#E1E4E8',
    borderBottomWidth: 3,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
  },
  profileImageWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 52,
    height: 52,
    borderRadius: 52,
  },
  profileName: {
    color: '#313131',
    fontFamily: 'Raleway-Bold',
    marginLeft: 10,
    fontSize: 16,
    textTransform: 'uppercase',
  },
  logoutImage: {
    height: 22,
    width: 22,
    resizeMode: 'contain',
  },
  logoutText: {
    color: '#313131',
    fontFamily: 'Raleway-Bold',
    marginLeft: 10,
  },
  bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 3,
    borderTopColor: '#E1E4E8',
    paddingVertical: 20,
  },
  othercontainer: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  otherText: {
    color: '#313131',
    fontFamily: 'Raleway-Regular',
    fontSize: 13,
  },
});
