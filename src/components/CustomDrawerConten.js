import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setIsLogin, setTheme } from '../redux/reducers/userReducers';
import { HP, RF, WP } from '../utillis/theme/Responsive';
import { useTheme } from 'react-native-paper';
import { store } from '../redux/store';
const CustomDrawerContent = ({ navigation }) => {
  const dispatch = useDispatch();
  const { myTheme, user, isGuest, google } = useSelector((state) => state.root.user);
  const [textColor, setTextColor] = useState(myTheme == 'darkTheme' ? 'white' : 'black')
  const theme = useTheme(myTheme == 'darkTheme' ? 'lightTheme' : 'darkTheme');
  const toggleTheme = async () => {
    const newTheme = myTheme == 'darkTheme' ? 'lightTheme' : 'darkTheme';
    await dispatch(setTheme(newTheme));
    setTextColor(newTheme == 'darkTheme' ? 'white' : 'black')
  };
  return (
    <View style={{ flex: 1, backgroundColor: theme.colors.tabs, borderTopRightRadius: 30, borderBottomRightRadius: 30 }}>
      <View style={{ flex: 1 }}>
        <TouchableOpacity style={styles.profileContainer} onPress={() => navigation.navigate('Profile')}>
          <View style={styles.profileImageWrapper}>
            <Image
              style={styles.profileImage}
              source={{ uri: isGuest ? "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg?size=626&ext=jpg&uid=R28842868&ga=GA1.2.332396238.1691144532&semt=ais" : google ? user.photo : user?.profilePicture }}
            />
            <Text style={{ ...styles.profileName, color: textColor }}>{isGuest ? 'Guest User' : user.name}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleTheme} style={styles.othercontainer}>
          <Image
            style={{ ...styles.logoutImage }}
            source={require('../assets/them.png')}
          />
          <Text style={{ ...styles.otherText, color: textColor }}>Switch Theme</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Settings")} style={styles.othercontainer}>
          <Image
            style={{ ...styles.logoutImage, tintColor: textColor }}
            source={require('../assets/settings.png')}
          />
          <Text style={{ ...styles.otherText, color: textColor }}>Settings</Text>
        </TouchableOpacity>
      </View>
      {/* Other content */}
      <TouchableOpacity style={styles.bottomContainer} onPress={() => store.dispatch(setIsLogin(false))}>
        <Image resizeMode='contain' style={{ ...styles.logoutImage, tintColor: textColor }} source={require('../assets/logout.png')} />
        <Text style={{ ...styles.logoutText, color: textColor }}>Logout</Text>
      </TouchableOpacity>
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
    justifyContent: 'center', alignItems: 'center'
  },
  profileImage: {
    width: WP(16),
    height: HP(8),
    borderRadius: 100,
  },
  profileName: {
    color: '#313131',
    fontFamily: 'Raleway-Bold',
    marginLeft: 10,
    width: WP(40),
    fontSize: RF(16), textTransform: 'uppercase'

  },
  logoutImage: {
    height: HP(3),
    width: WP(10), resizeMode: 'contain',
  },
  logoutText: {
    color: '#313131',
    fontFamily: 'Raleway-Bold',
    marginLeft: 10,
    fontSize: RF(16)
  }, bottomContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 3,
    borderTopColor: '#E1E4E8',
    paddingVertical: 20
  },
  othercontainer: {
    padding: 10,
    flexDirection: 'row', alignItems: 'center', gap: 10
  }, otherText: {
    color: '#313131',
    fontFamily: 'Raleway-Regular',
    fontSize: RF(13)
  }

});
