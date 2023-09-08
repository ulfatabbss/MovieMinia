import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { setIsLogin, setTheme } from '../redux/reducers/userReducers';
import { useTheme } from 'react-native-paper';
import { store } from '../redux/store';
const CustomDrawerContent = ({ navigation }) => {
  const dispatch = useDispatch();
  const { myTheme, user, isGuest } = useSelector((state) => state.root.user);
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
              source={{ uri: user?.profilePicture }}
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
    width: 52,
    height: 52,
    borderRadius: 52,
  },
  profileName: {
    color: '#313131',
    fontFamily: 'Raleway-Bold',
    marginLeft: 10,
    fontSize: 16, textTransform: 'uppercase'

  },
  logoutImage: {
    height: 22,
    width: 22, resizeMode: 'contain',
  },
  logoutText: {
    color: '#313131',
    fontFamily: 'Raleway-Bold',
    marginLeft: 10,
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
    fontSize: 13
  }

});
